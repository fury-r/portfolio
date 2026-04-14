import React from "react";
import { motion } from "framer-motion";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { fadeUp, glass, liquidGlass, ios26Spring } from "../utils";
import { useTilt } from "../hooks/useTilt";

const ServiceCard: React.FC<{
  service: { title: string; description: string; percentage: number };
  icon: React.ReactNode;
  i: number;
}> = ({ service, icon, i }) => {
  const { accentColor, glassMode } = useV3ThemeContext();
  const { rotateX, rotateY, onMove, onLeave } = useTilt(5);
  return (
    <motion.div
      custom={i + 2}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      style={{ perspective: 800 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.97 }}
        transition={ios26Spring()}
        style={{
          ...(glassMode
            ? liquidGlass(accentColor, { borderRadius: 22, padding: 24 })
            : glass({
                borderRadius: 18,
                padding: 24,
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              })),
          cursor: "default",
          rotateX,
          rotateY,
          position: "relative",
          overflow: "hidden",
          transformStyle: "preserve-3d",
          height: "100%",
        }}
      >
        <div
          style={{
            height: "80%",
            width: "100%",
          }}
        >
          {glassMode && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "55%",
                height: "100%",
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.07) 50%, transparent 65%)",
                animation: "v3cardshine 5s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />
          )}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: "var(--v3-specular, rgba(255,255,255,0.12))",
              borderRadius: "18px 18px 0 0",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: glassMode ? 18 : 16,
              background: accentColor + "22",
              color: accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              border: "1px solid " + accentColor + (glassMode ? "44" : "33"),
              backdropFilter: glassMode ? "blur(8px)" : undefined,
              WebkitBackdropFilter: glassMode ? "blur(8px)" : undefined,
              boxShadow: glassMode
                ? "inset 0 1px 0 rgba(255,255,255,0.30), 0 0 24px " +
                  accentColor +
                  "33"
                : "none",
            }}
          >
            {icon}
          </div>
          <h4
            style={{
              color: "var(--v3-text)",
              fontWeight: 700,
              fontSize: 15,
              margin: "0 0 8px",
              letterSpacing: -0.2,
            }}
          >
            {service.title}
          </h4>
          <p
            style={{
              color: "var(--v3-text2)",
              fontSize: 13,
              margin: "0 0 16px",
              lineHeight: 1.65,
            }}
          >
            {service.description}
          </p>
        </div>
        {service.percentage > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                marginTop: 12,
                height: "20%",
              }}
            >
              <span
                style={{
                  color: "var(--v3-text2)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Proficiency
              </span>
              <span
                style={{ color: accentColor, fontSize: 12, fontWeight: 700 }}
              >
                {service.percentage}%
              </span>
            </div>
            <div
              style={{
                height: 5,
                background: "var(--v3-border)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: service.percentage + "%" }}
                transition={{
                  delay: i * 0.09 + 0.5,
                  duration: 0.9,
                  ease: "easeOut",
                }}
                style={{
                  height: "100%",
                  borderRadius: 3,
                  background:
                    "linear-gradient(90deg, " +
                    accentColor +
                    ", " +
                    accentColor +
                    "bb)",
                  boxShadow: glassMode
                    ? "0 0 8px " + accentColor + "88"
                    : "none",
                }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default React.memo(ServiceCard);
