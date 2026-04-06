import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDataContext } from "../../context/DataContext/useContext";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { fadeUp, pageVariants } from "../utils";
import ProjectCard from "../components/ProjectCard";

// ─── Projects Section ──────────────────────────────────────────────────────────
const ProjectsSection: React.FC = () => {
  const { projects } = useDataContext();
  const { accentColor, glassMode } = useV3ThemeContext();
  const [filter, setFilter] = useState<"All" | "Web" | "Mobile">("All");
  const filtered = useMemo(() => {
    if (!projects) return [];
    if (filter === "All") return projects;
    return projects.filter(
      (p) =>
        (typeof p.type === "string" ? p.type : String(p.type)).toLowerCase() ===
        filter.toLowerCase(),
    );
  }, [projects, filter]);
  const gradientText = glassMode
    ? {
        background:
          "linear-gradient(135deg, var(--v3-text) 20%, " +
          accentColor +
          " 55%, var(--v3-text) 90%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundSize: "200% auto",
        animation: "v3textShimmer 5s linear infinite",
      }
    : { color: "var(--v3-text)" };
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ padding: "36px 36px 48px" }}
    >
      <motion.h2
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{
          fontSize: 30,
          fontWeight: 800,
          marginBottom: 8,
          letterSpacing: -0.8,
          ...gradientText,
        }}
      >
        Projects
      </motion.h2>
      <motion.p
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{ color: "var(--v3-text2)", fontSize: 15, marginBottom: 26 }}
      >
        A selection of things I&apos;ve built.
      </motion.p>
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", gap: 8, marginBottom: 30 }}
      >
        {(["All", "Web", "Mobile"] as const).map((f) => (
          <motion.button
            key={f}
            onClick={() => setFilter(f)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            style={
              {
                padding: "7px 22px",
                borderRadius: 22,
                background: filter === f ? accentColor : "var(--v3-surface2)",
                color: filter === f ? "#fff" : "var(--v3-text2)",
                fontWeight: filter === f ? 700 : 500,
                fontSize: 13,
                cursor: "pointer",
                border:
                  "1px solid " +
                  (filter === f ? accentColor : "var(--v3-border)"),
                boxShadow:
                  filter === f && glassMode
                    ? "0 4px 20px " + accentColor + "55"
                    : filter === f
                      ? "0 4px 12px " + accentColor + "33"
                      : "none",
                transition: "all 0.2s",
              } as React.CSSProperties
            }
          >
            {f}
          </motion.button>
        ))}
      </motion.div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} i={i} />
          ))}
        </AnimatePresence>
      </div>
      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: "var(--v3-text2)", textAlign: "center", padding: 48 }}
        >
          No projects found.
        </motion.p>
      )}
    </motion.div>
  );
};

export default ProjectsSection;
