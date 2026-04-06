import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { BsDropletHalf, BsDroplet } from "react-icons/bs";
import ProfileImage from "../../assets/profile.jpg";
import { useDataContext } from "../../context/DataContext/useContext";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { FALLBACK } from "../constants";
import VersionSwitcher from "../components/VersionSwitcher";
import ColorPicker from "../components/ColorPicker";

const MobileProfileHeader: React.FC = () => {
  const { profile } = useDataContext();
  const { accentColor, glassMode, toggleGlassMode, mode, toggleMode } =
    useV3ThemeContext();
  const [showPicker, setShowPicker] = useState(false);
  const name = profile?.name || FALLBACK.name;
  const position = profile?.position || FALLBACK.position;
  const avatarSrc = profile?.picture
    ? typeof profile.picture === "string" && profile.picture.startsWith("//")
      ? "https:" + profile.picture
      : profile.picture
    : ProfileImage;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 18px",
        background: glassMode ? "rgba(8,8,20,0.14)" : "rgba(18,18,24,0.75)",
        backdropFilter: "saturate(200%) blur(var(--v3-blur-amt, 28px))",
        WebkitBackdropFilter: "saturate(200%) blur(var(--v3-blur-amt, 28px))",
        borderBottom: "1px solid var(--v3-border)",
        flexShrink: 0,
        position: "relative",
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
            background: "var(--v3-specular, rgba(255,255,255,0.18))",
            pointerEvents: "none",
          }}
        />
      )}
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          border: "2.5px solid " + accentColor,
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: glassMode
            ? "0 0 0 4px " + accentColor + "22, 0 0 20px " + accentColor + "44"
            : "0 0 0 4px " + accentColor + "22",
          animation: glassMode ? "v3float 6s ease-in-out infinite" : "none",
        }}
      >
        <img
          src={avatarSrc}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1
          style={{
            fontWeight: 700,
            fontSize: 16,
            margin: 0,
            letterSpacing: -0.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            ...(glassMode
              ? {
                  background:
                    "linear-gradient(135deg, var(--v3-text) 20%, " +
                    accentColor +
                    " 60%, var(--v3-text) 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto",
                  animation: "v3textShimmer 5s linear infinite",
                }
              : { color: "var(--v3-text)" }),
          }}
        >
          {name}
        </h1>
        <span style={{ color: accentColor, fontSize: 11, fontWeight: 600 }}>
          {position}
        </span>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}
      >
        <VersionSwitcher />
        <motion.button
          onClick={toggleGlassMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.86 }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            border: "none",
            background: glassMode ? accentColor + "22" : "var(--v3-surface2)",
            color: glassMode ? accentColor : "var(--v3-text2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: glassMode ? "0 0 10px " + accentColor + "44" : "none",
          }}
        >
          {glassMode ? <BsDropletHalf size={14} /> : <BsDroplet size={14} />}
        </motion.button>
        <motion.button
          onClick={toggleMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.86 }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            border: "none",
            background: "var(--v3-surface2)",
            color: "var(--v3-text2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
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
            whileTap={{ scale: 0.86 }}
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              border: "none",
              background: showPicker
                ? accentColor + "22"
                : "var(--v3-surface2)",
              color: accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
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

export default MobileProfileHeader;
