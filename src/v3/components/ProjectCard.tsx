import React from "react";
import { motion } from "framer-motion";
import { BsGrid1X2Fill } from "react-icons/bs";
import { RiExternalLinkLine } from "react-icons/ri";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { fadeUp, glass, liquidGlass, ios26SpringSoft } from "../utils";
import { useTilt } from "../hooks/useTilt";

const ProjectCard: React.FC<{
  project: {
    title: string;
    description: string;
    images?: string[];
    type?: unknown;
    techStack?: { title: string }[];
    link?: string;
  };
  i: number;
}> = ({ project, i }) => {
  const { accentColor, glassMode } = useV3ThemeContext();
  const { rotateX, rotateY, onMove, onLeave } = useTilt(4);
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.88 }}
      layout
      style={{ perspective: 900 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ y: -10 }}
        whileTap={{ scale: 0.97 }}
        transition={ios26SpringSoft()}
        style={{
          ...(glassMode
            ? liquidGlass(accentColor, { borderRadius: 22 })
            : glass({
                borderRadius: 18,
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              })),
          overflow: "hidden",
          cursor: "default",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {/* Grain texture */}
        <div className="v3-noise" style={{ zIndex: 0 }} />
        <div
          style={{
            height: 162,
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
            background: accentColor + "10",
          }}
        >
          {project.images && project.images.length > 0 ? (
            <motion.img
              src={project.images[0]}
              alt={project.title}
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.4 }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: accentColor,
                opacity: 0.32,
              }}
            >
              <BsGrid1X2Fill size={52} />
            </div>
          )}
          {glassMode && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                pointerEvents: "none",
              }}
            />
          )}
          <span
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
              letterSpacing: 0.6,
              textTransform: "uppercase",
            }}
          >
            {typeof project.type === "string" ? project.type : "Project"}
          </span>
        </div>
        <div style={{ padding: 20, position: "relative", zIndex: 1 }}>
          {glassMode && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background: "var(--v3-specular, rgba(255,255,255,0.10))",
              }}
            />
          )}
          <h4
            style={{
              color: "var(--v3-text)",
              fontWeight: 700,
              fontSize: 15,
              margin: "0 0 8px",
              letterSpacing: -0.2,
            }}
          >
            {project.title}
          </h4>
          <p
            style={
              {
                color: "var(--v3-text2)",
                fontSize: 13,
                lineHeight: 1.65,
                margin: "0 0 14px",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              } as React.CSSProperties
            }
          >
            {project.description}
          </p>
          {project.techStack && project.techStack.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 16,
              }}
            >
              {project.techStack.slice(0, 5).map((t) => (
                <span
                  key={t.title}
                  style={{
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    background: accentColor + "18",
                    color: accentColor,
                    border: "1px solid " + accentColor + "33",
                    fontWeight: 600,
                  }}
                >
                  {t.title}
                </span>
              ))}
              {project.techStack.length > 5 && (
                <span
                  style={{
                    color: "var(--v3-text2)",
                    fontSize: 11,
                    padding: "3px 0",
                  }}
                >
                  +{project.techStack.length - 5} more
                </span>
              )}
            </div>
          )}
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: accentColor,
                color: "#fff",
                padding: "8px 18px",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 700,
                boxShadow: glassMode
                  ? "0 4px 20px " + accentColor + "55"
                  : "0 4px 14px " + accentColor + "44",
              }}
            >
              <RiExternalLinkLine size={13} /> View
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCardMemo = React.memo(ProjectCard);
export default ProjectCardMemo;
