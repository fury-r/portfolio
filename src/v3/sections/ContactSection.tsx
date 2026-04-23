import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaGithub,
    FaLinkedin,
    FaPaperPlane,
} from "react-icons/fa";
import { useDataContext } from "../../context/DataContext/useContext";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { FALLBACK } from "../constants";
import { bentoFadeIn, glass, pageVariants, shimmerText } from "../utils";

// ── Floating label field ──────────────────────────────────────────────────────
const FloatField: React.FC<{
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    multiline?: boolean;
    rows?: number;
    required?: boolean;
    accent: string;
}> = ({ label, type = "text", value, onChange, multiline, rows = 4, required, accent }) => {
    const [focused, setFocused] = useState(false);
    const active = focused || value.length > 0;
    const fieldStyle: React.CSSProperties = {
        width: "100%",
        padding: active ? "22px 16px 8px" : "15px 16px",
        borderRadius: 13,
        background: "var(--v3-surface2)",
        border: `1.5px solid ${focused ? accent : "var(--v3-border)"}`,
        color: "var(--v3-text)",
        fontSize: 14,
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.15s, box-shadow 0.15s, padding 0.15s",
        fontFamily: "inherit",
        boxShadow: focused ? `0 0 0 3px ${accent}22` : "none",
        resize: multiline ? "vertical" : undefined,
    };

    return (
        <div style={{ position: "relative" }}>
            <motion.label
                animate={{
                    top: active ? 7 : "50%",
                    y: active ? 0 : (multiline ? -60 : -7),
                    scale: active ? 0.75 : 1,
                    color: focused ? accent : "var(--v3-text2)",
                }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "absolute",
                    left: 16,
                    transformOrigin: "left top",
                    fontSize: 14,
                    fontWeight: focused ? 600 : 400,
                    pointerEvents: "none",
                    zIndex: 1,
                    letterSpacing: active ? 0.2 : 0,
                    top: multiline ? 16 : undefined,
                }}
            >
                {label}
            </motion.label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required={required}
                    rows={rows}
                    placeholder=""
                    style={{ ...fieldStyle, paddingTop: 28 }}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required={required}
                    placeholder=""
                    style={fieldStyle}
                />
            )}
        </div>
    );
};

// ── Contact info row ──────────────────────────────────────────────────────────
const ContactRow: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
    accent: string;
    glassMode: boolean;
    i: number;
}> = ({ icon, label, value, href, accent, glassMode, i }) => (
    <motion.div
        custom={i}
        variants={bentoFadeIn}
        initial="hidden"
        animate="visible"
        whileHover={{ x: 4 }}
        style={{ display: "flex", alignItems: "center", gap: 14 }}
    >
        <div
            style={{
                width: 42,
                height: 42,
                borderRadius: 13,
                background: accent + "18",
                color: accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                flexShrink: 0,
                border: `1px solid ${accent}33`,
                boxShadow: glassMode ? `0 0 14px ${accent}22` : "none",
            }}
        >
            {icon}
        </div>
        <div>
            <p
                style={{
                    color: "var(--v3-text2)",
                    fontSize: 10,
                    margin: "0 0 2px",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    fontWeight: 600,
                }}
            >
                {label}
            </p>
            {href ? (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: "var(--v3-text)",
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--v3-text)")}
                >
                    {value}
                </a>
            ) : (
                <p style={{ color: "var(--v3-text)", fontSize: 13, fontWeight: 600, margin: 0 }}>
                    {value}
                </p>
            )}
        </div>
    </motion.div>
);

