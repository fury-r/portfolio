import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { NAV_ITEMS } from "../constants";
import { ios26Spring } from "../utils";

interface DockProps {
  basePath: string;
}

interface DockItemProps {
  item: (typeof NAV_ITEMS)[0];
  basePath: string;
  isActive: boolean;
  hoveredIdx: number | null;
  myIdx: number;
  accentColor: string;
  glassMode: boolean;
  onHover: (i: number | null) => void;
}

const DockItem = memo<DockItemProps>(
  ({
    item,
    basePath,
    isActive,
    hoveredIdx,
    myIdx,
    accentColor,
    glassMode,
    onHover,
  }) => {
    const dist = hoveredIdx === null ? 99 : Math.abs(myIdx - hoveredIdx);
    const magScale =
      dist === 0 ? 1.42 : dist === 1 ? 1.16 : dist === 2 ? 1.05 : 1;
    const magY = dist === 0 ? -16 : dist === 1 ? -8 : dist === 2 ? -3 : 0;
    const iconBtn: React.CSSProperties = {
      width: 46,
      height: 46,
      borderRadius: 13,
      background: isActive ? accentColor + "2e" : "rgba(255,255,255,0.07)",
      border: isActive
        ? "1.5px solid " + accentColor + "66"
        : "1px solid rgba(255,255,255,0.12)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: isActive ? accentColor : "var(--v3-text2)",
      transition: "all 0.15s",
      boxShadow:
        isActive && glassMode
          ? "0 0 14px " + accentColor + "44"
          : isActive
            ? "0 0 8px " + accentColor + "22"
            : "none",
      position: "relative",
      overflow: "hidden",
    };
    return (
      <Link
        key={item.path}
        to={basePath + item.path}
        style={{ textDecoration: "none" }}
      >
        <motion.div
          onHoverStart={() => onHover(myIdx)}
          onHoverEnd={() => onHover(null)}
          animate={{ y: magY, scale: magScale }}
          transition={ios26Spring()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            transformOrigin: "bottom center",
          }}
        >
          <div style={iconBtn}>
            {item.icon}
            {isActive && glassMode && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "60%",
                  height: "100%",
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
                  animation: "v3cardshine 3s ease-in-out infinite",
                }}
              />
            )}
          </div>
          <motion.span
            animate={{
              opacity: dist === 0 ? 1 : 0.6,
              fontSize: dist === 0 ? "11px" : "10px",
            }}
            transition={ios26Spring()}
            style={{
              color: isActive ? accentColor : "var(--v3-text2)",
              fontWeight: isActive ? 700 : 400,
            }}
          >
            {item.label}
          </motion.span>
          {isActive && (
            <motion.div
              layoutId="dock-active"
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: accentColor,
                boxShadow: glassMode
                  ? "0 0 8px " +
                    accentColor +
                    ", 0 0 14px " +
                    accentColor +
                    "55"
                  : "0 0 6px " + accentColor,
              }}
            />
          )}
        </motion.div>
      </Link>
    );
  },
);

DockItem.displayName = "DockItem";

const Dock: React.FC<DockProps> = ({ basePath }) => {
  const location = useLocation();
  const { accentColor, glassMode } = useV3ThemeContext();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const activePath = location.pathname.replace(basePath, "") || "/";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "8px 0 14px",
        flexShrink: 0,
      }}
    >
      <div style={{ position: "relative" }}>
        {glassMode && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "5%",
              right: "5%",
              height: 16,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
              filter: "blur(4px)",
              transform: "scaleY(-0.4)",
              transformOrigin: "top",
              pointerEvents: "none",
            }}
          />
        )}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 24,
            delay: 0.1,
          }}
          style={{
            backdropFilter: "saturate(160%) blur(var(--v3-blur-amt, 18px))",
            WebkitBackdropFilter:
              "saturate(160%) blur(var(--v3-blur-amt, 18px))",
            background: glassMode
              ? "rgba(255,255,255,0.04)"
              : "rgba(30,30,38,0.75)",
            border: "1px solid var(--v3-window-border, rgba(255,255,255,0.14))",
            borderRadius: 22,
            padding: "10px 18px",
            display: "flex",
            alignItems: "flex-end",
            gap: 10,
            boxShadow: glassMode
              ? "0 10px 36px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 50px " +
                accentColor +
                "12"
              : "0 8px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {glassMode && (
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: "-60%",
                width: "50%",
                height: "200%",
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
                animation: "v3shimmer 9s ease-in-out 1s infinite",
                pointerEvents: "none",
              }}
            />
          )}
          {NAV_ITEMS.map((item, i) => {
            const isActive =
              activePath === item.path ||
              (item.path !== "/" && activePath.startsWith(item.path));
            return (
              <DockItem
                key={item.path}
                item={item}
                basePath={basePath}
                isActive={isActive}
                hoveredIdx={hoveredIdx}
                myIdx={i}
                accentColor={accentColor}
                glassMode={glassMode}
                onHover={setHoveredIdx}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Dock;
