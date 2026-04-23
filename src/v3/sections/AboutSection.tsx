import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import { useDataContext } from "../../context/DataContext/useContext";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { FALLBACK, SERVICE_ICON_MAP } from "../constants";
import { bentoCard, bentoFadeIn, pageVariants, shimmerText } from "../utils";
import TypingText from "../components/TypingText";
import ServiceCard from "../components/ServiceCard";
import { useCountUp } from "../hooks/useCountUp";
import { useMediaQuery } from "../../hooks/useMediaQuery";

// ── Bento stat cell ────────────────────────────────────────────────────────────
const StatCell: React.FC<{
  value: number;
  suffix?: string;
  label: string;
  accent: string;
  glassMode: boolean;
  i: number;
}> = ({ value, suffix = "+", label, accent, glassMode, i }) => {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 500 + i * 120);
    return () => clearTimeout(t);
  }, [i]);
  const count = useCountUp(value, 1000, started);
  return (
    <motion.div
      custom={i}
      variants={bentoFadeIn}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -3, boxShadow: `0 12px 32px ${accent}22` }}
      style={{
        ...bentoCard({
          padding: "18px 16px",
          textAlign: "center",
          border: `1px solid ${accent}22`,
          boxShadow: glassMode ? `0 0 20px ${accent}14` : "none",
          cursor: "default",
        }),
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: accent,
          lineHeight: 1,
          letterSpacing: -1,
          animation: "v3statsenter 0.5s ease-out both",
          animationDelay: `${0.5 + i * 0.12}s`,
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          color: "var(--v3-text2)",
          fontSize: 11,
          marginTop: 5,
          textTransform: "uppercase",
          letterSpacing: 0.6,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      {/* Noise texture */}
      <div className="v3-noise" />
    </motion.div>
  );
};

// ─── About Section ────────────────────────────────────────────────────────────
const AboutSection: React.FC = () => {
  const { profile, services, social } = useDataContext();
  const { accentColor, glassMode } = useV3ThemeContext();
  const isMobile = useMediaQuery("sm");
  const about = profile?.about || FALLBACK.about;
  const name = profile?.name || FALLBACK.name;
  const github =
    social?.find((s) => s.label?.toLowerCase().includes("github"))?.href ||
    FALLBACK.github;
  const linkedin =
    social?.find((s) => s.label?.toLowerCase().includes("linkedin"))?.href ||
    FALLBACK.linkedin;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ padding: "clamp(20px, 4vw, 32px) clamp(16px, 4vw, 32px) 48px" }}
    >
      {/* ── Bento grid ──────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto auto",
          gap: 14,
          marginBottom: 32,
        }}
      >
        {/* Hero cell — spans 2 columns */}
        <motion.div
          custom={0}
          variants={bentoFadeIn}
          initial="hidden"
          animate="visible"
          style={{
            ...bentoCard({
              padding: "28px 28px 24px",
              gridColumn: isMobile ? "1 / 4" : "1 / 3",
            }),
            boxShadow: glassMode
              ? `0 8px 40px rgba(0,0,0,0.3), 0 0 40px ${accentColor}18`
              : "0 4px 24px rgba(0,0,0,0.12)",
          }}
        >
          <div className="v3-noise" />
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 }}
            style={{
              color: "var(--v3-text2)",
              fontSize: 13,
              marginBottom: 8,
              letterSpacing: 0.3,
            }}
          >
            Hi there 👋, I&apos;m
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            style={{
              fontSize: "clamp(26px, 4.5vw, 42px)",
              fontWeight: 800,
              margin: "0 0 8px",
              lineHeight: 1.06,
              letterSpacing: -1.2,
              ...shimmerText(accentColor, glassMode),
            }}
          >
            {name}
          </motion.h1>
          <h2
            style={{
              color: "var(--v3-text2)",
              fontSize: 18,
              fontWeight: 400,
              margin: "0 0 16px",
              minHeight: 28,
            }}
          >
            <TypingText />
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
            style={{
              color: "var(--v3-text2)",
              fontSize: 13.5,
              lineHeight: 1.78,
              maxWidth: 540,
              marginBottom: 22,
            }}
          >
            {about}
          </motion.p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 22px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 13,
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

        {/* Availability cell */}
        <motion.div
          custom={1}
          variants={bentoFadeIn}
          initial="hidden"
          animate="visible"
          className="md:w-full"
          style={{
            ...bentoCard({
              padding: "22px 20px",
              gridColumn: isMobile ? "1 / 4" : "3",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
              background: glassMode
                ? `linear-gradient(135deg, rgba(34,197,94,0.12) 0%, var(--v3-surface) 60%)`
                : `linear-gradient(135deg, rgba(34,197,94,0.08) 0%, var(--v3-surface) 60%)`,
              border: "1px solid rgba(34,197,94,0.25)",
            }),
          }}
        >
          <div className="v3-noise" />
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 10,
              }}
            >
              <span
                className="v3-avail-dot"
                style={{ color: "rgb(34,197,94)" }}
              />
              <span
                style={{
                  color: "rgb(34,197,94)",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Available
              </span>
            </div>
            <p
              style={{
                color: "var(--v3-text)",
                fontSize: 15,
                fontWeight: 700,
                margin: "0 0 6px",
                lineHeight: 1.3,
              }}
            >
              Open to new opportunities
            </p>
            <p
              style={{
                color: "var(--v3-text2)",
                fontSize: 12,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Full-time · Contract · Remote
            </p>
          </div>
          <div
            style={{
              marginTop: 14,
              padding: "8px 12px",
              borderRadius: 10,
              background: "rgba(34,197,94,0.10)",
              border: "1px solid rgba(34,197,94,0.20)",
              fontSize: 11,
              color: "rgb(34,197,94)",
              fontWeight: 600,
            }}
          >
            📍 {FALLBACK.location}
          </div>
        </motion.div>

        {/* Stat cells — 3 equal columns */}
        <StatCell
          value={3}
          label="Years Exp"
          accent={accentColor}
          glassMode={glassMode}
          i={2}
        />
        <StatCell
          value={6}
          suffix="+"
          label="Projects"
          accent={accentColor}
          glassMode={glassMode}
          i={3}
        />
        <StatCell
          value={15}
          suffix="+"
          label="Technologies"
          accent={accentColor}
          glassMode={glassMode}
          i={4}
        />
      </div>

      {/* ── Services / What I Do ─────────────────────────────────────── */}
      {services && services.length > 0 && (
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            style={{
              color: "var(--v3-text)",
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 16,
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
            What I Do
          </motion.h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
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
