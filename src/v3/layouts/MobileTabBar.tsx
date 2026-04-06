import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { NAV_ITEMS } from "../constants";

const MobileTabBar: React.FC<{ basePath: string }> = ({ basePath }) => {
  const location = useLocation();
  const { accentColor, glassMode } = useV3ThemeContext();
  const activePath = location.pathname.replace(basePath, "") || "/";
  return (
    <div
      style={{
        backdropFilter: "saturate(200%) blur(var(--v3-blur-amt, 28px))",
        WebkitBackdropFilter: "saturate(200%) blur(var(--v3-blur-amt, 28px))",
        background: glassMode ? "rgba(8,8,20,0.14)" : "rgba(18,18,24,0.85)",
        borderTop: "1px solid var(--v3-border)",
        borderRadius: "20px 20px 0 0",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0 calc(10px + env(safe-area-inset-bottom, 0px))",
        flexShrink: 0,
        position: "relative",
        boxShadow: glassMode
          ? "0 -8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.14)"
          : "0 -4px 24px rgba(0,0,0,0.25)",
      }}
    >
      {glassMode && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "var(--v3-specular, rgba(255,255,255,0.16))",
            borderRadius: "20px 20px 0 0",
            pointerEvents: "none",
          }}
        />
      )}
      {NAV_ITEMS.map((tab) => {
        const isActive =
          activePath === tab.path ||
          (tab.path !== "/" && activePath.startsWith(tab.path));
        return (
          <Link
            key={tab.path}
            to={basePath + tab.path}
            style={{ textDecoration: "none" }}
          >
            <motion.div
              whileTap={{ scale: 0.8, y: -5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: "4px 14px",
                color: isActive ? accentColor : "rgba(235,235,245,0.60)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 11,
                  background: isActive ? accentColor + "22" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.15s",
                  boxShadow:
                    isActive && glassMode
                      ? "0 0 12px " + accentColor + "44"
                      : "none",
                }}
              >
                {tab.icon}
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 400,
                  color: "inherit",
                }}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-active"
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
    </div>
  );
};

export default MobileTabBar;
