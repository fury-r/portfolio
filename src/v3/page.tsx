import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { useDataContext } from "../context/DataContext/useContext";
import { useV3ThemeContext } from "./context/ThemeContext/useContext";
import ProfileImage from "../assets/profile.jpg";
import { Routes as RoutePaths } from "./Routes/path";

// react-icons
import { FiUser, FiFileText, FiMail, FiSettings } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { BsGrid1X2Fill, BsTerminalFill } from "react-icons/bs";
import { MdWork, MdSchool } from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";
import { VscCode } from "react-icons/vsc";

// ─── Constants ───────────────────────────────────────────────────────────────

const COLOR_PRESETS = [
  { label: "Amber",  color: "#FF9500" },
  { label: "Red",    color: "#FF3B30" },
  { label: "Green",  color: "#34C759" },
  { label: "Purple", color: "#AF52DE" },
  { label: "Pink",   color: "#FF2D55" },
  { label: "Teal",   color: "#5AC8FA" },
  { label: "Gold",   color: "#FFD60A" },
  { label: "Coral",  color: "#FF6B6B" },
];

const FALLBACK = {
  name: "Rajeev Dessai",
  position: "Software Engineer",
  about:
    "Software Engineer with 3 years of experience in full-stack web development. Proven ability to work independently and as part of a team to deliver high-quality products on time. Eager to learn new technologies and take on new challenges.",
  email: "rajeev.dessai11@gmail.com",
  phone: "+91 9158987407",
  location: "Goa, India",
  github: "https://github.com/fury-r",
  linkedin: "https://www.linkedin.com/in/rajeev-dessai-1497741b0/",
  skills: [
    "React", "Redux", "NextJS", "HTML", "CSS", "styled-components",
    "Javascript", "Typescript", "Flutter", "React-Native", "Kotlin",
    "GraphQL", "Python", "Flask", "FastAPI", "Golang", "NodeJS", "RASA",
    "Laravel", "C++", "Java", "MySQL", "MongoDB", "MoralisDb",
    "Cloud Firestore", "PostgreSQL", "Docker", "scikit-learn", "TensorFlow",
    "Git", "Figma", "Firebase",
  ],
};

const TYPING_WORDS = ["Full-Stack Developer", "React Specialist", "Mobile Dev", "Problem Solver"];

// ─── Glass style helper ───────────────────────────────────────────────────────

const glass = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: "var(--v3-surface)",
  backdropFilter: "saturate(180%) blur(20px)",
  WebkitBackdropFilter: "saturate(180%) blur(20px)",
  border: "1px solid var(--v3-border)",
  ...extra,
});

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring", stiffness: 200, damping: 20 },
  }),
};

const pageVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, x: -24, transition: { duration: 0.25 } },
};

// ─── Animated Background ─────────────────────────────────────────────────────

const AnimatedBackground: React.FC<{ accent: string }> = ({ accent }) => {
  const blobStyle = (
    x: string, y: string, size: string, color: string, delay: number
  ): React.CSSProperties => ({
    position: "absolute",
    left: x,
    top: y,
    width: size,
    height: size,
    borderRadius: "50%",
    background: color,
    filter: "blur(80px)",
    opacity: 0.35,
    animation: `blobMove${delay} ${20 + delay * 4}s ease-in-out infinite alternate`,
    pointerEvents: "none",
  });

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", zIndex: 0 }}>
      <style>{`
        @keyframes blobMove0 { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(60px,40px) scale(1.1)} }
        @keyframes blobMove1 { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(-50px,60px) scale(0.9)} }
        @keyframes blobMove2 { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(40px,-50px) scale(1.05)} }
        .v3-grid-bg {
          position:absolute; inset:0;
          background-image: linear-gradient(var(--v3-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--v3-border) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity:0.4;
          pointer-events:none;
        }
      `}</style>
      <div style={blobStyle("5%", "10%", "500px", accent + "88", 0)} />
      <div style={blobStyle("60%", "5%", "400px", accent + "44", 1)} />
      <div style={blobStyle("30%", "55%", "450px", accent + "55", 2)} />
      <div className="v3-grid-bg" />
    </div>
  );
};

// ─── Color Picker ─────────────────────────────────────────────────────────────

