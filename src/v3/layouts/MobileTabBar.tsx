import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { NAV_ITEMS } from "../constants";
import { accentRgba } from "../utils";

// ─── constants ───────────────────────────────────────────────────────────────
const BAR_HEIGHT = 68;
const CIRCLE_R = 26;
const CIRCLE_LIFT = 10; // px circle center rises above bar top
const NOTCH_DEPTH = 20;
const NOTCH_HALF_W = 62;
const NOTCH_BLEND = 34;
const BAR_CORNER_R = 18;
const SOFT_SPRING = { stiffness: 200, damping: 26, mass: 1 };
const ITEM_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.8,
};

// ─── SVG notched path ────────────────────────────────────────────────────────
function buildNotchedPath(cx: number, w: number): string {
  const h = BAR_HEIGHT;
  const r = BAR_CORNER_R;
  const nd = NOTCH_DEPTH;
  const nhw = Math.min(NOTCH_HALF_W, cx - 4, w - cx - 4);
  const nb = Math.min(NOTCH_BLEND, nhw - 4);
  const notchL = cx - nhw;
  const notchR = cx + nhw;
  return [
    `M 0 0`,
    notchL > 2 ? `L ${notchL} 0` : ``,
    `C ${notchL + nb} 0 ${cx - CIRCLE_R} ${nd} ${cx} ${nd}`,
    `C ${cx + CIRCLE_R} ${nd} ${notchR - nb} 0 ${notchR} 0`,
    notchR < w - 2 ? `L ${w} 0` : ``,
    `L ${w} ${h - r}`,
    `Q ${w} ${h} ${w - r} ${h}`,
    `L ${r} ${h}`,
    `Q 0 ${h} 0 ${h - r}`,
    `Z`,
  ]
    .filter(Boolean)
    .join(" ");
}

// ─── MobileTabBar ─────────────────────────────────────────────────────────────
const MobileTabBar: React.FC<{ basePath: string }> = ({ basePath }) => {
  const location = useLocation();
  const { accentColor, glassMode, mode } = useV3ThemeContext();
  const isLight = mode === "LIGHT";
  const activePath = location.pathname.replace(basePath, "") || "/";
  const barRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);

  // Measure bar width and watch for resize
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setBarWidth(entry.contentRect.width),
    );
    ro.observe(el);
    setBarWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const activeIdx = NAV_ITEMS.findIndex(
    (item) =>
      activePath === item.path ||
      (item.path !== "/" && activePath.startsWith(item.path)),
  );
  const safeIdx = activeIdx < 0 ? 0 : activeIdx;

  // Item centers as fractions — resolved once barWidth is known
  const itemCenterX = (i: number) =>
    barWidth > 0
      ? (barWidth / NAV_ITEMS.length) * i + barWidth / NAV_ITEMS.length / 2
      : 0;

  const rawActiveX = useMotionValue(itemCenterX(safeIdx));
  const activeX = useSpring(rawActiveX, SOFT_SPRING);

  useEffect(() => {
    if (barWidth > 0) rawActiveX.set(itemCenterX(safeIdx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeIdx, barWidth]);

  const svgPath = useTransform(activeX, (cx) =>
    barWidth > 0 ? buildNotchedPath(cx, barWidth) : "",
  );
  const circleLeft = useTransform(activeX, (cx) => cx - CIRCLE_R);

  return (
    // Outer wrapper adds top spacing for the floating circle
    <div
      style={{
        position: "relative",
        paddingTop: CIRCLE_R + CIRCLE_LIFT,
        flexShrink: 0,
      }}
    >
      {/* ── Floating active circle ── */}
      {barWidth > 0 && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            x: circleLeft,
            width: CIRCLE_R * 2,
            height: CIRCLE_R * 2,
            borderRadius: "50%",
            background: accentColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            zIndex: 10,
            boxShadow: [
              `0 6px 24px ${accentRgba(accentColor, 0.55)}`,
              `inset 0 1px 0 rgba(255,255,255,0.28)`,
            ].join(", "),
          }}
        >
          {NAV_ITEMS[safeIdx]?.icon}
        </motion.div>
      )}

      {/* ── Bar ── */}
      <div
        ref={barRef}
        style={{
          position: "relative",
          width: "100%",
          height: BAR_HEIGHT,
        }}
      >
        {/* Backdrop blur (sits behind SVG) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "saturate(200%) blur(20px)",
            WebkitBackdropFilter: "saturate(200%) blur(20px)",
            borderRadius: `${BAR_CORNER_R}px ${BAR_CORNER_R}px 0 0`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* SVG notched background */}
        {barWidth > 0 && (
          <motion.svg
            viewBox={`0 0 ${barWidth} ${BAR_HEIGHT}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: barWidth,
              height: BAR_HEIGHT,
              overflow: "visible",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <defs>
              <filter
                id="mtab-shadow"
                x="-10%"
                y="-80%"
                width="120%"
                height="280%"
              >
                <feDropShadow
                  dx="0"
                  dy="-6"
                  stdDeviation="12"
                  floodOpacity="0.35"
                  floodColor="#000"
                />
              </filter>
            </defs>
            {/* Fill */}
            <motion.path
              d={svgPath}
              fill={
                isLight
                  ? glassMode ? "rgba(255,255,255,0.60)" : "rgba(250,250,255,0.97)"
                  : glassMode ? "rgba(255,255,255,0.06)" : "rgba(18,18,26,0.96)"
              }
              filter="url(#mtab-shadow)"
            />
            {/* Top border stroke */}
            <motion.path
              d={svgPath}
              fill="none"
              stroke={isLight && !glassMode ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.13)"}
              strokeWidth={1}
            />
            {/* Specular highlight */}
            <motion.path
              d={svgPath}
              fill="none"
              stroke={isLight && !glassMode ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.20)"}
              strokeWidth={0.75}
              opacity={0.5}
            />
          </motion.svg>
        )}

        {/* Tab items */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: 8,
          }}
        >
          {NAV_ITEMS.map((tab) => {
            const isActive =
              activePath === tab.path ||
              (tab.path !== "/" && activePath.startsWith(tab.path));
            return (
              <Link
                key={tab.path}
                to={basePath + tab.path}
                style={{ textDecoration: "none", flex: 1 }}
              >
                <motion.div
                  whileTap={{ scale: 0.82 }}
                  transition={ITEM_SPRING}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    color: isActive ? accentColor : "var(--v3-text2)",
                  }}
                >
                  {/* Icon — hidden for active item (shown in floating circle) */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: isActive ? 0 : 1,
                    }}
                  >
                    {tab.icon}
                  </div>
                  {/* Label always visible */}
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: isActive ? 700 : 400,
                      color: "inherit",
                    }}
                  >
                    {tab.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Safe-area spacer */}
      <div
        style={{
          background: isLight
            ? glassMode ? "rgba(255,255,255,0.60)" : "rgba(250,250,255,0.97)"
            : glassMode ? "rgba(255,255,255,0.06)" : "rgba(18,18,26,0.96)",
          height: "env(safe-area-inset-bottom, 0px)",
        }}
      />
    </div>
  );
};

export default MobileTabBar;
