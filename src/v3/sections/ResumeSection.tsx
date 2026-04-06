import React from "react";
import { motion } from "framer-motion";
import { MdWork, MdSchool } from "react-icons/md";
import { useDataContext } from "../../context/DataContext/useContext";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { fadeUp, glass, pageVariants } from "../utils";
import TimelineEntry from "../components/TimelineEntry";

const ResumeSection: React.FC = () => {
  const { company, education, services, tech } = useDataContext();
  const { accentColor, glassMode } = useV3ThemeContext();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ padding: "36px 36px 48px" }}
    >
      <motion.h3
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{
          color: "var(--v3-text)",
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 26,
          display: "flex",
          alignItems: "center",
          gap: 10,
          letterSpacing: -0.4,
        }}
      >
        <span style={{ color: accentColor, display: "flex" }}>
          <MdWork size={22} />
        </span>{" "}
        Work Experience
      </motion.h3>
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
        <p style={{ color: "var(--v3-text2)", marginBottom: 32 }}>
          No work experience data.
        </p>
      )}

      <motion.h3
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{
          color: "var(--v3-text)",
          fontSize: 22,
          fontWeight: 700,
          margin: "32px 0 26px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          letterSpacing: -0.4,
        }}
      >
        <span style={{ color: accentColor, display: "flex" }}>
          <MdSchool size={22} />
        </span>{" "}
        Education
      </motion.h3>
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
        <p style={{ color: "var(--v3-text2)", marginBottom: 32 }}>
          No education data.
        </p>
      )}

      {services?.length > 0 && (
        <div style={{ marginTop: 36 }}>
          <motion.h3
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              color: "var(--v3-text)",
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 24,
              letterSpacing: -0.4,
            }}
          >
            Skills
          </motion.h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 7,
                  }}
                >
                  <span
                    style={{
                      color: "var(--v3-text)",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {s.title}
                  </span>
                  <span
                    style={{
                      color: accentColor,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {s.percentage}%
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: "var(--v3-border)",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: s.percentage + "%" }}
                    transition={{
                      delay: i * 0.07 + 0.3,
                      duration: 0.9,
                      ease: "easeOut",
                    }}
                    style={{
                      height: "100%",
                      borderRadius: 4,
                      background:
                        "linear-gradient(90deg, " +
                        accentColor +
                        ", " +
                        accentColor +
                        "99)",
                      boxShadow: glassMode
                        ? "0 0 8px " + accentColor + "88"
                        : "none",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tech?.length > 0 && (
        <div style={{ marginTop: 36 }}>
          <motion.h3
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              color: "var(--v3-text)",
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 22,
              letterSpacing: -0.4,
            }}
          >
            Tech Stack
          </motion.h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {tech.map((t, i) => (
              <motion.div
                key={t.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.1,
                  y: -3,
                  boxShadow: "0 8px 24px " + accentColor + "33",
                }}
                style={{
                  ...glass({ borderRadius: 12, padding: "9px 14px" }),
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "default",
                }}
              >
                {(t.lightIcon || t.darkIcon) && (
                  <img
                    src={t.lightIcon || t.darkIcon}
                    alt={t.title}
                    style={{ width: 20, height: 20, objectFit: "contain" }}
                  />
                )}
                {!t.renderOnlyIcon && (
                  <span
                    style={{
                      color: "var(--v3-text)",
                      fontSize: 13,
                      fontWeight: 500,
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
