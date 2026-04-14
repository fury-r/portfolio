import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import { useDataContext } from "../../context/DataContext/useContext";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { FALLBACK, SERVICE_ICON_MAP } from "../constants";
import { fadeUp, pageVariants } from "../utils";
import TypingText from "../components/TypingText";
import ServiceCard from "../components/ServiceCard";

// ─── About Section ────────────────────────────────────────────────────────────
const AboutSection: React.FC = () => {
  const { profile, services, social } = useDataContext();
  const { accentColor, glassMode } = useV3ThemeContext();
  const about = profile?.about || FALLBACK.about;
  const name = profile?.name || FALLBACK.name;
  const github =
    social?.find((s) => s.label?.toLowerCase().includes("github"))?.href ||
    FALLBACK.github;
  const linkedin =
    social?.find((s) => s.label?.toLowerCase().includes("linkedin"))?.href ||
    FALLBACK.linkedin;
  const gradientText = glassMode
    ? {
        background:
          "linear-gradient(135deg, var(--v3-text) 10%, " +
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
      style={{ padding: "clamp(20px, 4vw, 36px) clamp(16px, 4vw, 36px) 48px" }}
    >
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{ marginBottom: 40 }}
      >
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 }}
          style={{
            color: "var(--v3-text2)",
            fontSize: 14,
            marginBottom: 10,
            letterSpacing: 0.3,
          }}
        >
          Hi there 👋, I&apos;m
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring" }}
          style={{
            fontSize: "clamp(28px, 5vw, 46px)",
            fontWeight: 800,
            margin: "0 0 10px",
            lineHeight: 1.06,
            letterSpacing: -1.2,
            ...gradientText,
          }}
        >
          {name}
        </motion.h1>
        <h2
          style={{
            color: "var(--v3-text2)",
            fontSize: 22,
            fontWeight: 400,
            margin: "0 0 22px",
            minHeight: 34,
          }}
        >
          <TypingText />
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            color: "var(--v3-text2)",
            fontSize: 15,
            lineHeight: 1.78,
            maxWidth: 620,
            marginBottom: 28,
          }}
        >
          {about}
        </motion.p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            {
              href: github,
              icon: <FaGithub size={15} />,
              label: "View GitHub",
              primary: true,
            },
            {
              href: linkedin,
              icon: <FaLinkedin size={15} />,
              label: "LinkedIn",
              primary: false,
            },
          ].map((btn) => (
            <motion.a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 24px",
                borderRadius: 13,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
                ...(btn.primary
                  ? {
                      background: accentColor,
                      color: "#fff",
                      boxShadow: "0 4px 22px " + accentColor + "55",
                    }
                  : {
                      background: "var(--v3-surface2)",
                      color: "var(--v3-text)",
                      border: "1px solid var(--v3-border)",
                    }),
              }}
            >
              {btn.icon} {btn.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
      {services && services.length > 0 && (
        <div>
          <motion.h3
            custom={1}
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
            What I Do
          </motion.h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            {services.map((service, i) => {
              const ServiceIcon = SERVICE_ICON_MAP[service.icon ?? ""] ?? (
                <VscCode size={24} />
              );
              return (
                <ServiceCard
                  key={service.title}
                  service={service}
                  icon={ServiceIcon}
                  i={i}
                />
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AboutSection;
