import React from "react";
import { motion } from "framer-motion";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { fadeUp, glass } from "../utils";

const TimelineEntry: React.FC<{
  title: string;
  subtitle: string;
  duration?: string;
  description?: string;
  subItems?: { subTitle: string; date: string }[];
  i: number;
}> = ({ title, subtitle, duration, description, subItems, i }) => {
  const { accentColor, glassMode } = useV3ThemeContext();
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      style={{ display: "flex", gap: 18, marginBottom: 26 }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <motion.div
          animate={
            glassMode
              ? {
                  boxShadow: [
                    "0 0 10px " + accentColor + "88",
                    "0 0 24px " + accentColor,
                    "0 0 10px " + accentColor + "88",
                  ],
                }
              : {}
          }
          transition={{ duration: 2.4, repeat: Infinity }}
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: accentColor,
            boxShadow: "0 0 10px " + accentColor + "88",
            flexShrink: 0,
            marginTop: 4,
          }}
        />
        <div
          style={{
            width: 2,
            flex: 1,
            background: accentColor + "30",
            marginTop: 6,
          }}
        />
      </div>
      <motion.div
        whileHover={{ y: -3, boxShadow: "0 14px 40px " + accentColor + "22" }}
        transition={{ type: "spring", stiffness: 280 }}
        style={{
          ...glass({ borderRadius: 16, padding: 20 }),
          flex: 1,
          position: "relative",
          overflow: "hidden",
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
              background: "var(--v3-specular, rgba(255,255,255,0.15))",
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <h4
            style={{
              color: "var(--v3-text)",
              fontWeight: 700,
              fontSize: 16,
              margin: 0,
              letterSpacing: -0.3,
            }}
          >
            {title}
          </h4>
          {duration && (
            <span
              style={{
                color: accentColor,
                fontSize: 11,
                fontWeight: 700,
                background: accentColor + "18",
                padding: "3px 12px",
                borderRadius: 20,
                border: "1px solid " + accentColor + "33",
              }}
            >
              {duration}
            </span>
          )}
        </div>
        <p
          style={{
            color: accentColor,
            fontSize: 13,
            fontWeight: 600,
            margin: "0 0 10px",
          }}
        >
          {subtitle}
        </p>
        {description && (
          <p
            style={{
              color: "var(--v3-text2)",
              fontSize: 13,
              lineHeight: 1.7,
              margin: "0 0 10px",
            }}
          >
            {description}
          </p>
        )}
        {subItems?.map((sub, si) => (
          <div
            key={si}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "7px 0",
              borderTop: "1px solid var(--v3-border)",
            }}
          >
            <span style={{ color: "var(--v3-text2)", fontSize: 13 }}>
              {sub.subTitle}
            </span>
            <span style={{ color: "var(--v3-text2)", fontSize: 12 }}>
              {sub.date}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TimelineEntry;