const ColorPicker: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { accentColor, setAccentColor } = useV3ThemeContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        ...glass({ borderRadius: 16, padding: 16, minWidth: 220 }),
        position: "absolute",
        bottom: "calc(100% + 10px)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}
    >
      <p style={{ color: "var(--v3-text2)", fontSize: 11, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>
        Accent Color
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        {COLOR_PRESETS.map((p) => (
          <button
            key={p.color}
            title={p.label}
            onClick={() => setAccentColor(p.color)}
            style={{
              width: 28, height: 28, borderRadius: "50%",
              background: p.color, border: "none", cursor: "pointer",
              outline: accentColor === p.color ? `3px solid ${p.color}` : "none",
              outlineOffset: 2,
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <label style={{ color: "var(--v3-text2)", fontSize: 12 }}>Custom:</label>
        <input
          type="color"
          value={accentColor}
          onChange={(e) => setAccentColor(e.target.value)}
          style={{ width: 32, height: 32, borderRadius: 8, border: "none", cursor: "pointer", background: "none" }}
        />
      </div>
    </motion.div>
  );
};

// ─── Traffic Lights ───────────────────────────────────────────────────────────

const TrafficLights: React.FC = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    {[
      { color: "#FF5F57", label: "close" },
      { color: "#FEBC2E", label: "minimize" },
      { color: "#28C840", label: "maximize" },
    ].map((btn) => (
      <div
        key={btn.label}
        title={btn.label}
        style={{
          width: 12, height: 12, borderRadius: "50%",
          background: btn.color,
          boxShadow: `0 0 4px ${btn.color}66`,
          cursor: "default",
        }}
      />
    ))}
  </div>
);

// ─── Version Switcher ─────────────────────────────────────────────────────────

const VersionSwitcher: React.FC = () => {
  const versions: Array<"v1" | "v2" | "v3"> = ["v1", "v2", "v3"];
  return (
    <div style={{ display: "flex", gap: 4, background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: 3 }}>
      {versions.map((v) => (
        <button
          key={v}
          onClick={() => { if (v !== "v3") window.location.href = "/" + v; }}
          style={{
            padding: "2px 10px",
            borderRadius: 6,
            border: "none",
            fontSize: 12,
            fontWeight: 600,
            cursor: v === "v3" ? "default" : "pointer",
            background: v === "v3" ? "var(--v3-accent)" : "transparent",
            color: v === "v3" ? "#fff" : "var(--v3-text2)",
            transition: "all 0.15s",
          }}
        >
          {v}
        </button>
      ))}
    </div>
  );
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About",    path: RoutePaths.about.path,   icon: <FiUser size={16} /> },
  { label: "Résumé",   path: RoutePaths.resume.path,  icon: <FiFileText size={16} /> },
  { label: "Projects", path: RoutePaths.project.path, icon: <BsGrid1X2Fill size={14} /> },
  { label: "Contact",  path: RoutePaths.contact.path, icon: <FiMail size={16} /> },
];

const Sidebar: React.FC<{ basePath: string }> = ({ basePath }) => {
  const location = useLocation();
  const { accentColor } = useV3ThemeContext();
  const { profile, social } = useDataContext();

  const name = profile?.name || FALLBACK.name;
  const position = profile?.position || FALLBACK.position;

  const activePath = location.pathname.replace(basePath, "") || "/";

  const github = social?.find((s) => s.label?.toLowerCase().includes("github"))?.href || FALLBACK.github;
  const linkedin = social?.find((s) => s.label?.toLowerCase().includes("linkedin"))?.href || FALLBACK.linkedin;

  return (
    <div
      style={{
        width: 260,
        minWidth: 260,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...glass({ borderRight: "1px solid var(--v3-border)", borderRadius: 0 }),
        overflow: "hidden",
      }}
    >
      {/* Profile */}
      <div style={{ padding: "24px 20px 16px", textAlign: "center" }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{
            width: 80, height: 80, borderRadius: "50%",
            border: `3px solid ${accentColor}`,
            margin: "0 auto 12px",
            overflow: "hidden",
            boxShadow: `0 0 20px ${accentColor}44`,
          }}
        >
          <img src={ProfileImage} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ color: "var(--v3-text)", fontWeight: 700, fontSize: 18, margin: "0 0 6px" }}
        >
          {name}
        </motion.h2>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{
            background: `${accentColor}22`,
            color: accentColor,
            fontSize: 12, fontWeight: 600,
            padding: "3px 12px", borderRadius: 20,
            border: `1px solid ${accentColor}44`,
          }}
        >
          {position}
        </motion.span>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--v3-border)", margin: "0 16px 16px" }} />

      {/* Contact info */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { icon: <FaEnvelope size={12} />, text: FALLBACK.email },
          { icon: <FaPhone size={12} />, text: FALLBACK.phone },
          { icon: <FaMapMarkerAlt size={12} />, text: FALLBACK.location },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: accentColor, flexShrink: 0 }}>{item.icon}</span>
            <span style={{ color: "var(--v3-text2)", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* Social icons */}
      <div style={{ padding: "12px 20px", display: "flex", gap: 12 }}>
        {[
          { icon: <FaGithub size={18} />, href: github, label: "GitHub" },
          { icon: <FaLinkedin size={18} />, href: linkedin, label: "LinkedIn" },
          { icon: <FaInstagram size={18} />, href: "#", label: "Instagram" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            style={{
              color: "var(--v3-text2)", transition: "color 0.15s",
              display: "flex", alignItems: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--v3-text2)")}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--v3-border)", margin: "0 16px 12px" }} />

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "0 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activePath === item.path || (item.path !== "/" && activePath.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={`${basePath}${item.path}`}
              style={{ textDecoration: "none" }}
            >
              <motion.div
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", borderRadius: 10,
                  background: isActive ? `${accentColor}22` : "transparent",
                  color: isActive ? accentColor : "var(--v3-text2)",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                  border: isActive ? `1px solid ${accentColor}44` : "1px solid transparent",
                }}
              >
                {item.icon}
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    style={{
                      marginLeft: "auto", width: 6, height: 6,
                      borderRadius: "50%", background: accentColor,
                    }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "12px 20px", color: "var(--v3-text2)", fontSize: 11, textAlign: "center" }}>
        © 2024 Rajeev Dessai
      </div>
    </div>
  );
};

