import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import ProfileImage from "../../assets/profile.jpg";
import { useDataContext } from "../../context/DataContext/useContext";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { FALLBACK, NAV_ITEMS } from "../constants";
import { glass } from "../utils";
import { useCountUp } from "../hooks/useCountUp";

interface SidebarProps {
  basePath: string;
}

const StatBadge: React.FC<{
  label: string;
  value: number;
  suffix?: string;
  accent: string;
  glassMode: boolean;
  delay?: number;
}> = ({ label, value, suffix = "+", accent, glassMode, delay = 0 }) => {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 600 + delay);
    return () => clearTimeout(t);
  }, [delay]);
  const count = useCountUp(value, 1000, started);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + delay / 1000, type: "spring", stiffness: 200 }}
      style={{
        ...glass({ borderRadius: 14, padding: "10px 14px" }),
        flex: 1,
        textAlign: "center",
        boxShadow: glassMode ? `0 0 16px ${accent}18` : "none",
        border: `1px solid ${accent}22`,
      }}
    >
      <div
        style={{
          color: accent,
          fontSize: 20,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: -0.5,
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          color: "var(--v3-text2)",
          fontSize: 10,
          marginTop: 3,
          letterSpacing: 0.3,
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ basePath }) => {
  const location = useLocation();
  const { accentColor, glassMode } = useV3ThemeContext();
  const { profile, social } = useDataContext();
  const name = profile?.name || FALLBACK.name;
  const position = profile?.position || FALLBACK.position;
  const email = profile?.email || FALLBACK.email;
  const phone = profile?.phone || FALLBACK.phone;
  const locationText = profile?.location || FALLBACK.location;
  const avatarSrc = profile?.picture
    ? typeof profile.picture === "string" && profile.picture.startsWith("//")
      ? "https:" + profile.picture
      : profile.picture
    : ProfileImage;
  const socialLinks = (
    social && social.length > 0
      ? social
      : [
          { label: "GitHub", href: FALLBACK.github },
          { label: "Linkedin", href: FALLBACK.linkedin },
        ]
  ).filter((s) => {
    const lbl = s.label?.toLowerCase() || "";
    return (
      lbl.includes("github") ||
      lbl.includes("linkedin") ||
      lbl.includes("instagram")
    );
  });
  const activePath = location.pathname.replace(basePath, "") || "/";

  return (
    <div
      style={{
        width: 260,
        minWidth: 260,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...glass({
          borderRight: "1px solid var(--v3-border)",
          borderRadius: 0,
        }),
        overflow: "hidden",
        position: "relative",
      }}
    >
      {glassMode && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-60%",
            width: "40%",
            height: "100%",
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
            animation: "v3shimmer 10s ease-in-out 3s infinite",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      )}

      {/* ── Profile ──────────────────────────────────────────────────── */}
      <div style={{ padding: "22px 20px 14px", textAlign: "center" }}>
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(34,197,94,0.30)",
            borderRadius: 20,
            padding: "4px 12px",
            marginBottom: 14,
          }}
        >
          <span className="v3-avail-dot" style={{ color: "rgb(34,197,94)" }} />
          <span
            style={{
              color: "rgb(34,197,94)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            Available for work
          </span>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 20,
            delay: 0.08,
          }}
          style={{
            width: 86,
            height: 86,
            borderRadius: "50%",
            margin: "0 auto 12px",
            position: "relative",
          }}
        >
          {/* Rotating gradient ring */}
          <div
            style={{
              position: "absolute",
              inset: -3,
              borderRadius: "50%",
              background: `conic-gradient(${accentColor}, ${accentColor}55, rgba(130,70,255,0.6), ${accentColor})`,
              animation: "v3gradrotate 4s linear infinite",
              backgroundSize: "200% 200%",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 2,
              borderRadius: "50%",
              background: "var(--v3-bg)",
            }}
          />
          <img
            src={avatarSrc}
            alt={name}
            style={{
              position: "absolute",
              inset: 3,
              width: "calc(100% - 6px)",
              height: "calc(100% - 6px)",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          style={{
            fontWeight: 700,
            fontSize: 16,
            margin: "0 0 6px",
            letterSpacing: -0.3,
            ...(glassMode
              ? {
                  background: `linear-gradient(135deg, var(--v3-text) 20%, ${accentColor} 60%, var(--v3-text) 80%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto",
                  animation: "v3textShimmer 5s linear infinite",
                }
              : { color: "var(--v3-text)" }),
          }}
        >
          {name}
        </motion.h2>
        <motion.span
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            background: accentColor + "20",
            color: accentColor,
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 12px",
            borderRadius: 20,
            border: "1px solid " + accentColor + "44",
            letterSpacing: 0.4,
            textTransform: "uppercase",
            display: "inline-block",
          }}
        >
          {position}
        </motion.span>
      </div>

      {/* ── Stats row ─────────────────────────────────────────────────── */}
      <div style={{ padding: "0 14px 14px", display: "flex", gap: 8 }}>
        <StatBadge
          label="Years"
          value={3}
          accent={accentColor}
          glassMode={glassMode}
          delay={0}
        />
        <StatBadge
          label="Projects"
          value={6}
          accent={accentColor}
          glassMode={glassMode}
          delay={100}
        />
        <StatBadge
          label="Stack"
          value={15}
          accent={accentColor}
          glassMode={glassMode}
          delay={200}
        />
      </div>

      <div
        style={{
          height: 1,
          background: "var(--v3-border)",
          margin: "0 16px 14px",
        }}
      />

      {/* ── Contact info ──────────────────────────────────────────────── */}
      <div
        style={{
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: 9,
        }}
      >
        {[
          { icon: <FaEnvelope size={11} />, text: email },
          { icon: <FaPhone size={11} />, text: phone },
          { icon: <FaMapMarkerAlt size={11} />, text: locationText },
        ].map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 9 }}
          >
            <span
              style={{
                color: accentColor,
                flexShrink: 0,
                width: 26,
                height: 26,
                borderRadius: 8,
                background: accentColor + "18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </span>
            <span
              style={{
                color: "var(--v3-text2)",
                fontSize: 11,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* ── Social links ──────────────────────────────────────────────── */}
      <div style={{ padding: "12px 20px", display: "flex", gap: 8 }}>
        {socialLinks.map((s) => {
          const lbl = s.label?.toLowerCase() || "";
          const icon = lbl.includes("github") ? (
            <FaGithub size={16} />
          ) : lbl.includes("linkedin") ? (
            <FaLinkedin size={16} />
          ) : (
            <FaInstagram size={16} />
          );
          return (
            <motion.a
              key={s.label}
              href={s.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              whileHover={{
                y: -3,
                scale: 1.1,
                boxShadow: `0 6px 20px ${accentColor}44`,
              }}
              whileTap={{ scale: 0.88 }}
              style={{
                color: "var(--v3-text2)",
                display: "flex",
                alignItems: "center",
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "var(--v3-surface2)",
                border: "1px solid var(--v3-border)",
                justifyContent: "center",
                textDecoration: "none",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = accentColor;
                e.currentTarget.style.borderColor = accentColor + "55";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--v3-text2)";
                e.currentTarget.style.borderColor = "var(--v3-border)";
              }}
            >
              {icon}
            </motion.a>
          );
        })}
      </div>

      <div
        style={{
          height: 1,
          background: "var(--v3-border)",
          margin: "0 16px 12px",
        }}
      />

      {/* ── Navigation ───────────────────────────────────────────────── */}
      <nav
        style={{
          flex: 1,
          padding: "0 10px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            activePath === item.path ||
            (item.path !== "/" && activePath.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={basePath + item.path}
              style={{ textDecoration: "none" }}
            >
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: 11,
                  background: isActive ? accentColor + "22" : "transparent",
                  color: isActive ? accentColor : "var(--v3-text2)",
                  fontWeight: isActive ? 700 : 400,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                  border: isActive
                    ? "1px solid " + accentColor + "44"
                    : "1px solid transparent",
                  boxShadow:
                    isActive && glassMode
                      ? "0 0 14px " + accentColor + "22"
                      : "none",
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    style={{
                      marginLeft: "auto",
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: accentColor,
                      boxShadow: glassMode
                        ? `0 0 8px ${accentColor}, 0 0 14px ${accentColor}55`
                        : "none",
                    }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          padding: "12px 20px",
          color: "var(--v3-text2)",
          fontSize: 11,
          textAlign: "center",
          letterSpacing: 0.3,
          opacity: 0.6,
        }}
      >
        © {new Date().getFullYear()} Rajeev Dessai
      </div>
    </div>
  );
};

export default Sidebar;
