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
import { FiUser, FiFileText, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCamera } from "react-icons/fa";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { BsGrid1X2Fill } from "react-icons/bs";
import { MdWork, MdSchool } from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";
import { VscCode } from "react-icons/vsc";
import { CiMobile3, CiServer } from "react-icons/ci";
import { SiWebpack } from "react-icons/si";

// ─── Service icon map (matches data/service.ts icon strings) ────────────────
const SERVICE_ICON_MAP: Record<string, React.ReactNode> = {
  "mobile-app-dev": <CiMobile3 size={26} />,
  "webDev":         <SiWebpack size={24} />,
  "backend":        <CiServer size={26} />,
  "backendDev":     <CiServer size={26} />,
  "photography":    <FaCamera size={22} />,
};

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
};

const TYPING_WORDS = ["Full-Stack Developer", "React Specialist", "Mobile Dev", "Problem Solver"];

// ─── Glass style helper ───────────────────────────────────────────────────────

const glass = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: "var(--v3-surface)",
  backdropFilter: "saturate(180%) blur(28px)",
  WebkitBackdropFilter: "saturate(180%) blur(28px)",
  border: "1px solid var(--v3-border)",
  ...extra,
});

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, type: "spring", stiffness: 220, damping: 22 },
  }),
};

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

// ─── Animated Background ──────────────────────────────────────────────────────
// Uses position:absolute so it stays within the outer container (100vw × 100vh)
// and is painted on top of the base background colour.

