import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { BsDropletHalf, BsDroplet } from "react-icons/bs";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { TrafficLights } from "./TrafficLights";
import VersionSwitcher from "./VersionSwitcher";
import ColorPicker from "./ColorPicker";

const TitleBar: React.FC = () => {
  const { mode, toggleMode, accentColor, glassMode, toggleGlassMode } =
    useV3ThemeContext();
  const [showPicker, setShowPicker] = useState(false);
  return (
    <div
      style={{
        height: 46,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        borderBottom: "1px solid var(--v3-border)",
        gap: 12,
        flexShrink: 0,
        position: "relative",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <TrafficLights />
      <div
        style={{
          flex: 1,
          textAlign: "center",
          color: "var(--v3-text2)",
          fontSize: 13,
          fontWeight: 500,
          pointerEvents: "none",
          letterSpacing: 0.2,
        }}
      >
        Rajeev Dessai — Portfolio
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <VersionSwitcher />
        <motion.button
          onClick={toggleGlassMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.88 }}
          title={glassMode ? "Disable Glass UI" : "Enable Glass UI"}
          style={{
            background: glassMode ? accentColor + "22" : "var(--v3-surface2)",
            border:
              "1px solid " +
              (glassMode ? accentColor + "55" : "var(--v3-border)"),
            cursor: "pointer",
            color: glassMode ? accentColor : "var(--v3-text2)",
            display: "flex",
            alignItems: "center",
            padding: 6,
            borderRadius: 8,
            transition: "all 0.2s",
            boxShadow: glassMode ? "0 0 10px " + accentColor + "44" : "none",
          }}
        >
          {glassMode ? <BsDropletHalf size={14} /> : <BsDroplet size={14} />}
        </motion.button>
        <motion.button
          onClick={toggleMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.88 }}
          title={mode === "DARK" ? "Switch to Light" : "Switch to Dark"}
          style={{
            background: "var(--v3-surface2)",
            border: "1px solid var(--v3-border)",
            cursor: "pointer",
            color: "var(--v3-text2)",
            display: "flex",
            alignItems: "center",
            padding: 6,
            borderRadius: 8,
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = accentColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--v3-text2)";
          }}
        >
          {mode === "DARK" ? (
            <HiOutlineSun size={14} />
          ) : (
            <HiOutlineMoon size={14} />
          )}
        </motion.button>
        <div style={{ position: "relative" }}>
          <motion.button
            onClick={() => setShowPicker((p) => !p)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.88 }}
            style={{
              background: showPicker
                ? accentColor + "22"
                : "var(--v3-surface2)",
              border:
                "1px solid " +
                (showPicker ? accentColor + "55" : "var(--v3-border)"),
              cursor: "pointer",
              color: accentColor,
              display: "flex",
              alignItems: "center",
              padding: 6,
              borderRadius: 8,
              transition: "all 0.15s",
            }}
          >
            <IoColorPaletteOutline size={14} />
          </motion.button>
          <AnimatePresence>
            {showPicker && <ColorPicker onClose={() => setShowPicker(false)} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
