import React from "react";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";

const VersionSwitcher: React.FC = () => {
  const { accentColor } = useV3ThemeContext();
  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        background: "rgba(0,0,0,0.28)",
        borderRadius: 9,
        padding: 3,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {(["v1", "v2", "v3"] as const).map((v) => (
        <button
          key={v}
          onClick={() => {
            if (v !== "v3") window.location.href = "/" + v;
          }}
          style={{
            padding: "3px 11px",
            borderRadius: 6,
            border: "none",
            fontSize: 12,
            fontWeight: 600,
            cursor: v === "v3" ? "default" : "pointer",
            background: v === "v3" ? accentColor : "transparent",
            color: v === "v3" ? "#fff" : "var(--v3-text2)",
            transition: "all 0.15s",
            letterSpacing: 0.3,
          }}
          onMouseEnter={(e) => {
            if (v !== "v3") e.currentTarget.style.color = "var(--v3-text)";
          }}
          onMouseLeave={(e) => {
            if (v !== "v3") e.currentTarget.style.color = "var(--v3-text2)";
          }}
        >
          {v}
        </button>
      ))}
    </div>
  );
};

export default VersionSwitcher;