const AnimatedBackground: React.FC<{ accent: string }> = ({ accent }) => {
  // Turn a 6-char hex into rgba with given opacity
  const hex2rgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };
  const c = accent.length === 7 ? accent : "#FF9500";

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
      <style>{`
        @keyframes v3blob0 {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(60px, 30px) scale(1.12); }
          100% { transform: translate(20px, -40px) scale(0.95); }
        }
        @keyframes v3blob1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(-70px, 50px) scale(0.88); }
          100% { transform: translate(30px, 20px) scale(1.08); }
        }
        @keyframes v3blob2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(50px, -60px) scale(1.1); }
          100% { transform: translate(-30px, 30px) scale(0.92); }
        }
        @media (prefers-reduced-motion: reduce) {
          .v3-blob { animation: none !important; }
        }
        .v3-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 44px 44px;
        }
      `}</style>

      {/* Blob 1 – large, top-left */}
      <div className="v3-blob" style={{
        position: "absolute", left: "2%", top: "5%",
        width: 620, height: 620, borderRadius: "50%",
        background: hex2rgba(c, 0.55),
        filter: "blur(100px)",
        animation: "v3blob0 22s ease-in-out infinite",
      }} />

      {/* Blob 2 – medium, top-right */}
      <div className="v3-blob" style={{
        position: "absolute", right: "5%", top: "0%",
        width: 440, height: 440, borderRadius: "50%",
        background: hex2rgba(c, 0.30),
        filter: "blur(90px)",
        animation: "v3blob1 28s ease-in-out infinite",
      }} />

      {/* Blob 3 – medium, bottom-centre */}
      <div className="v3-blob" style={{
        position: "absolute", left: "35%", bottom: "5%",
        width: 500, height: 500, borderRadius: "50%",
        background: hex2rgba(c, 0.38),
        filter: "blur(110px)",
        animation: "v3blob2 24s ease-in-out infinite",
      }} />

      {/* Dot-grid overlay */}
      <div className="v3-grid" />
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
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 10 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      style={{
        ...glass({ borderRadius: 18, padding: 18, minWidth: 230 }),
        position: "absolute",
        bottom: "calc(100% + 12px)",
        right: 0,
        zIndex: 300,
        boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      <p style={{ color: "var(--v3-text2)", fontSize: 10, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 600 }}>
        Accent Colour
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        {COLOR_PRESETS.map((p) => (
          <button
            key={p.color}
            title={p.label}
            onClick={() => setAccentColor(p.color)}
            style={{
              width: 30, height: 30, borderRadius: "50%",
              background: p.color, border: "none", cursor: "pointer",
              outline: accentColor === p.color ? `3px solid ${p.color}` : "none",
              outlineOffset: 3,
              transition: "transform 0.15s, box-shadow 0.15s",
              boxShadow: accentColor === p.color ? `0 0 12px ${p.color}88` : "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "var(--v3-surface2)", border: "1px solid var(--v3-border)" }}>
        <label style={{ color: "var(--v3-text2)", fontSize: 12 }}>Custom</label>
        <input
          type="color"
          value={accentColor}
          onChange={(e) => setAccentColor(e.target.value)}
          style={{ width: 36, height: 28, borderRadius: 8, border: "none", cursor: "pointer", background: "none", padding: 0 }}
        />
        <span style={{ color: "var(--v3-text2)", fontSize: 12, fontFamily: "monospace" }}>{accentColor}</span>
      </div>
    </motion.div>
  );
};

// ─── Traffic Lights ───────────────────────────────────────────────────────────

const TrafficLights: React.FC = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    {[
      { color: "#FF5F57", shadow: "#FF5F5755" },
      { color: "#FEBC2E", shadow: "#FEBC2E55" },
      { color: "#28C840", shadow: "#28C84055" },
    ].map((btn, i) => (
      <div
        key={i}
        style={{
          width: 13, height: 13, borderRadius: "50%",
          background: btn.color,
          boxShadow: `0 0 6px ${btn.shadow}, inset 0 1px 1px rgba(255,255,255,0.4)`,
          cursor: "default",
          transition: "transform 0.1s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.15)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      />
    ))}
  </div>
);

// ─── Version Switcher ─────────────────────────────────────────────────────────

const VersionSwitcher: React.FC = () => {
  const versions: Array<"v1" | "v2" | "v3"> = ["v1", "v2", "v3"];
  return (
    <div style={{
      display: "flex", gap: 2,
      background: "rgba(0,0,0,0.28)",
      borderRadius: 9, padding: 3,
      border: "1px solid rgba(255,255,255,0.07)",
    }}>
      {versions.map((v) => (
        <button
          key={v}
          onClick={() => { if (v !== "v3") window.location.href = "/" + v; }}
          style={{
            padding: "3px 11px",
            borderRadius: 6,
            border: "none",
            fontSize: 12,
            fontWeight: 600,
            cursor: v === "v3" ? "default" : "pointer",
            background: v === "v3" ? "var(--v3-accent)" : "transparent",
            color: v === "v3" ? "#fff" : "var(--v3-text2)",
            transition: "all 0.15s",
            letterSpacing: 0.3,
          }}
          onMouseEnter={(e) => { if (v !== "v3") e.currentTarget.style.color = "var(--v3-text)"; }}
          onMouseLeave={(e) => { if (v !== "v3") e.currentTarget.style.color = "var(--v3-text2)"; }}
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

  const name    = profile?.name     || FALLBACK.name;
  const position = profile?.position || FALLBACK.position;
  const activePath = location.pathname.replace(basePath, "") || "/";

  const github   = social?.find((s) => s.label?.toLowerCase().includes("github"))?.href   || FALLBACK.github;
  const linkedin = social?.find((s) => s.label?.toLowerCase().includes("linkedin"))?.href || FALLBACK.linkedin;

  return (
    <div style={{
      width: 260, minWidth: 260, height: "100%",
      display: "flex", flexDirection: "column",
      ...glass({
        borderRight: "1px solid var(--v3-border)",
        borderRadius: 0,
      }),
      overflow: "hidden",
    }}>
      {/* Profile */}
      <div style={{ padding: "28px 20px 18px", textAlign: "center" }}>
        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
          style={{
            width: 88, height: 88, borderRadius: "50%",
            border: `3px solid ${accentColor}`,
            margin: "0 auto 14px",
            overflow: "hidden",
            boxShadow: `0 0 0 6px ${accentColor}22, 0 8px 24px rgba(0,0,0,0.3)`,
          }}
        >
          <img src={ProfileImage} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ color: "var(--v3-text)", fontWeight: 700, fontSize: 17, margin: "0 0 8px", letterSpacing: -0.3 }}
        >
          {name}
        </motion.h2>
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.16 }}
          style={{
            background: `${accentColor}20`,
            color: accentColor,
            fontSize: 11, fontWeight: 700,
            padding: "4px 14px", borderRadius: 20,
            border: `1px solid ${accentColor}50`,
            letterSpacing: 0.4, textTransform: "uppercase",
          }}
        >
          {position}
        </motion.span>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--v3-border)", margin: "0 16px 16px" }} />

      {/* Contact info */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 11 }}>
        {[
          { icon: <FaEnvelope size={11} />, text: FALLBACK.email },
          { icon: <FaPhone    size={11} />, text: FALLBACK.phone },
          { icon: <FaMapMarkerAlt size={11} />, text: FALLBACK.location },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{
              color: accentColor, flexShrink: 0,
              width: 26, height: 26, borderRadius: 8,
              background: `${accentColor}18`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {item.icon}
            </span>
            <span style={{ color: "var(--v3-text2)", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* Social icons */}
      <div style={{ padding: "14px 20px", display: "flex", gap: 10 }}>
        {[
          { icon: <FaGithub   size={17} />, href: github,   label: "GitHub" },
          { icon: <FaLinkedin size={17} />, href: linkedin, label: "LinkedIn" },
          { icon: <FaInstagram size={17} />, href: "#",      label: "Instagram" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            style={{
              color: "var(--v3-text2)", transition: "color 0.15s, transform 0.15s",
              display: "flex", alignItems: "center",
              width: 34, height: 34, borderRadius: 10,
              background: "var(--v3-surface2)",
              border: "1px solid var(--v3-border)",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = accentColor;
              e.currentTarget.style.borderColor = accentColor + "55";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--v3-text2)";
              e.currentTarget.style.borderColor = "var(--v3-border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--v3-border)", margin: "0 16px 14px" }} />

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "0 10px", display: "flex", flexDirection: "column", gap: 3 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activePath === item.path || (item.path !== "/" && activePath.startsWith(item.path));
          return (
            <Link key={item.path} to={`${basePath}${item.path}`} style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", borderRadius: 11,
                  background: isActive ? `${accentColor}22` : "transparent",
                  color: isActive ? accentColor : "var(--v3-text2)",
                  fontWeight: isActive ? 700 : 400,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                  border: isActive ? `1px solid ${accentColor}44` : "1px solid transparent",
                  letterSpacing: 0.1,
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>{item.icon}</span>
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    style={{
                      marginLeft: "auto", width: 7, height: 7,
                      borderRadius: "50%", background: accentColor,
                      boxShadow: `0 0 8px ${accentColor}`,
                    }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "14px 20px", color: "var(--v3-text2)", fontSize: 11, textAlign: "center", letterSpacing: 0.3 }}>
        © {new Date().getFullYear()} Rajeev Dessai
      </div>
    </div>
  );
};

// ─── Desktop Title Bar ────────────────────────────────────────────────────────

const TitleBar: React.FC = () => {
  const { mode, toggleMode, accentColor } = useV3ThemeContext();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div style={{
      height: 46,
      display: "flex", alignItems: "center",
      padding: "0 16px",
      borderBottom: "1px solid var(--v3-border)",
      gap: 12, flexShrink: 0, position: "relative",
      background: "rgba(255,255,255,0.03)",
    }}>
      <TrafficLights />
      <div style={{
        flex: 1, textAlign: "center",
        color: "var(--v3-text2)", fontSize: 13, fontWeight: 500,
        pointerEvents: "none", letterSpacing: 0.2,
      }}>
        Rajeev Dessai — Portfolio
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <VersionSwitcher />
        <button
          onClick={toggleMode}
          style={{
            background: "var(--v3-surface2)", border: "1px solid var(--v3-border)",
            cursor: "pointer", color: "var(--v3-text2)",
            display: "flex", alignItems: "center",
            padding: 6, borderRadius: 8,
            transition: "all 0.15s",
          }}
          title={mode === "DARK" ? "Switch to Light" : "Switch to Dark"}
          onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--v3-text2)"; }}
        >
          {mode === "DARK" ? <HiOutlineSun size={15} /> : <HiOutlineMoon size={15} />}
        </button>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowPicker((p) => !p)}
            style={{
              background: "var(--v3-surface2)", border: "1px solid var(--v3-border)",
              cursor: "pointer", color: accentColor,
              display: "flex", alignItems: "center",
              padding: 6, borderRadius: 8,
              transition: "all 0.15s",
            }}
            title="Accent colour"
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 10px ${accentColor}55`; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
          >
            <IoColorPaletteOutline size={15} />
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

  const getScale = (i: number) => {
    if (hoveredIdx === null) return 1;
    const dist = Math.abs(i - hoveredIdx);
    if (dist === 0) return 1.45;
    if (dist === 1) return 1.22;
    if (dist === 2) return 1.07;
    return 1;
  };

  const iconBtn = (isActive: boolean) => ({
    width: 46, height: 46, borderRadius: 13,
    background: isActive ? `${accentColor}2e` : "rgba(255,255,255,0.07)",
    border: isActive ? `1.5px solid ${accentColor}66` : "1px solid rgba(255,255,255,0.10)",
    display: "flex" as const, alignItems: "center" as const, justifyContent: "center" as const,
    color: isActive ? accentColor : "var(--v3-text2)",
    transition: "all 0.15s",
    boxShadow: isActive ? `0 0 14px ${accentColor}33` : "none",
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 14px", flexShrink: 0 }}>
      <div style={{ position: "relative" }}>
        <div style={{
          backdropFilter: "saturate(180%) blur(30px)",
          WebkitBackdropFilter: "saturate(180%) blur(30px)",
          background: "rgba(30,30,38,0.75)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 22, padding: "10px 18px",
          display: "flex", alignItems: "flex-end", gap: 10,
          boxShadow: "0 8px 36px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.09)",
        }}>
          {NAV_ITEMS.map((item, i) => {
            const isActive = activePath === item.path || (item.path !== "/" && activePath.startsWith(item.path));
            return (
              <Link key={item.path} to={`${basePath}${item.path}`} style={{ textDecoration: "none" }}>
                <motion.div
                  onHoverStart={() => setHoveredIdx(i)}
                  onHoverEnd={() => setHoveredIdx(null)}
                  animate={{ scale: getScale(i) }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}
                >
                  <div style={iconBtn(isActive)}>{item.icon}</div>
                  <span style={{ fontSize: 10, color: isActive ? accentColor : "var(--v3-text2)", fontWeight: isActive ? 700 : 400 }}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: accentColor, boxShadow: `0 0 6px ${accentColor}` }} />
                  )}
                </motion.div>
              </Link>
            );
          })}

          {/* Separator */}
          <div style={{ width: 1, height: 38, background: "rgba(255,255,255,0.12)", alignSelf: "center", margin: "0 2px" }} />

          {/* Dark/Light */}
          <motion.button
            onClick={toggleMode}
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.88 }}
            style={{ ...iconBtn(false), cursor: "pointer", border: "1px solid rgba(255,255,255,0.10)" }}
            title={mode === "DARK" ? "Light mode" : "Dark mode"}
          >
            {mode === "DARK" ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </motion.button>

          {/* Color picker */}
          <div style={{ position: "relative" }}>
            <motion.button
              onClick={() => setShowPicker((p) => !p)}
              whileHover={{ scale: 1.18 }}
              whileTap={{ scale: 0.88 }}
              style={{
                ...iconBtn(false), cursor: "pointer",
                color: accentColor,
                border: showPicker ? `1.5px solid ${accentColor}66` : "1px solid rgba(255,255,255,0.10)",
                boxShadow: showPicker ? `0 0 14px ${accentColor}44` : "none",
              }}
              title="Accent colour"
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

// ─── Typing animation ──────────────────────────────────────────────────────────

const TypingText: React.FC = () => {
  const [wordIdx,   setWordIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);
  const { accentColor } = useV3ThemeContext();

  useEffect(() => {
    const word = TYPING_WORDS[wordIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length) {
      timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === word.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % TYPING_WORDS.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, wordIdx]);

  return (
    <span style={{ color: accentColor, fontWeight: 500 }}>
      {displayed}
      <style>{`@keyframes v3blink { 50% { opacity: 0 } }`}</style>
      <span style={{ borderRight: `2px solid ${accentColor}`, marginLeft: 2, animation: "v3blink 0.85s step-end infinite" }} />
    </span>
  );
};

// ─── Section: About ────────────────────────────────────────────────────────────

const AboutSection: React.FC = () => {
  const { profile, services } = useDataContext();
  const { accentColor } = useV3ThemeContext();

  const about = profile?.about || FALLBACK.about;
  const name  = profile?.name  || FALLBACK.name;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ padding: "36px 36px 48px" }}
    >
      {/* Hero */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: 38 }}>
        <p style={{ color: "var(--v3-text2)", fontSize: 14, marginBottom: 10, letterSpacing: 0.3 }}>
          Hi there 👋, I&apos;m
        </p>
        <h1 style={{ color: "var(--v3-text)", fontSize: 44, fontWeight: 800, margin: "0 0 10px", lineHeight: 1.08, letterSpacing: -1 }}>
          {name}
        </h1>
        <h2 style={{ color: "var(--v3-text2)", fontSize: 22, fontWeight: 400, margin: "0 0 22px", minHeight: 34 }}>
          <TypingText />
        </h2>
        <p style={{ color: "var(--v3-text2)", fontSize: 15, lineHeight: 1.75, maxWidth: 620, marginBottom: 26 }}>
          {about}
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a
            href={FALLBACK.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: accentColor, color: "#fff",
              padding: "11px 24px", borderRadius: 13,
              textDecoration: "none", fontWeight: 700, fontSize: 14,
              boxShadow: `0 4px 22px ${accentColor}55`,
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 32px ${accentColor}77`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 22px ${accentColor}55`; }}
          >
            <FaGithub size={15} /> View GitHub
          </a>
          <a
            href={FALLBACK.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--v3-surface2)", color: "var(--v3-text)",
              padding: "11px 24px", borderRadius: 13,
              textDecoration: "none", fontWeight: 600, fontSize: 14,
              border: "1px solid var(--v3-border)",
              transition: "transform 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = accentColor + "66"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--v3-border)"; }}
          >
            <FaLinkedin size={15} /> LinkedIn
          </a>
        </div>
      </motion.div>

      {/* Services / What I Do */}
      {services && services.length > 0 && (
        <div>
          <motion.h3
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            style={{ color: "var(--v3-text)", fontSize: 22, fontWeight: 700, marginBottom: 22, letterSpacing: -0.4 }}
          >
            What I Do
          </motion.h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 18 }}>
            {services.map((service, i) => {
              const ServiceIcon = SERVICE_ICON_MAP[service.icon ?? ""] ?? <VscCode size={24} />;
              return (
                <motion.div
                  key={service.title}
                  custom={i + 2}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    y: -4,
                    boxShadow: `0 12px 40px ${accentColor}30`,
                    borderColor: accentColor + "44",
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    ...glass({ borderRadius: 18, padding: 24 }),
                    cursor: "default",
                    transition: "border-color 0.2s",
                  }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: `${accentColor}18`,
                    color: accentColor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 16,
                    border: `1px solid ${accentColor}33`,
                  }}>
                    {ServiceIcon}
                  </div>
                  <h4 style={{ color: "var(--v3-text)", fontWeight: 700, fontSize: 15, margin: "0 0 8px", letterSpacing: -0.2 }}>
                    {service.title}
                  </h4>
                  <p style={{ color: "var(--v3-text2)", fontSize: 13, margin: "0 0 16px", lineHeight: 1.65 }}>
                    {service.description}
                  </p>
                  {service.percentage > 0 && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ color: "var(--v3-text2)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>Proficiency</span>
                        <span style={{ color: accentColor, fontSize: 12, fontWeight: 700 }}>{service.percentage}%</span>
                      </div>
                      <div style={{ height: 5, background: "var(--v3-border)", borderRadius: 3, overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${service.percentage}%` }}
                          transition={{ delay: i * 0.09 + 0.5, duration: 0.9, ease: "easeOut" }}
                          style={{ height: "100%", background: `linear-gradient(90deg, ${accentColor}, ${accentColor}bb)`, borderRadius: 3 }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
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
      style={{ display: "flex", gap: 18, marginBottom: 26 }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 14, height: 14, borderRadius: "50%",
          background: accentColor,
          boxShadow: `0 0 10px ${accentColor}88, 0 0 20px ${accentColor}44`,
          flexShrink: 0, marginTop: 4,
        }} />
        <div style={{ width: 2, flex: 1, background: `${accentColor}30`, marginTop: 6 }} />
      </div>
      <motion.div
        whileHover={{ y: -2, boxShadow: `0 10px 36px ${accentColor}20` }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ ...glass({ borderRadius: 16, padding: 20 }), flex: 1 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
          <h4 style={{ color: "var(--v3-text)", fontWeight: 700, fontSize: 16, margin: 0, letterSpacing: -0.3 }}>{title}</h4>
          {duration && (
            <span style={{
              color: accentColor, fontSize: 11, fontWeight: 700,
              background: `${accentColor}18`, padding: "3px 12px", borderRadius: 20,
              border: `1px solid ${accentColor}33`, letterSpacing: 0.3,
            }}>
              {duration}
            </span>
          )}
        </div>
        <p style={{ color: accentColor, fontSize: 13, fontWeight: 600, margin: "0 0 10px" }}>{subtitle}</p>
        {description && (
          <p style={{ color: "var(--v3-text2)", fontSize: 13, lineHeight: 1.7, margin: "0 0 10px" }}>{description}</p>
        )}
        {subItems && subItems.map((sub, si) => (
          <div key={si} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderTop: "1px solid var(--v3-border)" }}>
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
      style={{ padding: "36px 36px 48px" }}
    >
      {/* Experience */}
      <motion.h3
        custom={0} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color: "var(--v3-text)", fontSize: 22, fontWeight: 700, marginBottom: 26, display: "flex", alignItems: "center", gap: 10, letterSpacing: -0.4 }}
      >
        <span style={{ color: accentColor, display: "flex" }}><MdWork size={22} /></span> Work Experience
      </motion.h3>
      {company?.length > 0 ? (
        company.map((c, i) => (
          <TimelineEntry
            key={i} i={i + 1}
            title={c.name} subtitle={c.title}
            duration={c.duration} description={c.description}
            subItems={c.subItems}
          />
        ))
      ) : (
        <p style={{ color: "var(--v3-text2)", marginBottom: 32 }}>No work experience data.</p>
      )}

      {/* Education */}
      <motion.h3
        custom={0} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color: "var(--v3-text)", fontSize: 22, fontWeight: 700, margin: "32px 0 26px", display: "flex", alignItems: "center", gap: 10, letterSpacing: -0.4 }}
      >
        <span style={{ color: accentColor, display: "flex" }}><MdSchool size={22} /></span> Education
      </motion.h3>
      {education?.length > 0 ? (
        education.map((e, i) => (
          <TimelineEntry
            key={i} i={i + 1}
            title={e.name} subtitle={e.title}
            duration={e.duration} description={e.description}
          />
        ))
      ) : (
        <p style={{ color: "var(--v3-text2)", marginBottom: 32 }}>No education data.</p>
      )}

      {/* Skills */}
      {services?.length > 0 && (
        <div style={{ marginTop: 36 }}>
          <motion.h3
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            style={{ color: "var(--v3-text)", fontSize: 22, fontWeight: 700, marginBottom: 24, letterSpacing: -0.4 }}
          >
            Skills
          </motion.h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {services.map((s, i) => (
              <motion.div key={s.title} custom={i + 1} variants={fadeUp} initial="hidden" animate="visible">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span style={{ color: "var(--v3-text)", fontSize: 14, fontWeight: 500 }}>{s.title}</span>
                  <span style={{ color: accentColor, fontSize: 13, fontWeight: 700 }}>{s.percentage}%</span>
                </div>
                <div style={{ height: 6, background: "var(--v3-border)", borderRadius: 4, overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.percentage}%` }}
                    transition={{ delay: i * 0.07 + 0.3, duration: 0.9, ease: "easeOut" }}
                    style={{ height: "100%", background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)`, borderRadius: 4 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {tech?.length > 0 && (
        <div style={{ marginTop: 36 }}>
          <motion.h3
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            style={{ color: "var(--v3-text)", fontSize: 22, fontWeight: 700, marginBottom: 22, letterSpacing: -0.4 }}
          >
            Tech Stack
          </motion.h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {tech.map((t, i) => (
              <motion.div
                key={t.title} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                whileHover={{ scale: 1.08, y: -2 }}
                style={{
                  ...glass({ borderRadius: 12, padding: "9px 14px" }),
                  display: "flex", alignItems: "center", gap: 8,
                  cursor: "default",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = accentColor + "55";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--v3-border)";
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
                  <span style={{ color: "var(--v3-text)", fontSize: 13, fontWeight: 500 }}>{t.title}</span>
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
      style={{ padding: "36px 36px 48px" }}
    >
      <motion.h2
        custom={0} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color: "var(--v3-text)", fontSize: 30, fontWeight: 800, marginBottom: 8, letterSpacing: -0.8 }}
      >
        Projects
      </motion.h2>
      <motion.p
        custom={1} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color: "var(--v3-text2)", fontSize: 15, marginBottom: 26 }}
      >
        A selection of things I&apos;ve built.
      </motion.p>

      {/* Filter tabs */}
      <motion.div
        custom={2} variants={fadeUp} initial="hidden" animate="visible"
        style={{ display: "flex", gap: 8, marginBottom: 30 }}
      >
        {(["All", "Web", "Mobile"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 22px", borderRadius: 22,
              background: filter === f ? accentColor : "var(--v3-surface2)",
              color: filter === f ? "#fff" : "var(--v3-text2)",
              fontWeight: filter === f ? 700 : 500, fontSize: 13,
              cursor: "pointer",
              border: filter === f ? `1px solid ${accentColor}` : "1px solid var(--v3-border)",
              transition: "all 0.2s",
              boxShadow: filter === f ? `0 4px 16px ${accentColor}44` : "none",
            } as React.CSSProperties}
            onMouseEnter={(e) => { if (f !== filter) e.currentTarget.style.color = "var(--v3-text)"; }}
            onMouseLeave={(e) => { if (f !== filter) e.currentTarget.style.color = "var(--v3-text2)"; }}
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
              exit={{ opacity: 0, scale: 0.88 }}
              whileHover={{ y: -6, boxShadow: `0 18px 48px ${accentColor}30` }}
              whileTap={{ scale: 0.97 }}
              style={{ ...glass({ borderRadius: 18 }), overflow: "hidden", cursor: "default" }}
            >
              {/* Image */}
              <div style={{ height: 160, overflow: "hidden", background: `${accentColor}10`, position: "relative" }}>
                {project.images && project.images.length > 0 ? (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: accentColor, opacity: 0.35 }}>
                    <BsGrid1X2Fill size={52} />
                  </div>
                )}
                {/* Type badge */}
                <span style={{
                  position: "absolute", top: 10, right: 10,
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                  color: "#fff", fontSize: 10, fontWeight: 700,
                  padding: "3px 10px", borderRadius: 20, letterSpacing: 0.6,
                  textTransform: "uppercase",
                }}>
                  {typeof project.type === "string" ? project.type : "Project"}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: 20 }}>
                <h4 style={{ color: "var(--v3-text)", fontWeight: 700, fontSize: 15, margin: "0 0 8px", letterSpacing: -0.2 }}>
                  {project.title}
                </h4>
                <p style={{
                  color: "var(--v3-text2)", fontSize: 13, lineHeight: 1.65, margin: "0 0 14px",
                  display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                } as React.CSSProperties}>
                  {project.description}
                </p>

                {/* Tech badges */}
                {project.techStack?.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {project.techStack.slice(0, 5).map((t) => (
                      <span
                        key={t.title}
                        style={{
                          padding: "3px 10px", borderRadius: 20, fontSize: 11,
                          background: `${accentColor}18`, color: accentColor,
                          border: `1px solid ${accentColor}33`, fontWeight: 600,
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
                      padding: "8px 18px", borderRadius: 10,
                      textDecoration: "none", fontSize: 13, fontWeight: 700,
                      transition: "opacity 0.15s, transform 0.15s",
                      boxShadow: `0 4px 14px ${accentColor}44`,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <RiExternalLinkLine size={13} /> View
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: "var(--v3-text2)", textAlign: "center", padding: 48 }}
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

  const inputBase: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 12,
    background: "var(--v3-surface2)", border: "1px solid var(--v3-border)",
    color: "var(--v3-text)", fontSize: 14, outline: "none",
    boxSizing: "border-box", transition: "border-color 0.15s",
    fontFamily: "inherit",
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ padding: "36px 36px 48px" }}
    >
      <motion.h2
        custom={0} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color: "var(--v3-text)", fontSize: 30, fontWeight: 800, marginBottom: 8, letterSpacing: -0.8 }}
      >
        Get in Touch
      </motion.h2>
      <motion.p
        custom={1} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color: "var(--v3-text2)", fontSize: 15, marginBottom: 36 }}
      >
        I&apos;m always open to new opportunities and collaborations.
      </motion.p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 36 }}>
        {/* Contact info */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 26 }}>
            {[
              { icon: <FaEnvelope />, label: "Email",    value: FALLBACK.email,    href: `mailto:${FALLBACK.email}` },
              { icon: <FaPhone />,    label: "Phone",    value: FALLBACK.phone,    href: `tel:${FALLBACK.phone}` },
              { icon: <FaMapMarkerAlt />, label: "Location", value: FALLBACK.location, href: undefined },
              { icon: <FaGithub />,  label: "GitHub",   value: "fury-r",          href: FALLBACK.github },
              { icon: <FaLinkedin />, label: "LinkedIn", value: "rajeev-dessai", href: FALLBACK.linkedin },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                custom={i + 3} variants={fadeUp} initial="hidden" animate="visible"
                whileHover={{ x: 5 }}
                style={{ display: "flex", alignItems: "center", gap: 16 }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 13,
                  background: `${accentColor}18`, color: accentColor,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, flexShrink: 0,
                  border: `1px solid ${accentColor}33`,
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ color: "var(--v3-text2)", fontSize: 10, margin: "0 0 3px", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 600 }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--v3-text)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}
                       onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; }}
                       onMouseLeave={(e) => { e.currentTarget.style.color = "var(--v3-text)"; }}>
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ color: "var(--v3-text)", fontSize: 14, fontWeight: 600, margin: 0 }}>{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <motion.div
            custom={9} variants={fadeUp} initial="hidden" animate="visible"
            style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--v3-border)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
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

        {/* Contact Form */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { label: "Name",    key: "name",    type: "text",    placeholder: "Your name" },
              { label: "Email",   key: "email",   type: "email",   placeholder: "your@email.com" },
            ].map((field) => (
              <div key={field.key}>
                <label style={{ color: "var(--v3-text2)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 7 }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.key as "name" | "email"]}
                  onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                  required
                  style={inputBase}
                  onFocus={(e) => { e.target.style.borderColor = accentColor; e.target.style.boxShadow = `0 0 0 3px ${accentColor}22`; }}
                  onBlur={(e)  => { e.target.style.borderColor = "var(--v3-border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            ))}
            <div>
              <label style={{ color: "var(--v3-text2)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 7 }}>
                Message
              </label>
              <textarea
                placeholder="Tell me about your project or just say hi..."
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                required
                rows={5}
                style={{ ...inputBase, resize: "vertical" }}
                onFocus={(e) => { e.target.style.borderColor = accentColor; e.target.style.boxShadow = `0 0 0 3px ${accentColor}22`; }}
                onBlur={(e)  => { e.target.style.borderColor = "var(--v3-border)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: `0 8px 32px ${accentColor}66` }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: accentColor, color: "#fff",
                padding: "14px 28px", borderRadius: 13, border: "none",
                fontWeight: 700, fontSize: 15, cursor: "pointer",
                boxShadow: `0 4px 20px ${accentColor}44`,
                transition: "box-shadow 0.2s",
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

// ─── Content Router ────────────────────────────────────────────────────────────

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

const DesktopWindow: React.FC<{ basePath: string }> = ({ basePath }) => {
  const { accentColor } = useV3ThemeContext();
  return (
    <div
      style={{
        width: "93vw", height: "92vh",
        borderRadius: 20,
        background: "rgba(18,18,24,0.78)",
        backdropFilter: "saturate(200%) blur(36px)",
        WebkitBackdropFilter: "saturate(200%) blur(36px)",
        border: "1px solid rgba(255,255,255,0.13)",
        boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), 0 0 80px ${accentColor}15`,
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        position: "relative", zIndex: 1,
      }}
    >
      {/* Top glass sheen – mimics macOS liquid glass edge */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
        borderRadius: "20px 20px 0 0",
        pointerEvents: "none",
        zIndex: 10,
      }} />
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
};

// ─── Mobile Tab Bar ────────────────────────────────────────────────────────────

const MobileTabBar: React.FC<{ basePath: string }> = ({ basePath }) => {
  const location = useLocation();
  const { accentColor, mode, toggleMode } = useV3ThemeContext();
  const [showPicker, setShowPicker] = useState(false);

  const activePath = location.pathname.replace(basePath, "") || "/";

  return (
    <div style={{
      backdropFilter: "saturate(180%) blur(28px)",
      WebkitBackdropFilter: "saturate(180%) blur(28px)",
      background: "rgba(18,18,24,0.85)",
      borderTop: "1px solid rgba(255,255,255,0.10)",
      borderRadius: "18px 18px 0 0",
      display: "flex", justifyContent: "space-around",
      padding: `10px 0 calc(10px + env(safe-area-inset-bottom, 0px))`,
      flexShrink: 0,
      position: "relative",
      boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
    }}>
      {NAV_ITEMS.map((tab) => {
        const isActive = activePath === tab.path || (tab.path !== "/" && activePath.startsWith(tab.path));
        return (
          <Link key={tab.path} to={`${basePath}${tab.path}`} style={{ textDecoration: "none" }}>
            <motion.div
              whileTap={{ scale: 0.82, y: -5 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                padding: "4px 14px",
                color: isActive ? accentColor : "var(--v3-text2)",
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 11,
                background: isActive ? `${accentColor}22` : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}>
                {tab.icon}
              </div>
              <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400 }}>{tab.label}</span>
              {isActive && <div style={{ width: 4, height: 4, borderRadius: "50%", background: accentColor, boxShadow: `0 0 6px ${accentColor}` }} />}
            </motion.div>
          </Link>
        );
      })}

      {/* Theme toggle */}
      <div style={{ position: "relative" }}>
        <motion.div
          whileTap={{ scale: 0.82, y: -5 }}
          onClick={() => setShowPicker((p) => !p)}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            padding: "4px 14px", cursor: "pointer",
            color: showPicker ? accentColor : "var(--v3-text2)",
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 11,
            background: showPicker ? `${accentColor}22` : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <IoColorPaletteOutline size={18} />
          </div>
          <span style={{ fontSize: 10 }}>Theme</span>
        </motion.div>
        <AnimatePresence>
          {showPicker && (
            <div style={{ position: "absolute", bottom: "calc(100% + 8px)", right: 0 }}>
              <ColorPicker onClose={() => setShowPicker(false)} />
              <motion.button
                onClick={toggleMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  ...glass({ borderRadius: 12, padding: "8px 16px" }),
                  display: "flex", alignItems: "center", gap: 8,
                  color: "var(--v3-text)", fontSize: 13, cursor: "pointer",
                  border: "1px solid var(--v3-border)", width: "100%", marginTop: 8,
                }}
              >
                {mode === "DARK" ? <HiOutlineSun size={16} /> : <HiOutlineMoon size={16} />}
                {mode === "DARK" ? "Light Mode" : "Dark Mode"}
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Mobile Status Bar ─────────────────────────────────────────────────────────

const MobileStatusBar: React.FC = () => {
  const [time, setTime] = useState(() => {
    const n = new Date();
    return `${n.getHours()}:${String(n.getMinutes()).padStart(2, "0")}`;
  });

  useEffect(() => {
    const t = setInterval(() => {
      const n = new Date();
      setTime(`${n.getHours()}:${String(n.getMinutes()).padStart(2, "0")}`);
    }, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      height: 48, display: "flex", alignItems: "center",
      padding: "0 22px", justifyContent: "space-between",
      background: "rgba(18,18,24,0.9)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0,
    }}>
      <span style={{ color: "var(--v3-text)", fontWeight: 700, fontSize: 16, letterSpacing: -0.3 }}>{time}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--v3-text)" }}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" />
          <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.4" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M1.5 7C5.5 3 10 1 12 1s6.5 2 10.5 6" />
          <path d="M4.5 11C7 8.5 9.5 7.5 12 7.5s5 1 7.5 3.5" />
          <path d="M7.5 15c1.2-1.2 2.8-2 4.5-2s3.3.8 4.5 2" />
          <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        </svg>
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

  const name     = profile?.name     || FALLBACK.name;
  const position = profile?.position || FALLBACK.position;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "14px 20px",
      background: "rgba(18,18,24,0.75)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0,
    }}>
      <div style={{
        width: 50, height: 50, borderRadius: "50%",
        border: `2.5px solid ${accentColor}`, overflow: "hidden", flexShrink: 0,
        boxShadow: `0 0 0 4px ${accentColor}22`,
      }}>
        <img src={ProfileImage} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div>
        <h1 style={{ color: "var(--v3-text)", fontWeight: 700, fontSize: 17, margin: 0, letterSpacing: -0.3 }}>{name}</h1>
        <span style={{ color: accentColor, fontSize: 12, fontWeight: 600 }}>{position}</span>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <VersionSwitcher />
      </div>
    </div>
  );
};

// ─── Mobile Layout ─────────────────────────────────────────────────────────────

const MobileLayout: React.FC<{ basePath: string }> = ({ basePath }) => (
  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
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
    <div style={{
      width: "100vw", height: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      position: "relative",
      background: "var(--v3-bg)",
    }}>
      {/* Animated blobs sit on top of the solid bg via absolute positioning */}
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