// ─── Contact Section ──────────────────────────────────────────────────────────
const ContactSection: React.FC = () => {
    const { profile, social } = useDataContext();
    const { accentColor, glassMode } = useV3ThemeContext();
    const email = profile?.email || FALLBACK.email;
    const phone = profile?.phone || FALLBACK.phone;
    const location = profile?.location || FALLBACK.location;
    const github =
        social?.find((s) => s.label?.toLowerCase().includes("github"))?.href || FALLBACK.github;
    const linkedin =
        social?.find((s) => s.label?.toLowerCase().includes("linkedin"))?.href || FALLBACK.linkedin;

    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setTimeout(() => setSent(false), 3500);
            setFormData({ name: "", email: "", message: "" });
        }, 800);
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ padding: "clamp(20px, 4vw, 32px) clamp(16px, 4vw, 32px) 48px" }}
        >
            {/* Header */}
            <motion.div custom={0} variants={bentoFadeIn} initial="hidden" animate="visible" style={{ marginBottom: 32 }}>
                <h2
                    style={{
                        fontSize: 30,
                        fontWeight: 800,
                        marginBottom: 6,
                        letterSpacing: -0.8,
                        ...shimmerText(accentColor, glassMode),
                    }}
                >
                    Get in Touch
                </h2>
                <p style={{ color: "var(--v3-text2)", fontSize: 14, margin: 0 }}>
                    I&apos;m always open to new opportunities and collaborations.
                </p>
            </motion.div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 28,
                }}
            >
                {/* Left — contact info */}
                <motion.div
                    custom={1}
                    variants={bentoFadeIn}
                    initial="hidden"
                    animate="visible"
                    style={{ display: "flex", flexDirection: "column", gap: 18 }}
                >
                    {/* Contact rows */}
                    <ContactRow icon={<FaEnvelope />} label="Email" value={email} href={"mailto:" + email} accent={accentColor} glassMode={glassMode} i={2} />
                    <ContactRow icon={<FaPhone />} label="Phone" value={phone} href={"tel:" + phone} accent={accentColor} glassMode={glassMode} i={3} />
                    <ContactRow icon={<FaMapMarkerAlt />} label="Location" value={location} accent={accentColor} glassMode={glassMode} i={4} />
                    <ContactRow icon={<FaGithub />} label="GitHub" value="fury-r" href={github} accent={accentColor} glassMode={glassMode} i={5} />
                    <ContactRow icon={<FaLinkedin />} label="LinkedIn" value="rajeev-dessai" href={linkedin} accent={accentColor} glassMode={glassMode} i={6} />

                    {/* Map card */}
                    <motion.div
                        custom={7}
                        variants={bentoFadeIn}
                        initial="hidden"
                        animate="visible"
                        style={{
                            ...glass({ borderRadius: 16, overflow: "hidden" }),
                            boxShadow: glassMode ? "0 8px 32px rgba(0,0,0,0.25)" : "0 4px 16px rgba(0,0,0,0.12)",
                            marginTop: 4,
                        }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116953.44217685494!2d73.7364965!3d15.2993265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb36d98c0e82b%3A0x4a4f33d5bf1d4538!2sGoa%2C%20India!5e0!3m2!1sen!2sus!5m2!1sen!2sus"
                            width="100%"
                            height="180"
                            style={{ border: 0, display: "block", filter: "saturate(0.8) contrast(0.9)" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Location map"
                        />
                    </motion.div>
                </motion.div>

                {/* Right — form */}
                <motion.div custom={2} variants={bentoFadeIn} initial="hidden" animate="visible">
                    <form
                        onSubmit={handleSubmit}
                        style={{ display: "flex", flexDirection: "column", gap: 16 }}
                    >
                        <FloatField
                            label="Your Name"
                            value={formData.name}
                            onChange={(v) => setFormData((p) => ({ ...p, name: v }))}
                            required
                            accent={accentColor}
                        />
                        <FloatField
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={(v) => setFormData((p) => ({ ...p, email: v }))}
                            required
                            accent={accentColor}
                        />
                        <FloatField
                            label="Message"
                            value={formData.message}
                            onChange={(v) => setFormData((p) => ({ ...p, message: v }))}
                            multiline
                            rows={5}
                            required
                            accent={accentColor}
                        />

                        {/* Send button with states */}
                        <motion.button
                            type="submit"
                            disabled={sending || sent}
                            whileHover={!sending && !sent ? { scale: 1.02, boxShadow: `0 8px 32px ${accentColor}66` } : {}}
                            whileTap={!sending && !sent ? { scale: 0.96 } : {}}
                            style={{
                                background: sent
                                    ? "rgba(34,197,94,0.85)"
                                    : accentColor,
                                color: "#fff",
                                padding: "14px 28px",
                                borderRadius: 13,
                                border: "none",
                                fontWeight: 700,
                                fontSize: 15,
                                cursor: sending || sent ? "default" : "pointer",
                                boxShadow: sent
                                    ? "0 4px 24px rgba(34,197,94,0.45)"
                                    : glassMode
                                      ? `0 4px 24px ${accentColor}55`
                                      : `0 4px 18px ${accentColor}44`,
                                letterSpacing: 0.2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 10,
                                transition: "background 0.25s, box-shadow 0.25s",
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {sent ? (
                                    <motion.span
                                        key="sent"
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        ✓ Message Sent!
                                    </motion.span>
                                ) : sending ? (
                                    <motion.span
                                        key="sending"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        Sending…
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="idle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                                    >
                                        <FaPaperPlane size={14} /> Send Message
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ContactSection;