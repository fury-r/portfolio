import React from "react";
import { motion } from "framer-motion";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import TitleBar from "../components/TitleBar";
import Sidebar from "../components/Sidebar";
import Dock from "../components/Dock";
import ContentRouter from "../components/ContentRouter";

interface DesktopWindowProps {
  basePath: string;
}

const DesktopWindow: React.FC<DesktopWindowProps> = ({ basePath }) => {
  const { accentColor, glassMode } = useV3ThemeContext();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
      style={{
        width: "93vw",
        height: "92vh",
        borderRadius: 22,
        background: "var(--v3-window-bg, rgba(18,18,24,0.78))",
        backdropFilter: "saturate(160%) blur(var(--v3-blur-amt, 18px))",
        WebkitBackdropFilter: "saturate(160%) blur(var(--v3-blur-amt, 18px))",
        border: "1px solid var(--v3-window-border, rgba(255,255,255,0.13))",
        boxShadow: glassMode
          ? "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), 0 0 80px " +
            accentColor +
            "15, inset 0 1px 0 rgba(255,255,255,0.12)"
          : "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px " +
            accentColor +
            "10",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
        contain: "layout style",
      }}
    >
      {/* Top specular */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: glassMode ? 80 : 2,
          background: glassMode
            ? "linear-gradient(180deg, var(--v3-specular, rgba(255,255,255,0.14)) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
          borderRadius: "22px 22px 0 0",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
      {/* Left specular edge (glass mode) */}
      {glassMode && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 2,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.05) 40%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}
      {/* Shimmer sweep */}
      {glassMode && (
        <div
          style={{
            position: "absolute",
            top: "-40%",
            left: "-60%",
            width: "55%",
            height: "200%",
            background:
              "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.06) 50%, transparent 62%)",
            animation: "v3shimmer 10s ease-in-out 2s infinite",
            pointerEvents: "none",
            zIndex: 9,
            borderRadius: 22,
          }}
        />
      )}
      <TitleBar />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar basePath={basePath} />
        <div
          style={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            scrollBehavior: "smooth",
            overscrollBehavior: "contain",
          }}
        >
          <ContentRouter />
        </div>
      </div>
      <Dock basePath={basePath} />
    </motion.div>
  );
};

export default DesktopWindow;
