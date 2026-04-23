import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { NAV_ITEMS } from "../constants";
import { accentRgba } from "../utils";

// ─── constants ───────────────────────────────────────────────────────────────
const ITEM_SIZE = 44;
const ITEM_GAP = 14;
const PAD_X = 28;
const BAR_HEIGHT = 60;
const CIRCLE_R = 30; // floating circle radius
const CIRCLE_LIFT = 14; // px the circle center sits above bar top
const NOTCH_DEPTH = 22; // px the notch dips below bar top
const NOTCH_HALF_W = 72;
const NOTCH_BLEND = 38;
const BAR_CORNER_R = 16;
const SOFT_SPRING = { stiffness: 200, damping: 26, mass: 1 };
const ITEM_SPRING = { stiffness: 380, damping: 30, mass: 0.8 };

// Fixed bar width — computed from layout constants
const BAR_WIDTH =
  PAD_X * 2 + NAV_ITEMS.length * ITEM_SIZE + (NAV_ITEMS.length - 1) * ITEM_GAP;

// Item center X values within the bar coordinate space
const ITEM_CENTERS = NAV_ITEMS.map(
  (_, i) => PAD_X + i * (ITEM_SIZE + ITEM_GAP) + ITEM_SIZE / 2,
);

// ─── SVG path builder ────────────────────────────────────────────────────────
function buildNotchedPath(cx: number): string {
  const w = BAR_WIDTH;
  const h = BAR_HEIGHT;
  const r = BAR_CORNER_R;
  const nd = NOTCH_DEPTH;
  // Clamp notch half-width so it never overshoots bar edges
  const nhw = Math.min(NOTCH_HALF_W, cx - 2, w - cx - 2);
  const nb = Math.min(NOTCH_BLEND, nhw - 4);
  const notchL = cx - nhw;
  const notchR = cx + nhw;

  return [
    `M 0 0`,
    notchL > 2 ? `L ${notchL} 0` : ``,
    // Smooth curve into notch
    `C ${notchL + nb} 0 ${cx - CIRCLE_R} ${nd} ${cx} ${nd}`,
    // Smooth curve out of notch
    `C ${cx + CIRCLE_R} ${nd} ${notchR - nb} 0 ${notchR} 0`,
    notchR < w - 2 ? `L ${w} 0` : ``,
    // Right side + bottom-right corner
    `L ${w} ${h - r}`,
    `Q ${w} ${h} ${w - r} ${h}`,
    // Bottom edge + bottom-left corner
    `L ${r} ${h}`,
    `Q 0 ${h} 0 ${h - r}`,
    `Z`,
  ]
    .filter(Boolean)
    .join(" ");
}

// ─── Dock ────────────────────────────────────────────────────────────────────
interface DockProps {
  basePath: string;
}

const Dock: React.FC<DockProps> = ({ basePath }) => {
  const location = useLocation();
  const { accentColor, glassMode, mode } = useV3ThemeContext();
  const isLight = mode === "LIGHT";
  const activePath = location.pathname.replace(basePath, "") || "/";

  const activeIdx = NAV_ITEMS.findIndex(
    (item) =>
      activePath === item.path ||
      (item.path !== "/" && activePath.startsWith(item.path)),
  );
  const safeIdx = activeIdx < 0 ? 0 : activeIdx;

  // Spring-animated X that drives both the notch and the floating circle
  const rawActiveX = useMotionValue(ITEM_CENTERS[safeIdx]);
  const activeX = useSpring(rawActiveX, SOFT_SPRING);

  useEffect(() => {
    rawActiveX.set(ITEM_CENTERS[safeIdx]);
  }, [safeIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  // SVG notch path derived from live activeX spring
  const svgPath = useTransform(activeX, buildNotchedPath);

  // Circle left-edge position
  const circleLeft = useTransform(activeX, (cx) => cx - CIRCLE_R);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.15 }}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "8px 0 14px",
        flexShrink: 0,
      }}
    >
      {/* Outer wrapper — top padding makes room for the floating circle */}
      <div style={{ position: "relative", paddingTop: CIRCLE_R + CIRCLE_LIFT }}>
        {/* ── Floating active circle ── */}
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
            zIndex: 3,
            boxShadow: [
              `0 6px 28px ${accentRgba(accentColor, 0.55)}`,
              `inset 0 1px 0 rgba(255,255,255,0.3)`,
            ].join(", "),
          }}
        >
          {NAV_ITEMS[safeIdx]?.icon}
        </motion.div>

        {/* ── Bar ── */}
        <div
          style={{
            position: "relative",
            width: BAR_WIDTH,
            height: BAR_HEIGHT,
          }}
        >
          {/* Backdrop blur */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: "saturate(180%) blur(20px)",
              WebkitBackdropFilter: "saturate(180%) blur(20px)",
              borderRadius: BAR_CORNER_R,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* SVG notched background — fill + border */}
          <motion.svg
            viewBox={`0 0 ${BAR_WIDTH} ${BAR_HEIGHT}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: BAR_WIDTH,
              height: BAR_HEIGHT,
              overflow: "visible",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <defs>
              <filter
                id="dock-drop"
                x="-10%"
                y="-60%"
                width="120%"
                height="220%"
              >
                <feDropShadow
                  dx="0"
                  dy="8"
                  stdDeviation="14"
                  floodOpacity="0.38"
                  floodColor="#000"
                />
              </filter>
            </defs>
            {/* Fill with shadow */}
            <motion.path
              d={svgPath}
              fill={
                isLight
                  ? glassMode ? "rgba(255,255,255,0.60)" : "rgba(250,250,255,0.97)"
                  : glassMode ? "rgba(255,255,255,0.07)" : "rgba(20,20,28,0.95)"
              }
              filter="url(#dock-drop)"
            />
            {/* Border stroke */}
            <motion.path
              d={svgPath}
              fill="none"
              stroke={isLight && !glassMode ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.13)"}
              strokeWidth={1}
            />
            {/* Specular inner top highlight */}
            <motion.path
              d={svgPath}
              fill="none"
              stroke={isLight && !glassMode ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.22)"}
              strokeWidth={0.75}
              opacity={0.5}
            />
          </motion.svg>

          {/* Items */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              padding: `0 ${PAD_X}px`,
              display: "flex",
              alignItems: "center",
              gap: ITEM_GAP,
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                activePath === item.path ||
                (item.path !== "/" && activePath.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={basePath + item.path}
                  style={{ textDecoration: "none" }}
                >
                  <motion.div
                    whileHover={isActive ? {} : { scale: 1.2 }}
                    whileTap={{ scale: 0.88 }}
                    transition={ITEM_SPRING}
                    style={{
                      width: ITEM_SIZE,
                      height: ITEM_SIZE,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // Hidden when active — icon shown in floating circle
                      color: "var(--v3-text2)",
                      opacity: isActive ? 0 : 1,
                    }}
                  >
                    {item.icon}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dock;
