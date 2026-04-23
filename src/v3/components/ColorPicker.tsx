import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { BsDropletHalf, BsDroplet } from "react-icons/bs";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { COLOR_PRESETS } from "../constants";
import { glass } from "../utils";

interface ColorPickerProps {
  onClose: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onClose }) => {
  const {
    accentColor,
    setAccentColor,
    glassMode,
    toggleGlassMode,
    mode,
    toggleMode,
  } = useV3ThemeContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  return createPortal(
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -8 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      style={{
        ...glass({ borderRadius: 20, padding: 20 }),
        position: "fixed",
        top: 70,
        right: 8,
        left: 8,
        maxWidth: 340,
        width: "auto",
        marginLeft: "auto",
        zIndex: 9999,
        boxShadow:
          "0 28px 72px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.10)",
        maxHeight: "calc(100dvh - 86px)",
        overflowY: "auto",
      }}
    >
      {/* Glass UI toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
          padding: "10px 14px",
          borderRadius: 13,
          background: glassMode ? accentColor + "18" : "var(--v3-surface2)",
          border:
            "1px solid " +
            (glassMode ? accentColor + "44" : "var(--v3-border)"),
          cursor: "pointer",
          transition: "all 0.22s",
        }}
        onClick={toggleGlassMode}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {glassMode ? (
            <BsDropletHalf size={16} color={accentColor} />
          ) : (
            <BsDroplet size={16} color="var(--v3-text2)" />
          )}
          <span
            style={{
              color: glassMode ? accentColor : "var(--v3-text2)",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Liquid Glass UI
          </span>
        </div>
        <div
          style={{
            width: 40,
            height: 22,
            borderRadius: 11,
            background: glassMode ? accentColor : "var(--v3-border)",
            position: "relative",
            transition: "background 0.22s",
          }}
        >
          <motion.div
            animate={{ x: glassMode ? 20 : 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{
              position: "absolute",
              top: 3,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>

      {/* Dark/Light toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
          padding: "10px 14px",
          borderRadius: 13,
          background: "var(--v3-surface2)",
          border: "1px solid var(--v3-border)",
          cursor: "pointer",
        }}
        onClick={toggleMode}
      >
        {mode === "DARK" ? (
          <HiOutlineSun size={15} color="var(--v3-text2)" />
        ) : (
          <HiOutlineMoon size={15} color="var(--v3-text2)" />
        )}
        <span
          style={{ color: "var(--v3-text2)", fontSize: 13, fontWeight: 500 }}
        >
          {mode === "DARK" ? "Light Mode" : "Dark Mode"}
        </span>
      </div>

      <p
        style={{
          color: "var(--v3-text2)",
          fontSize: 10,
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          fontWeight: 600,
        }}
      >
        Accent Color
      </p>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 16 }}
      >
        {COLOR_PRESETS.map((p) => (
          <button
            key={p.color}
            title={p.label}
            onClick={() => setAccentColor(p.color)}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: p.color,
              border: "none",
              cursor: "pointer",
              outline:
                accentColor === p.color ? "3px solid " + p.color : "none",
              outlineOffset: 3,
              boxShadow:
                accentColor === p.color ? "0 0 14px " + p.color + "99" : "none",
              transition: "transform 0.14s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.28)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          borderRadius: 11,
          background: "var(--v3-surface2)",
          border: "1px solid var(--v3-border)",
        }}
      >
        <label style={{ color: "var(--v3-text2)", fontSize: 12 }}>Custom</label>
        <input
          type="color"
          value={accentColor}
          onChange={(e) => setAccentColor(e.target.value)}
          style={{
            width: 34,
            height: 26,
            borderRadius: 7,
            border: "none",
            cursor: "pointer",
            background: "none",
            padding: 0,
          }}
        />
        <span
          style={{
            color: "var(--v3-text2)",
            fontSize: 11,
            fontFamily: "monospace",
          }}
        >
          {accentColor}
        </span>
      </div>
    </motion.div>,
    document.body,
  );
};

export default ColorPicker;