// ─── Desktop Title Bar ─────────────────────────────────────────────────────────

const TitleBar: React.FC = () => {
  const { mode, toggleMode, accentColor } = useV3ThemeContext();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div
      style={{
        height: 44,
        display: "flex", alignItems: "center",
        padding: "0 16px",
        borderBottom: "1px solid var(--v3-border)",
        gap: 12,
        flexShrink: 0,
        position: "relative",
      }}
    >
      <TrafficLights />
      <div style={{ flex: 1, textAlign: "center", color: "var(--v3-text2)", fontSize: 13, fontWeight: 500, pointerEvents: "none" }}>
        Rajeev Dessai — Portfolio
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <VersionSwitcher />
        <button
          onClick={toggleMode}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--v3-text2)", display: "flex", alignItems: "center", padding: 4 }}
          title={mode === "DARK" ? "Switch to Light" : "Switch to Dark"}
        >
          {mode === "DARK" ? <HiOutlineSun size={16} /> : <HiOutlineMoon size={16} />}
        </button>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowPicker((p) => !p)}
            style={{ background: "none", border: "none", cursor: "pointer", color: accentColor, display: "flex", alignItems: "center", padding: 4 }}
            title="Accent color"
          >
            <IoColorPaletteOutline size={16} />
          </button>
          <AnimatePresence>
            {showPicker && <ColorPicker onClose={() => setShowPicker(false)} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ─── Desktop Dock ─────────────────────────────────────────────────────────────

const Dock: React.FC<{ basePath: string }> = ({ basePath }) => {
  const location = useLocation();
  const { mode, toggleMode, accentColor } = useV3ThemeContext();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const activePath = location.pathname.replace(basePath, "") || "/";

  const dockItems = [
    ...NAV_ITEMS.map((n) => ({ ...n, isNav: true })),
  ];

  const getScale = (i: number) => {
    if (hoveredIdx === null) return 1;
    const dist = Math.abs(i - hoveredIdx);
    if (dist === 0) return 1.4;
    if (dist === 1) return 1.2;
    if (dist === 2) return 1.05;
    return 1;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 12px", flexShrink: 0 }}>
      <div style={{ position: "relative" }}>
        <div
          style={{
            ...glass({ borderRadius: 20, padding: "8px 16px" }),
            display: "flex", alignItems: "flex-end", gap: 8,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {dockItems.map((item, i) => {
            const isActive = activePath === item.path || (item.path !== "/" && activePath.startsWith(item.path));
            return (
              <Link key={item.path} to={`${basePath}${item.path}`} style={{ textDecoration: "none" }}>
                <motion.div
                  onHoverStart={() => setHoveredIdx(i)}
                  onHoverEnd={() => setHoveredIdx(null)}
                  animate={{ scale: getScale(i) }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                >
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: isActive ? `${accentColor}33` : "var(--v3-surface2)",
                      border: isActive ? `1px solid ${accentColor}66` : "1px solid var(--v3-border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: isActive ? accentColor : "var(--v3-text2)",
                      transition: "all 0.15s",
                    }}
                  >
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 10, color: isActive ? accentColor : "var(--v3-text2)", fontWeight: isActive ? 600 : 400 }}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: accentColor }} />
                  )}
                </motion.div>
              </Link>
            );
          })}

          {/* Separator */}
          <div style={{ width: 1, height: 36, background: "var(--v3-border)", alignSelf: "center" }} />

          {/* Dark/Light */}
          <motion.button
            onClick={toggleMode}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: 44, height: 44, borderRadius: 12,
              background: "var(--v3-surface2)",
              border: "1px solid var(--v3-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--v3-text2)", cursor: "pointer",
            }}
            title={mode === "DARK" ? "Light mode" : "Dark mode"}
          >
            {mode === "DARK" ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </motion.button>

          {/* Color picker */}
          <div style={{ position: "relative" }}>
            <motion.button
              onClick={() => setShowPicker((p) => !p)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 44, height: 44, borderRadius: 12,
                background: "var(--v3-surface2)",
                border: "1px solid var(--v3-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: accentColor, cursor: "pointer",
              }}
              title="Accent color"
            >
              <IoColorPaletteOutline size={18} />
            </motion.button>
            <AnimatePresence>
              {showPicker && <ColorPicker onClose={() => setShowPicker(false)} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Typing animation ─────────────────────────────────────────────────────────

const TypingText: React.FC = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { accentColor } = useV3ThemeContext();

  useEffect(() => {
    const word = TYPING_WORDS[wordIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length) {
      timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % TYPING_WORDS.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, wordIdx]);

  return (
    <span style={{ color: accentColor }}>
      {displayed}
      <span style={{ borderRight: `2px solid ${accentColor}`, marginLeft: 2, animation: "blink 0.8s step-end infinite" }}>
        <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
      </span>
    </span>
  );
};

// ─── About Section ────────────────────────────────────────────────────────────

const AboutSection: React.FC = () => {
  const { profile, services } = useDataContext();
  const { accentColor } = useV3ThemeContext();

  const about = profile?.about || FALLBACK.about;
  const name = profile?.name || FALLBACK.name;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ padding: "32px 32px 40px" }}
    >
      {/* Hero */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: 32 }}>
        <p style={{ color: "var(--v3-text2)", fontSize: 14, marginBottom: 8 }}>Hi there 👋, I'm</p>
        <h1 style={{ color: "var(--v3-text)", fontSize: 40, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.1 }}>
          {name}
        </h1>
        <h2 style={{ color: "var(--v3-text2)", fontSize: 22, fontWeight: 400, margin: "0 0 20px" }}>
          <TypingText />
        </h2>
        <p style={{ color: "var(--v3-text2)", fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
          {about}
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <a
            href={FALLBACK.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: accentColor, color: "#fff",
              padding: "10px 22px", borderRadius: 12,
              textDecoration: "none", fontWeight: 600, fontSize: 14,
              boxShadow: `0 4px 20px ${accentColor}66`,
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = `0 8px 30px ${accentColor}88`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 4px 20px ${accentColor}66`; }}
          >
            <FaGithub size={16} /> View GitHub
          </a>
          <a
            href={FALLBACK.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--v3-surface2)", color: "var(--v3-text)",
              padding: "10px 22px", borderRadius: 12,
              textDecoration: "none", fontWeight: 600, fontSize: 14,
              border: "1px solid var(--v3-border)",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaLinkedin size={16} /> LinkedIn
          </a>
        </div>
      </motion.div>

      {/* Services / What I Do */}
      {services && services.length > 0 && (
        <div>
          <motion.h3
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            style={{ color: "var(--v3-text)", fontSize: 22, fontWeight: 700, marginBottom: 20 }}
          >
            What I Do
          </motion.h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03, boxShadow: `0 8px 32px ${accentColor}33` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  ...glass({ borderRadius: 16, padding: 20 }),
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>
                  {service.icon ? (
                    <img src={service.icon} alt={service.title} style={{ width: 32, height: 32, objectFit: "contain" }} />
                  ) : (
                    <VscCode />
                  )}
                </div>
                <h4 style={{ color: "var(--v3-text)", fontWeight: 700, fontSize: 16, margin: "0 0 8px" }}>
                  {service.title}
                </h4>
                <p style={{ color: "var(--v3-text2)", fontSize: 13, margin: "0 0 12px", lineHeight: 1.6 }}>
                  {service.description}
                </p>
                {service.percentage > 0 && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ color: "var(--v3-text2)", fontSize: 11 }}>Proficiency</span>
                      <span style={{ color: accentColor, fontSize: 11, fontWeight: 600 }}>{service.percentage}%</span>
                    </div>
                    <div style={{ height: 4, background: "var(--v3-border)", borderRadius: 2 }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${service.percentage}%` }}
                        transition={{ delay: i * 0.08 + 0.5, duration: 0.8, ease: "easeOut" }}
                        style={{ height: "100%", background: accentColor, borderRadius: 2 }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Skills if no services */}
      {(!services || services.length === 0) && (
        <div>
          <motion.h3
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            style={{ color: "var(--v3-text)", fontSize: 22, fontWeight: 700, marginBottom: 20 }}
          >
            Skills
          </motion.h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {FALLBACK.skills.map((skill, i) => (
              <motion.span
                key={skill}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                style={{
                  padding: "6px 14px", borderRadius: 20,
                  background: `${accentColor}18`,
                  color: accentColor,
                  fontSize: 13, fontWeight: 500,
                  border: `1px solid ${accentColor}33`,
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ─── Resume Section ────────────────────────────────────────────────────────────

const ResumeSection: React.FC = () => {
  const { company, education, services, tech } = useDataContext();
  const { accentColor } = useV3ThemeContext();

  const TimelineEntry: React.FC<{
    title: string;
    subtitle: string;
    duration?: string;
    description?: string;
    subItems?: { subTitle: string; date: string }[];
    i: number;
  }> = ({ title, subtitle, duration, description, subItems, i }) => (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      style={{ display: "flex", gap: 16, marginBottom: 24 }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: accentColor, boxShadow: `0 0 10px ${accentColor}66`, flexShrink: 0, marginTop: 4 }} />
        <div style={{ width: 2, flex: 1, background: `${accentColor}33`, marginTop: 4 }} />
      </div>
      <motion.div
        whileHover={{ scale: 1.01, boxShadow: `0 8px 32px ${accentColor}22` }}
        style={{ ...glass({ borderRadius: 14, padding: 18 }), flex: 1 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
          <h4 style={{ color: "var(--v3-text)", fontWeight: 700, fontSize: 16, margin: 0 }}>{title}</h4>
          {duration && (
            <span style={{ color: accentColor, fontSize: 12, fontWeight: 600, background: `${accentColor}18`, padding: "2px 10px", borderRadius: 20 }}>
              {duration}
            </span>
          )}
        </div>
        <p style={{ color: accentColor, fontSize: 13, fontWeight: 500, margin: "0 0 8px" }}>{subtitle}</p>
        {description && (
          <p style={{ color: "var(--v3-text2)", fontSize: 13, lineHeight: 1.6, margin: "0 0 10px" }}>{description}</p>
        )}
        {subItems && subItems.map((sub, si) => (
          <div key={si} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: "1px solid var(--v3-border)" }}>
            <span style={{ color: "var(--v3-text2)", fontSize: 13 }}>{sub.subTitle}</span>
            <span style={{ color: "var(--v3-text2)", fontSize: 12 }}>{sub.date}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ padding: "32px 32px 40px" }}
    >
      {/* Experience */}
      <motion.h3
        custom={0} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color: "var(--v3-text)", fontSize: 22, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}
      >
        <MdWork color={accentColor} /> Work Experience
      </motion.h3>
      {company && company.length > 0 ? (
        company.map((c, i) => (
          <TimelineEntry
            key={i} i={i + 1}
            title={c.name} subtitle={c.title}
            duration={c.duration} description={c.description}
            subItems={c.subItems}
          />
        ))
      ) : (
        <p style={{ color: "var(--v3-text2)", fontSize: 14, marginBottom: 32 }}>No work experience data available.</p>
      )}

      {/* Education */}
      <motion.h3
        custom={0} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color: "var(--v3-text)", fontSize: 22, fontWeight: 700, margin: "32px 0 24px", display: "flex", alignItems: "center", gap: 10 }}
      >
        <MdSchool color={accentColor} /> Education
      </motion.h3>
      {education && education.length > 0 ? (
        education.map((e, i) => (
          <TimelineEntry
            key={i} i={i + 1}
            title={e.name} subtitle={e.title}
            duration={e.duration} description={e.description}
          />
        ))
      ) : (
        <p style={{ color: "var(--v3-text2)", fontSize: 14, marginBottom: 32 }}>No education data available.</p>
      )}

      {/* Skills */}
      {services && services.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <motion.h3
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            style={{ color: "var(--v3-text)", fontSize: 22, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}
          >
            <BsTerminalFill color={accentColor} /> Skills
          </motion.h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {services.map((s, i) => (
              <motion.div key={s.title} custom={i + 1} variants={fadeUp} initial="hidden" animate="visible">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "var(--v3-text)", fontSize: 14, fontWeight: 500 }}>{s.title}</span>
                  <span style={{ color: accentColor, fontSize: 13, fontWeight: 600 }}>{s.percentage}%</span>
                </div>
                <div style={{ height: 6, background: "var(--v3-border)", borderRadius: 3 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.percentage}%` }}
                    transition={{ delay: i * 0.07 + 0.3, duration: 0.9, ease: "easeOut" }}
                    style={{ height: "100%", background: `linear-gradient(90deg, ${accentColor}, ${accentColor}aa)`, borderRadius: 3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {tech && tech.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <motion.h3
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            style={{ color: "var(--v3-text)", fontSize: 22, fontWeight: 700, marginBottom: 20 }}
          >
            Tech Stack
          </motion.h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {tech.map((t, i) => (
              <motion.div
                key={t.title} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                whileHover={{ scale: 1.08 }}
                style={{
                  ...glass({ borderRadius: 12, padding: "10px 14px" }),
                  display: "flex", alignItems: "center", gap: 8,
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
                  <span style={{ color: "var(--v3-text2)", fontSize: 13 }}>{t.title}</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ─── Projects Section ──────────────────────────────────────────────────────────

const ProjectsSection: React.FC = () => {
  const { projects } = useDataContext();
  const { accentColor } = useV3ThemeContext();
  const [filter, setFilter] = useState<"All" | "Web" | "Mobile">("All");

  const filtered = useMemo(() => {
    if (!projects) return [];
    if (filter === "All") return projects;
    return projects.filter((p) => {
      const t = typeof p.type === "string" ? p.type : String(p.type);
      return t.toLowerCase() === filter.toLowerCase();
    });
  }, [projects, filter]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ padding: "32px 32px 40px" }}
    >
      <motion.h2
        custom={0} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color: "var(--v3-text)", fontSize: 28, fontWeight: 800, marginBottom: 8 }}
      >
        Projects
      </motion.h2>
      <motion.p
        custom={1} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color: "var(--v3-text2)", fontSize: 15, marginBottom: 24 }}
      >
        A selection of things I've built.
      </motion.p>

      {/* Filter tabs */}
      <motion.div
        custom={2} variants={fadeUp} initial="hidden" animate="visible"
        style={{ display: "flex", gap: 8, marginBottom: 28 }}
      >
        {(["All", "Web", "Mobile"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 20px", borderRadius: 20,
              background: filter === f ? accentColor : "var(--v3-surface2)",
              color: filter === f ? "#fff" : "var(--v3-text2)",
              fontWeight: filter === f ? 700 : 400, fontSize: 14,
              cursor: "pointer",
              border: filter === f ? `1px solid ${accentColor}` : "1px solid var(--v3-border)",
              transition: "all 0.2s",
            } as React.CSSProperties}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Project grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.03, boxShadow: `0 12px 40px ${accentColor}33` }}
              whileTap={{ scale: 0.97 }}
              style={{ ...glass({ borderRadius: 18 }), overflow: "hidden", cursor: "default" }}
            >
              {/* Image */}
              <div style={{ height: 160, overflow: "hidden", background: `${accentColor}11`, position: "relative" }}>
                {project.images && project.images.length > 0 ? (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: accentColor, opacity: 0.4 }}>
                    <BsGrid1X2Fill size={48} />
                  </div>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: 18 }}>
                <h4 style={{ color: "var(--v3-text)", fontWeight: 700, fontSize: 16, margin: "0 0 8px" }}>
                  {project.title}
                </h4>
                <p style={{ color: "var(--v3-text2)", fontSize: 13, lineHeight: 1.6, margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
                  {project.description}
                </p>

                {/* Tech badges */}
                {project.techStack && project.techStack.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                    {project.techStack.slice(0, 5).map((t) => (
                      <span
                        key={t.title}
                        style={{
                          padding: "3px 10px", borderRadius: 20, fontSize: 11,
                          background: `${accentColor}18`, color: accentColor,
                          border: `1px solid ${accentColor}33`, fontWeight: 500,
                        }}
                      >
                        {t.title}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span style={{ color: "var(--v3-text2)", fontSize: 11, padding: "3px 0" }}>
                        +{project.techStack.length - 5} more
                      </span>
                    )}
                  </div>
                )}

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: accentColor, color: "#fff",
                      padding: "7px 16px", borderRadius: 10,
                      textDecoration: "none", fontSize: 13, fontWeight: 600,
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <RiExternalLinkLine size={14} /> View
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ color: "var(--v3-text2)", textAlign: "center", padding: 40 }}
        >
          No projects found.
        </motion.p>
      )}
    </motion.div>
  );
};

// ─── Contact Section ───────────────────────────────────────────────────────────

const ContactSection: React.FC = () => {
  const { accentColor } = useV3ThemeContext();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 12,
    background: "var(--v3-surface2)", border: "1px solid var(--v3-border)",
    color: "var(--v3-text)", fontSize: 14, outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
    fontFamily: "inherit",
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ padding: "32px 32px 40px" }}
    >
      <motion.h2
        custom={0} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color: "var(--v3-text)", fontSize: 28, fontWeight: 800, marginBottom: 8 }}
      >
        Get in Touch
      </motion.h2>
      <motion.p
        custom={1} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color: "var(--v3-text2)", fontSize: 15, marginBottom: 32 }}
      >
        I'm always open to new opportunities and collaborations.
      </motion.p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
        {/* Contact info + map */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            {[
              { icon: <FaEnvelope />, label: "Email", value: FALLBACK.email, href: `mailto:${FALLBACK.email}` },
              { icon: <FaPhone />, label: "Phone", value: FALLBACK.phone, href: `tel:${FALLBACK.phone}` },
              { icon: <FaMapMarkerAlt />, label: "Location", value: FALLBACK.location, href: undefined },
              { icon: <FaGithub />, label: "GitHub", value: "fury-r", href: FALLBACK.github },
              { icon: <FaLinkedin />, label: "LinkedIn", value: "rajeev-dessai", href: FALLBACK.linkedin },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                custom={i + 3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                whileHover={{ x: 4 }}
                style={{ display: "flex", alignItems: "center", gap: 14 }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: `${accentColor}18`, color: accentColor,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, flexShrink: 0,
                  border: `1px solid ${accentColor}33`,
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ color: "var(--v3-text2)", fontSize: 11, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--v3-text)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ color: "var(--v3-text)", fontSize: 14, fontWeight: 500, margin: 0 }}>{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Google Maps */}
          <motion.div
            custom={8} variants={fadeUp} initial="hidden" animate="visible"
            style={{ borderRadius: 14, overflow: "hidden", border: "1px solid var(--v3-border)" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116953.44217685494!2d73.7364965!3d15.2993265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb36d98c0e82b%3A0x4a4f33d5bf1d4538!2sGoa%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
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

        {/* Contact Form */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ color: "var(--v3-text2)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = accentColor)}
                onBlur={(e) => (e.target.style.borderColor = "var(--v3-border)")}
              />
            </div>
            <div>
              <label style={{ color: "var(--v3-text2)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = accentColor)}
                onBlur={(e) => (e.target.style.borderColor = "var(--v3-border)")}
              />
            </div>
            <div>
              <label style={{ color: "var(--v3-text2)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>
                Message
              </label>
              <textarea
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                required
                rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.target.style.borderColor = accentColor)}
                onBlur={(e) => (e.target.style.borderColor = "var(--v3-border)")}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: accentColor, color: "#fff",
                padding: "13px 28px", borderRadius: 12, border: "none",
                fontWeight: 700, fontSize: 15, cursor: "pointer",
                boxShadow: `0 4px 20px ${accentColor}55`,
                transition: "box-shadow 0.2s",
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

// ─── Content Router ───────────────────────────────────────────────────────────

const ContentRouter: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={RoutePaths.about.path}   element={<AboutSection />} />
        <Route path={RoutePaths.resume.path}  element={<ResumeSection />} />
        <Route path={RoutePaths.project.path} element={<ProjectsSection />} />
        <Route path={RoutePaths.contact.path} element={<ContactSection />} />
        <Route path="*"                        element={<AboutSection />} />
      </Routes>
    </AnimatePresence>
  );
};

// ─── Desktop Window ────────────────────────────────────────────────────────────

const DesktopWindow: React.FC<{ basePath: string }> = ({ basePath }) => (
  <div
    style={{
      width: "93vw", height: "92vh",
      borderRadius: 18,
      ...glass(),
      boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--v3-border)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      position: "relative",
      zIndex: 1,
    }}
  >
    <TitleBar />
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      <Sidebar basePath={basePath} />
      <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
        <ContentRouter />
      </div>
    </div>
    <Dock basePath={basePath} />
  </div>
);

// ─── Mobile Tab Bar ───────────────────────────────────────────────────────────

const MobileTabBar: React.FC<{ basePath: string }> = ({ basePath }) => {
  const location = useLocation();
  const { accentColor, mode, toggleMode } = useV3ThemeContext();
  const [showPicker, setShowPicker] = useState(false);

  const activePath = location.pathname.replace(basePath, "") || "/";

  const tabs = [
    ...NAV_ITEMS,
    { label: "Theme", path: "__theme__", icon: <FiSettings size={16} /> },
  ];

  return (
    <div
      style={{
        ...glass({ borderTop: "1px solid var(--v3-border)", borderRadius: "16px 16px 0 0" }),
        display: "flex", justifyContent: "space-around",
        padding: "8px 0 calc(8px + env(safe-area-inset-bottom, 0px))",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {tabs.map((tab) => {
        if (tab.path === "__theme__") {
          return (
            <div key="theme" style={{ position: "relative" }}>
              <motion.button
                whileTap={{ scale: 0.85, y: -4 }}
                onClick={() => setShowPicker((p) => !p)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                  padding: "4px 12px",
                  color: showPicker ? accentColor : "var(--v3-text2)",
                }}
              >
                <IoColorPaletteOutline size={20} />
                <span style={{ fontSize: 10 }}>Theme</span>
              </motion.button>
              <AnimatePresence>
                {showPicker && (
                  <div style={{ position: "absolute", bottom: "calc(100% + 8px)", right: 0 }}>
                    <ColorPicker onClose={() => setShowPicker(false)} />
                    <motion.button
                      onClick={toggleMode}
                      style={{
                        ...glass({ borderRadius: 12, padding: "8px 16px" }),
                        display: "flex", alignItems: "center", gap: 8,
                        color: "var(--v3-text)", fontSize: 13, cursor: "pointer",
                        border: "none", width: "100%", marginTop: 8,
                      }}
                    >
                      {mode === "DARK" ? <HiOutlineSun /> : <HiOutlineMoon />}
                      {mode === "DARK" ? "Light Mode" : "Dark Mode"}
                    </motion.button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        const isActive = activePath === tab.path || (tab.path !== "/" && activePath.startsWith(tab.path));

        return (
          <Link key={tab.path} to={`${basePath}${tab.path}`} style={{ textDecoration: "none" }}>
            <motion.div
              whileTap={{ scale: 0.85, y: -4 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "4px 12px",
                color: isActive ? accentColor : "var(--v3-text2)",
              }}
            >
              {tab.icon}
              <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-tab-indicator"
                  style={{ width: 4, height: 4, borderRadius: "50%", background: accentColor }}
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

// ─── Mobile Status Bar ─────────────────────────────────────────────────────────

const MobileStatusBar: React.FC = () => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
  });

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`);
    }, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        height: 44, display: "flex", alignItems: "center",
        padding: "0 20px", justifyContent: "space-between",
        ...glass({ borderBottom: "1px solid var(--v3-border)", borderRadius: 0 }),
        flexShrink: 0,
      }}
    >
      <span style={{ color: "var(--v3-text)", fontWeight: 700, fontSize: 16 }}>{time}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--v3-text)" }}>
        {/* Signal bars */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" />
          <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.4" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M1.5 7C5.5 3 10 1 12 1s6.5 2 10.5 6" />
          <path d="M4.5 11C7 8.5 9.5 7.5 12 7.5s5 1 7.5 3.5" />
          <path d="M7.5 15c1.2-1.2 2.8-2 4.5-2s3.3.8 4.5 2" />
          <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        </svg>
        {/* Battery */}
        <svg width="22" height="12" viewBox="0 0 22 12" fill="currentColor">
          <rect x="0" y="1" width="19" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <rect x="19.5" y="3.5" width="2" height="5" rx="1" />
          <rect x="1.5" y="2.5" width="14" height="7" rx="1" opacity="0.9" />
        </svg>
      </div>
    </div>
  );
};

// ─── Mobile Profile Header ─────────────────────────────────────────────────────

const MobileProfileHeader: React.FC = () => {
  const { profile } = useDataContext();
  const { accentColor } = useV3ThemeContext();

  const name = profile?.name || FALLBACK.name;
  const position = profile?.position || FALLBACK.position;

  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 20px",
        ...glass({ borderBottom: "1px solid var(--v3-border)", borderRadius: 0 }),
        flexShrink: 0,
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: "50%", border: `2px solid ${accentColor}`, overflow: "hidden", flexShrink: 0 }}>
        <img src={ProfileImage} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div>
        <h1 style={{ color: "var(--v3-text)", fontWeight: 700, fontSize: 17, margin: 0 }}>{name}</h1>
        <span style={{ color: accentColor, fontSize: 12, fontWeight: 500 }}>{position}</span>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <VersionSwitcher />
      </div>
    </div>
  );
};

// ─── Mobile Layout ─────────────────────────────────────────────────────────────

const MobileLayout: React.FC<{ basePath: string }> = ({ basePath }) => (
  <div
    style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      background: "var(--v3-bg)",
      overflow: "hidden",
    }}
  >
    <MobileStatusBar />
    <MobileProfileHeader />
    <div style={{ flex: 1, overflow: "auto" }}>
      <ContentRouter />
    </div>
    <MobileTabBar basePath={basePath} />
  </div>
);

// ─── V3 Layout (entry point) ───────────────────────────────────────────────────

const V3Layout: React.FC = () => {
  const { accentColor } = useV3ThemeContext();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const basePath = "/v3";

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div
      style={{
        width: "100vw", height: "100vh",
        background: "var(--v3-bg)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <AnimatedBackground accent={accentColor} />
      {isMobile ? (
        <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
          <MobileLayout basePath={basePath} />
        </div>
      ) : (
        <DesktopWindow basePath={basePath} />
      )}
    </div>
  );
};

export default V3Layout;
