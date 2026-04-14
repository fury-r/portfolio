import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { useDataContext } from "../../context/DataContext/useContext";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { FALLBACK } from "../constants";
import { fadeUp, pageVariants } from "../utils";

const ContactSection: React.FC = () => {
  const { profile, social } = useDataContext();
  const { accentColor, glassMode } = useV3ThemeContext();
  const email = profile?.email || FALLBACK.email;
  const phone = profile?.phone || FALLBACK.phone;
  const location = profile?.location || FALLBACK.location;
  const github =
    social?.find((s) => s.label?.toLowerCase().includes("github"))?.href ||
    FALLBACK.github;
  const linkedin =
    social?.find((s) => s.label?.toLowerCase().includes("linkedin"))?.href ||
    FALLBACK.linkedin;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };
  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    background: "var(--v3-surface2)",
    border: "1px solid var(--v3-border)",
    color: "var(--v3-text)",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "inherit",
  };
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
      style={{ padding: "clamp(20px, 4vw, 36px) clamp(16px, 4vw, 36px) 48px" }}
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
        Get in Touch
      </motion.h2>
      <motion.p
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{ color: "var(--v3-text2)", fontSize: 15, marginBottom: 36 }}
      >
        I&apos;m always open to new opportunities and collaborations.
      </motion.p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 36,
        }}
      >
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginBottom: 26,
            }}
          >
            {[
              {
                icon: <FaEnvelope />,
                label: "Email",
                value: email,
                href: "mailto:" + email,
              },
              {
                icon: <FaPhone />,
                label: "Phone",
                value: phone,
                href: "tel:" + phone,
              },
              {
                icon: <FaMapMarkerAlt />,
                label: "Location",
                value: location,
                href: undefined,
              },
              {
                icon: <FaGithub />,
                label: "GitHub",
                value: "fury-r",
                href: github,
              },
              {
                icon: <FaLinkedin />,
                label: "LinkedIn",
                value: "rajeev-dessai",
                href: linkedin,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                custom={i + 3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                whileHover={{ x: 5 }}
                style={{ display: "flex", alignItems: "center", gap: 16 }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 13,
                    background: accentColor + "18",
                    color: accentColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                    border: "1px solid " + accentColor + "33",
                    boxShadow: glassMode
                      ? "0 0 14px " + accentColor + "22"
                      : "none",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    style={{
                      color: "var(--v3-text2)",
                      fontSize: 10,
                      margin: "0 0 3px",
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--v3-text)",
                        fontSize: 14,
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = accentColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--v3-text)";
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      style={{
                        color: "var(--v3-text)",
                        fontSize: 14,
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            custom={9}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid var(--v3-border)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116953.44217685494!2d73.7364965!3d15.2993265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb36d98c0e82b%3A0x4a4f33d5bf1d4538!2sGoa%2C%20India!5e0!3m2!1sen!2sus!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location map"
            />
          </motion.div>
        </motion.div>
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            {[
              { label: "Name", key: "name", type: "text", ph: "Your name" },
              {
                label: "Email",
                key: "email",
                type: "email",
                ph: "your@email.com",
              },
            ].map((field) => (
              <div key={field.key}>
                <label
                  style={{
                    color: "var(--v3-text2)",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    display: "block",
                    marginBottom: 7,
                  }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.ph}
                  value={formData[field.key as "name" | "email"]}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, [field.key]: e.target.value }))
                  }
                  required
                  style={inputBase}
                  onFocus={(e) => {
                    e.target.style.borderColor = accentColor;
                    e.target.style.boxShadow =
                      "0 0 0 3px " + accentColor + "22";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--v3-border)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            ))}
            <div>
              <label
                style={{
                  color: "var(--v3-text2)",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  display: "block",
                  marginBottom: 7,
                }}
              >
                Message
              </label>
              <textarea
                placeholder="Tell me about your project or just say hi..."
                value={formData.message}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, message: e.target.value }))
                }
                required
                rows={5}
                style={{ ...inputBase, resize: "vertical" }}
                onFocus={(e) => {
                  e.target.style.borderColor = accentColor;
                  e.target.style.boxShadow = "0 0 0 3px " + accentColor + "22";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--v3-border)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 32px " + accentColor + "66",
              }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: accentColor,
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 13,
                border: "none",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                boxShadow: glassMode
                  ? "0 4px 24px " + accentColor + "55"
                  : "0 4px 18px " + accentColor + "44",
                letterSpacing: 0.2,
              }}
            >
              {sent ? "✓ Message Sent!" : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactSection;
