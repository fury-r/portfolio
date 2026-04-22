import React from "react";
import { motion } from "framer-motion";
import { MdWork, MdSchool } from "react-icons/md";
import { useDataContext } from "../../context/DataContext/useContext";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { bentoFadeIn, glass, pageVariants, shimmerText } from "../utils";
import TimelineEntry from "../components/TimelineEntry";

const SectionTitle: React.FC<{
    icon: React.ReactNode;
    title: string;
    accent: string;
    glassMode: boolean;
    i?: number;
}> = ({ icon, title, accent, glassMode, i = 0 }) => (
    <motion.h3
        custom={i}
        variants={bentoFadeIn}
        initial="hidden"
        animate="visible"
        style={{
            color: "var(--v3-text)",
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
            letterSpacing: -0.4,
        }}
    >
        <span
            style={{
                color: accent,
                display: "flex",
                width: 34,
                height: 34,
                borderRadius: 10,
                background: accent + "18",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${accent}33`,
                boxShadow: glassMode ? `0 0 12px ${accent}33` : "none",
                flexShrink: 0,
            }}
        >
            {icon}
        </span>
        {title}
    </motion.h3>
);

const ResumeSection: React.FC = () => {
    const { company, education, services, tech } = useDataContext();
    const { accentColor, glassMode } = useV3ThemeContext();

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ padding: "clamp(20px, 4vw, 32px) clamp(16px, 4vw, 32px) 48px" }}
        >
            {/* Header */}
            <motion.div custom={0} variants={bentoFadeIn} initial="hidden" animate="visible" style={{ marginBottom: 28 }}>
                <h2
                    style={{
                        fontSize: 30,
                        fontWeight: 800,
                        marginBottom: 6,
                        letterSpacing: -0.8,
                        ...shimmerText(accentColor, glassMode),
                    }}
                >
                    Résumé
                </h2>
                <p style={{ color: "var(--v3-text2)", fontSize: 14, margin: 0 }}>
                    Experience, education & skills.
                </p>
            </motion.div>

            {/* ── Work Experience ─────────────────────────────────────────── */}
            <SectionTitle icon={<MdWork size={18} />} title="Work Experience" accent={accentColor} glassMode={glassMode} i={1} />
            {company?.length > 0 ? (
                company.map((c, i) => (
                    <TimelineEntry
                        key={i}
                        i={i + 1}
                        title={c.name}
                        subtitle={c.title}
                        duration={c.duration}
                        description={c.description}
                        subItems={c.subItems}
                    />
                ))
            ) : (
                <p style={{ color: "var(--v3-text2)", marginBottom: 32 }}>No work experience data.</p>
            )}

            {/* ── Education ──────────────────────────────────────────────── */}
            <SectionTitle icon={<MdSchool size={18} />} title="Education" accent={accentColor} glassMode={glassMode} i={2} />
            {education?.length > 0 ? (
                education.map((e, i) => (
                    <TimelineEntry
                        key={i}
                        i={i + 1}
                        title={e.name}
                        subtitle={e.title}
                        duration={e.duration}
                        description={e.description}
                    />
                ))
            ) : (
                <p style={{ color: "var(--v3-text2)", marginBottom: 32 }}>No education data.</p>
            )}

            {/* ── Skills with progress bars ───────────────────────────────── */}
            {services?.length > 0 && (
                <div style={{ marginTop: 32 }}>
                    <motion.h3
                        custom={3}
                        variants={bentoFadeIn}
                        initial="hidden"
                        animate="visible"
                        style={{
                            color: "var(--v3-text)",
                            fontSize: 20,
                            fontWeight: 700,
                            marginBottom: 20,
                            letterSpacing: -0.4,
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <span
                            style={{
                                width: 3,
                                height: 20,
                                borderRadius: 2,
                                background: accentColor,
                                display: "inline-block",
                                boxShadow: glassMode ? `0 0 10px ${accentColor}` : "none",
                            }}
                        />
                        Skills
                    </motion.h3>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                            gap: 16,
                        }}
                    >
                        {services.map((s, i) => (
                            <motion.div
                                key={s.title}
                                custom={i + 4}
                                variants={bentoFadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-30px" }}
                                style={{
                                    ...glass({ borderRadius: 14, padding: "14px 16px" }),
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <div className="v3-noise" />
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 10,
                                    }}
                                >
                                    <span style={{ color: "var(--v3-text)", fontSize: 13, fontWeight: 600 }}>
                                        {s.title}
                                    </span>
                                    <span style={{ color: accentColor, fontSize: 12, fontWeight: 700 }}>
                                        {s.percentage}%
                                    </span>
                                </div>
                                {/* Track */}
                                <div
                                    style={{
                                        height: 5,
                                        background: "var(--v3-border)",
                                        borderRadius: 4,
                                        overflow: "hidden",
                                    }}
                                >
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{
                                            delay: i * 0.05 + 0.2,
                                            duration: 0.9,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        style={{
                                            height: "100%",
                                            borderRadius: 4,
                                            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}aa)`,
                                            boxShadow: glassMode ? `0 0 8px ${accentColor}77` : "none",
                                            transformOrigin: "left",
                                            width: s.percentage + "%",
                                        }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Tech Stack ──────────────────────────────────────────────── */}
            {tech?.length > 0 && (
                <div style={{ marginTop: 32 }}>
                    <motion.h3
                        custom={5}
                        variants={bentoFadeIn}
                        initial="hidden"
                        animate="visible"
                        style={{
                            color: "var(--v3-text)",
                            fontSize: 20,
                            fontWeight: 700,
                            marginBottom: 18,
                            letterSpacing: -0.4,
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <span
                            style={{
                                width: 3,
                                height: 20,
                                borderRadius: 2,
                                background: accentColor,
                                display: "inline-block",
                                boxShadow: glassMode ? `0 0 10px ${accentColor}` : "none",
                            }}
                        />
                        Tech Stack
                    </motion.h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {tech.map((t, i) => (
                            <motion.div
                                key={t.title}
                                custom={i}
                                variants={bentoFadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-30px" }}
                                whileHover={{
                                    scale: 1.08,
                                    y: -3,
                                    boxShadow: "0 8px 24px " + accentColor + "33",
                                }}
                                style={{
                                    ...glass({ borderRadius: 12, padding: "8px 14px" }),
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    cursor: "default",
                                    border: `1px solid ${accentColor}15`,
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <div className="v3-noise" />
                                {(t.lightIcon || t.darkIcon) && (
                                    <img
                                        src={t.lightIcon || t.darkIcon}
                                        alt={t.title}
                                        style={{ width: 18, height: 18, objectFit: "contain", position: "relative", zIndex: 1 }}
                                    />
                                )}
                                {!t.renderOnlyIcon && (
                                    <span
                                        style={{
                                            color: "var(--v3-text)",
                                            fontSize: 12,
                                            fontWeight: 600,
                                            position: "relative",
                                            zIndex: 1,
                                        }}
                                    >
                                        {t.title}
                                    </span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ResumeSection;