import React from "react";
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

interface SidebarProps {
  basePath: string;
}

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
      {/* Profile */}
      <div style={{ padding: "28px 20px 18px", textAlign: "center" }}>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            border: "3px solid " + accentColor,
            margin: "0 auto 14px",
            overflow: "hidden",
            boxShadow:
              "0 0 0 6px " + accentColor + "22, 0 10px 32px rgba(0,0,0,0.4)",
            animation: glassMode ? "v3float 6s ease-in-out infinite" : "none",
          }}
        >
          <img
            src={avatarSrc}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          style={{
            fontWeight: 700,
            fontSize: 17,
            margin: "0 0 8px",
            letterSpacing: -0.3,
            ...(glassMode
              ? {
                  background:
                    "linear-gradient(135deg, var(--v3-text) 20%, " +
                    accentColor +
                    " 60%, var(--v3-text) 80%)",
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
          transition={{ delay: 0.18 }}
          style={{
            background: accentColor + "20",
            color: accentColor,
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 14px",
            borderRadius: 20,
            border: "1px solid " + accentColor + "50",
            letterSpacing: 0.4,
            textTransform: "uppercase",
          }}
        >
          {position}
        </motion.span>
      </div>
      <div
        style={{
          height: 1,
          background: "var(--v3-border)",
          margin: "0 16px 16px",
        }}
      />
      {/* Contact */}
      <div
        style={{
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: 11,
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
                fontSize: 12,
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
      {/* Social */}
      <div style={{ padding: "14px 20px", display: "flex", gap: 10 }}>
        {socialLinks.map((s) => {
          const lbl = s.label?.toLowerCase() || "";
          const icon = lbl.includes("github") ? (
            <FaGithub size={17} />
          ) : lbl.includes("linkedin") ? (
            <FaLinkedin size={17} />
          ) : (
            <FaInstagram size={17} />
          );
          return (
            <motion.a
              key={s.label}
              href={s.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
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
                transition: "color 0.15s, border-color 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = accentColor;
                e.currentTarget.style.borderColor = accentColor + "55";
                e.currentTarget.style.boxShadow =
                  "0 0 12px " + accentColor + "44";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--v3-text2)";
                e.currentTarget.style.borderColor = "var(--v3-border)";
                e.currentTarget.style.boxShadow = "none";
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
          margin: "0 16px 14px",
        }}
      />
      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "0 10px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
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
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
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
                      animation: glassMode
                        ? "v3glow 2s ease-in-out infinite"
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
          padding: "14px 20px",
          color: "var(--v3-text2)",
          fontSize: 11,
          textAlign: "center",
          letterSpacing: 0.3,
        }}
      >
        © {new Date().getFullYear()} Rajeev Dessai
      </div>
    </div>
  );
};

export default Sidebar;
