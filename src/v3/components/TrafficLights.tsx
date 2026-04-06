import React from "react";
import { motion } from "framer-motion";

export const TrafficLights: React.FC = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    {[
      { c: "#FF5F57", s: "#FF5F5766" },
      { c: "#FEBC2E", s: "#FEBC2E66" },
      { c: "#28C840", s: "#28C84066" },
    ].map((btn, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.88 }}
        style={{
          width: 13,
          height: 13,
          borderRadius: "50%",
          background: btn.c,
          boxShadow:
            "0 0 7px " + btn.s + ", inset 0 1px 1px rgba(255,255,255,0.4)",
          cursor: "default",
        }}
      />
    ))}
  </div>
);
