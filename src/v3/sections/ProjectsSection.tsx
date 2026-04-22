import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDataContext } from "../../context/DataContext/useContext";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { bentoFadeIn, pageVariants, shimmerText } from "../utils";
import ProjectCard from "../components/ProjectCard";

const FILTERS = ["All", "Web", "Mobile"] as const;
type Filter = (typeof FILTERS)[number];

// ─── Projects Section ──────────────────────────────────────────────────────────
const ProjectsSection: React.FC = () => {
    const { projects } = useDataContext();
    const { accentColor, glassMode } = useV3ThemeContext();
    const [filter, setFilter] = useState<Filter>("All");

    const filtered = useMemo(() => {
        if (!projects) return [];
        if (filter === "All") return projects;
        return projects.filter(
            (p) =>
                (typeof p.type === "string" ? p.type : String(p.type)).toLowerCase() ===
                filter.toLowerCase(),
        );
    }, [projects, filter]);

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ padding: "clamp(20px, 4vw, 32px) clamp(16px, 4vw, 32px) 48px" }}
        >
            {/* Header */}
            <motion.div
                custom={0}
                variants={bentoFadeIn}
                initial="hidden"
                animate="visible"
                style={{ marginBottom: 28 }}
            >
                <h2
                    style={{
                        fontSize: 30,
                        fontWeight: 800,
                        marginBottom: 6,
                        letterSpacing: -0.8,
                        ...shimmerText(accentColor, glassMode),
                    }}
                >
                    Projects
                </h2>
                <p style={{ color: "var(--v3-text2)", fontSize: 14, margin: 0 }}>
                    A selection of things I&apos;ve built.
                </p>
            </motion.div>

            {/* Filter tabs with sliding underline */}
            <motion.div
                custom={1}
                variants={bentoFadeIn}
                initial="hidden"
                animate="visible"
                style={{
                    display: "inline-flex",
                    gap: 2,
                    marginBottom: 28,
                    background: "var(--v3-surface2)",
                    borderRadius: 14,
                    padding: 4,
                    border: "1px solid var(--v3-border)",
                    position: "relative",
                }}
            >
                {FILTERS.map((f) => (
                    <motion.button
                        key={f}
                        onClick={() => setFilter(f)}
                        whileTap={{ scale: 0.94 }}
                        style={{
                            padding: "7px 20px",
                            borderRadius: 10,
                            background: filter === f ? accentColor : "transparent",
                            color: filter === f ? "#fff" : "var(--v3-text2)",
                            fontWeight: filter === f ? 700 : 500,
                            fontSize: 13,
                            cursor: "pointer",
                            border: "none",
                            outline: "none",
                            position: "relative",
                            zIndex: 1,
                            transition: "color 0.15s",
                            boxShadow:
                                filter === f && glassMode
                                    ? "0 4px 20px " + accentColor + "55"
                                    : filter === f
                                      ? "0 2px 10px " + accentColor + "44"
                                      : "none",
                        } as React.CSSProperties}
                    >
                        {f}
                        {filter === f && (
                            <motion.span
                                layoutId="filter-active-bg"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: accentColor,
                                    borderRadius: 10,
                                    zIndex: -1,
                                }}
                            />
                        )}
                    </motion.button>
                ))}
            </motion.div>

            {/* Project count label */}
            <motion.p
                key={filter}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    color: "var(--v3-text2)",
                    fontSize: 12,
                    marginBottom: 18,
                    letterSpacing: 0.3,
                }}
            >
                Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                {filter !== "All" ? ` · ${filter}` : ""}
            </motion.p>

            {/* Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
                    gap: 18,
                }}
            >
                <AnimatePresence mode="popLayout">
                    {filtered.map((project, i) => (
                        <ProjectCard key={project.title} project={project} i={i} />
                    ))}
                </AnimatePresence>
            </div>

            {filtered.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        textAlign: "center",
                        padding: "60px 48px",
                        color: "var(--v3-text2)",
                    }}
                >
                    <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.4 }}>🔍</div>
                    <p style={{ fontSize: 15 }}>No {filter} projects found.</p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ProjectsSection;