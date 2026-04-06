import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { NAV_ITEMS } from "../constants";
import { ios26Spring } from "../utils";

interface DockProps {
  basePath: string;
}

const Dock: React.FC<DockProps> = ({ basePath }) => {
  const location = useLocation();
  const { accentColor, glassMode } = useV3ThemeContext();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const activePath = location.pathname.replace(basePath, "") || "/";
  const iconBtn = (isActive: boolean) => ({
    width: 46,
    height: 46,
    borderRadius: 13,
    background: isActive ? accentColor + "2e" : "rgba(255,255,255,0.07)",
    border: isActive
      ? "1.5px solid " + accentColor + "66"
      : "1px solid rgba(255,255,255,0.12)",
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    color: isActive ? accentColor : "var(--v3-text2)",
    transition: "all 0.15s",
    boxShadow:
      isActive && glassMode
        ? "0 0 18px " + accentColor + "44"
        : isActive
          ? "0 0 10px " + accentColor + "22"
          : "none",
    position: "relative" as const,
    overflow: "hidden" as const,
  });
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
              height: 20,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
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
            stiffness: 200,
            damping: 22,
            delay: 0.1,
          }}
          style={{
            backdropFilter: "saturate(200%) blur(var(--v3-blur-amt, 28px))",
            WebkitBackdropFilter:
              "saturate(200%) blur(var(--v3-blur-amt, 28px))",
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
              ? "0 12px 44px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18), 0 0 60px " +
                accentColor +
                "15"
              : "0 10px 36px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.09)",
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
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
                animation: "v3shimmer 9s ease-in-out 1s infinite",
                pointerEvents: "none",
              }}
            />
          )}
          {NAV_ITEMS.map((item, i) => {
            const isActive =
              activePath === item.path ||
              (item.path !== "/" && activePath.startsWith(item.path));
            // iOS 26 dock magnification — scale & lift based on distance from hovered item
            const dist = hoveredIdx === null ? 99 : Math.abs(i - hoveredIdx);
            const magScale =
              dist === 0 ? 1.42 : dist === 1 ? 1.16 : dist === 2 ? 1.05 : 1;
            const magY =
              dist === 0 ? -16 : dist === 1 ? -8 : dist === 2 ? -3 : 0;
            return (
              <Link
                key={item.path}
                to={basePath + item.path}
                style={{ textDecoration: "none" }}
              >
                <motion.div
                  onHoverStart={() => setHoveredIdx(i)}
                  onHoverEnd={() => setHoveredIdx(null)}
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
                  <div style={iconBtn(isActive)}>
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
                            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
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
                            ", 0 0 16px " +
                            accentColor +
                            "66"
                          : "0 0 6px " + accentColor,
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Dock;
