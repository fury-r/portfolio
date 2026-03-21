import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { useDataContext } from "../context/DataContext/useContext";
import { useV3ThemeContext } from "./context/ThemeContext/useContext";
import ProfileImage from "../assets/profile.jpg";
import { Routes as RoutePaths } from "./Routes/path";

import { FiUser, FiFileText, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCamera } from "react-icons/fa";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { BsGrid1X2Fill, BsDropletHalf, BsDroplet } from "react-icons/bs";
import { MdWork, MdSchool } from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";
import { VscCode } from "react-icons/vsc";
import { CiMobile3, CiServer } from "react-icons/ci";
import { SiWebpack } from "react-icons/si";

const SERVICE_ICON_MAP: Record<string, React.ReactNode> = {
  "mobile-app-dev": <CiMobile3 size={26} />,
  "webDev":         <SiWebpack size={24} />,
  "backend":        <CiServer size={26} />,
  "backendDev":     <CiServer size={26} />,
  "photography":    <FaCamera size={22} />,
};

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
  name:     "Rajeev Dessai",
  position: "Software Engineer",
  about:    "Software Engineer with 3 years of experience in full-stack web development. Proven ability to work independently and as part of a team to deliver high-quality products on time. Eager to learn new technologies and take on new challenges.",
  email:    "rajeev.dessai11@gmail.com",
  phone:    "+91 9158987407",
  location: "Goa, India",
  github:   "https://github.com/fury-r",
  linkedin: "https://www.linkedin.com/in/rajeev-dessai-1497741b0/",
};

const TYPING_WORDS = ["Full-Stack Developer", "React Specialist", "Mobile Dev", "Problem Solver"];

const PARTICLES = [
  { id:0,  x:8,  y:12, s:3, dur:14, del:0,  anim:"v3pa" },
  { id:1,  x:22, y:38, s:2, dur:18, del:2,  anim:"v3pb" },
  { id:2,  x:45, y:8,  s:4, dur:12, del:1,  anim:"v3pc" },
  { id:3,  x:68, y:25, s:2, dur:20, del:4,  anim:"v3pd" },
  { id:4,  x:82, y:55, s:3, dur:16, del:3,  anim:"v3pa" },
  { id:5,  x:15, y:72, s:2, dur:22, del:5,  anim:"v3pb" },
  { id:6,  x:55, y:88, s:4, dur:15, del:2,  anim:"v3pc" },
  { id:7,  x:90, y:10, s:2, dur:13, del:6,  anim:"v3pd" },
  { id:8,  x:33, y:60, s:3, dur:19, del:1,  anim:"v3pa" },
  { id:9,  x:72, y:78, s:2, dur:17, del:3,  anim:"v3pb" },
  { id:10, x:5,  y:48, s:3, dur:21, del:7,  anim:"v3pc" },
  { id:11, x:48, y:32, s:2, dur:14, del:4,  anim:"v3pd" },
  { id:12, x:78, y:42, s:3, dur:16, del:2,  anim:"v3pa" },
  { id:13, x:25, y:90, s:2, dur:23, del:5,  anim:"v3pb" },
  { id:14, x:60, y:65, s:3, dur:18, del:0,  anim:"v3pc" },
  { id:15, x:92, y:33, s:2, dur:15, del:8,  anim:"v3pd" },
  { id:16, x:38, y:18, s:3, dur:20, del:3,  anim:"v3pa" },
  { id:17, x:12, y:58, s:2, dur:13, del:6,  anim:"v3pb" },
  { id:18, x:58, y:48, s:3, dur:17, del:1,  anim:"v3pc" },
  { id:19, x:85, y:85, s:2, dur:24, del:4,  anim:"v3pd" },
];


const glass = (extra?: React.CSSProperties): React.CSSProperties => ({
  background:           "var(--v3-surface)",
  backdropFilter:       "saturate(200%) blur(var(--v3-blur-amt, 28px))",
  WebkitBackdropFilter: "saturate(200%) blur(var(--v3-blur-amt, 28px))",
  border:               "1px solid var(--v3-border)",
  ...extra,
});

const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: i * 0.07, type: "spring", stiffness: 200, damping: 20 },
  }),
};

const pageVariants = {
  initial: { opacity: 0, scale: 0.97, y: 16, filter: "blur(6px)" },
  animate: { opacity: 1, scale: 1,    y: 0,  filter: "blur(0px)",
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, scale: 0.97, y: -16, filter: "blur(6px)",
    transition: { duration: 0.22 } },
};

const useTilt = (maxDeg = 6) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200],  [ maxDeg, -maxDeg]);
  const rotateY = useTransform(mouseX, [-300, 300],  [-maxDeg,  maxDeg]);
  const sx = useSpring(rotateX, { stiffness: 120, damping: 26 });
  const sy = useSpring(rotateY, { stiffness: 120, damping: 26 });
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left - r.width  / 2);
    mouseY.set(e.clientY - r.top  - r.height / 2);
  }, [mouseX, mouseY]);
  const onLeave = useCallback(() => { mouseX.set(0); mouseY.set(0); }, [mouseX, mouseY]);
  return { rotateX: sx, rotateY: sy, onMove, onLeave };
};


// ─── CSS keyframes injected once into <head> ────────────────────────────────
const V3_CSS = [
  "@keyframes v3blob0{0%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,-40px) scale(1.14)}66%{transform:translate(-30px,50px) scale(0.92)}100%{transform:translate(0,0) scale(1)}}",
  "@keyframes v3blob1{0%{transform:translate(0,0) scale(1)}40%{transform:translate(-80px,60px) scale(0.86)}80%{transform:translate(40px,-30px) scale(1.10)}100%{transform:translate(0,0) scale(1)}}",
  "@keyframes v3blob2{0%{transform:translate(0,0) scale(1)}50%{transform:translate(55px,-70px) scale(1.12)}100%{transform:translate(0,0) scale(1)}}",
  "@keyframes v3blob3{0%{transform:translate(0,0) scale(1)}45%{transform:translate(-60px,40px) scale(1.08)}100%{transform:translate(0,0) scale(1)}}",
  "@keyframes v3pa{0%,100%{transform:translate(0,0) scale(1);opacity:.35}50%{transform:translate(22px,-32px) scale(1.3);opacity:.65}}",
  "@keyframes v3pb{0%,100%{transform:translate(0,0) scale(1);opacity:.25}50%{transform:translate(-28px,20px) scale(0.7);opacity:.50}}",
  "@keyframes v3pc{0%,100%{transform:translate(0,0) scale(1);opacity:.40}50%{transform:translate(16px,28px) scale(1.1);opacity:.20}}",
  "@keyframes v3pd{0%,100%{transform:translate(0,0) scale(1);opacity:.30}50%{transform:translate(-18px,-24px) scale(1.2);opacity:.55}}",
  "@keyframes v3shimmer{0%{transform:translateX(-160%) rotate(-20deg);opacity:0}15%{opacity:.7}85%{opacity:.7}100%{transform:translateX(260%) rotate(-20deg);opacity:0}}",
  "@keyframes v3float{0%,100%{transform:translateY(0px) rotate(0deg)}33%{transform:translateY(-7px) rotate(.8deg)}66%{transform:translateY(-3px) rotate(-.8deg)}}",
  "@keyframes v3glow{0%,100%{box-shadow:0 0 8px currentColor}50%{box-shadow:0 0 22px currentColor,0 0 42px currentColor}}",
  "@keyframes v3textShimmer{0%{background-position:0% center}100%{background-position:200% center}}",
  "@keyframes v3cardshine{0%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(220%) skewX(-20deg)}}",
  "@keyframes v3blink{50%{opacity:0}}",
  "@media(prefers-reduced-motion:reduce){.v3-blob,.v3-particle{animation:none!important}}",
  ".v3-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:48px 48px}",
].join("\n");

const AnimatedBackground: React.FC<{ accent: string; glassMode: boolean }> = ({ accent, glassMode }) => {
  const c = accent.length === 7 ? accent : "#FF9500";
  const hr = parseInt(c.slice(1,3),16), hg = parseInt(c.slice(3,5),16), hb = parseInt(c.slice(5,7),16);
  const rgba = (a: number) => "rgba("+hr+","+hg+","+hb+","+a+")";
  const bA = glassMode ? 0.72 : 0.55, bB = glassMode ? 0.48 : 0.30;
  const bC = glassMode ? 0.55 : 0.38, bD = glassMode ? 0.38 : 0.20;
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", zIndex:0, pointerEvents:"none" }}>
      <style dangerouslySetInnerHTML={{ __html: V3_CSS }} />
      <div className="v3-blob" style={{position:"absolute",left:"0%",top:"0%",width:680,height:680,borderRadius:"50%",background:rgba(bA),filter:"blur(110px)",animation:"v3blob0 24s ease-in-out infinite"}} />
      <div className="v3-blob" style={{position:"absolute",right:"2%",top:"-5%",width:500,height:500,borderRadius:"50%",background:rgba(bB),filter:"blur(95px)",animation:"v3blob1 30s ease-in-out infinite"}} />
      <div className="v3-blob" style={{position:"absolute",left:"30%",bottom:"0%",width:560,height:560,borderRadius:"50%",background:rgba(bC),filter:"blur(120px)",animation:"v3blob2 26s ease-in-out infinite"}} />
      <div className="v3-blob" style={{position:"absolute",right:"25%",bottom:"20%",width:380,height:380,borderRadius:"50%",background:rgba(bD),filter:"blur(80px)",animation:"v3blob3 20s ease-in-out infinite"}} />
      <div className="v3-grid" />
      {PARTICLES.map((p) => (
        <div key={p.id} className="v3-particle" style={{position:"absolute",left:p.x+"%",top:p.y+"%",width:p.s,height:p.s,borderRadius:"50%",background:rgba(0.6),boxShadow:"0 0 "+(p.s*3)+"px "+rgba(0.5),animation:p.anim+" "+p.dur+"s ease-in-out "+p.del+"s infinite"}} />
      ))}
    </div>
  );
};


// ─── Color Picker ─────────────────────────────────────────────────────────────
const ColorPicker: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { accentColor, setAccentColor, glassMode, toggleGlassMode, mode, toggleMode } = useV3ThemeContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, scale:0.86, y:12 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.86, y:12 }}
      transition={{ type:"spring", stiffness:320, damping:26 }}
      style={{ ...glass({ borderRadius:20, padding:20, minWidth:250 }), position:"absolute", bottom:"calc(100% + 14px)", right:0, zIndex:300,
        boxShadow:"0 28px 72px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.10)" }}>

      {/* Glass UI toggle */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14,
        padding:"10px 14px", borderRadius:13,
        background: glassMode ? accentColor+"18" : "var(--v3-surface2)",
        border: "1px solid "+(glassMode ? accentColor+"44" : "var(--v3-border)"),
        cursor:"pointer", transition:"all 0.22s" }} onClick={toggleGlassMode}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {glassMode ? <BsDropletHalf size={16} color={accentColor} /> : <BsDroplet size={16} color="var(--v3-text2)" />}
          <span style={{ color: glassMode ? accentColor : "var(--v3-text2)", fontSize:13, fontWeight:600 }}>Liquid Glass UI</span>
        </div>
        <div style={{ width:40, height:22, borderRadius:11, background: glassMode ? accentColor : "var(--v3-border)", position:"relative", transition:"background 0.22s" }}>
          <motion.div animate={{ x: glassMode ? 20 : 2 }} transition={{ type:"spring", stiffness:400, damping:30 }}
            style={{ position:"absolute", top:3, width:16, height:16, borderRadius:"50%", background:"#fff", boxShadow:"0 1px 4px rgba(0,0,0,0.3)" }} />
        </div>
      </div>

      {/* Dark/Light toggle */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, padding:"10px 14px", borderRadius:13,
        background:"var(--v3-surface2)", border:"1px solid var(--v3-border)", cursor:"pointer" }} onClick={toggleMode}>
        {mode==="DARK" ? <HiOutlineSun size={15} color="var(--v3-text2)" /> : <HiOutlineMoon size={15} color="var(--v3-text2)" />}
        <span style={{ color:"var(--v3-text2)", fontSize:13, fontWeight:500 }}>{mode==="DARK" ? "Light Mode" : "Dark Mode"}</span>
      </div>

      <p style={{ color:"var(--v3-text2)", fontSize:10, marginBottom:12, textTransform:"uppercase", letterSpacing:1.2, fontWeight:600 }}>Accent Color</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:9, marginBottom:16 }}>
        {COLOR_PRESETS.map((p) => (
          <button key={p.color} title={p.label} onClick={() => setAccentColor(p.color)}
            style={{ width:30, height:30, borderRadius:"50%", background:p.color, border:"none", cursor:"pointer",
              outline: accentColor===p.color ? "3px solid "+p.color : "none", outlineOffset:3,
              boxShadow: accentColor===p.color ? "0 0 14px "+p.color+"99" : "none", transition:"transform 0.14s" }}
            onMouseEnter={(e)=>{ e.currentTarget.style.transform="scale(1.28)"; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.transform="scale(1)"; }} />
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:11, background:"var(--v3-surface2)", border:"1px solid var(--v3-border)" }}>
        <label style={{ color:"var(--v3-text2)", fontSize:12 }}>Custom</label>
        <input type="color" value={accentColor} onChange={(e)=>setAccentColor(e.target.value)}
          style={{ width:34, height:26, borderRadius:7, border:"none", cursor:"pointer", background:"none", padding:0 }} />
        <span style={{ color:"var(--v3-text2)", fontSize:11, fontFamily:"monospace" }}>{accentColor}</span>
      </div>
    </motion.div>
  );
};

// ─── Traffic Lights ───────────────────────────────────────────────────────────
const TrafficLights: React.FC = () => (
  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
    {[{c:"#FF5F57",s:"#FF5F5766"},{c:"#FEBC2E",s:"#FEBC2E66"},{c:"#28C840",s:"#28C84066"}].map((btn,i) => (
      <motion.div key={i} whileHover={{ scale:1.2 }} whileTap={{ scale:0.88 }}
        style={{ width:13, height:13, borderRadius:"50%", background:btn.c,
          boxShadow:"0 0 7px "+btn.s+", inset 0 1px 1px rgba(255,255,255,0.4)", cursor:"default" }} />
    ))}
  </div>
);

// ─── Version Switcher ─────────────────────────────────────────────────────────
const VersionSwitcher: React.FC = () => {
  const { accentColor } = useV3ThemeContext();
  return (
    <div style={{ display:"flex", gap:2, background:"rgba(0,0,0,0.28)", borderRadius:9, padding:3, border:"1px solid rgba(255,255,255,0.08)" }}>
      {(["v1","v2","v3"] as const).map((v) => (
        <button key={v} onClick={()=>{ if(v!=="v3") window.location.href="/"+v; }}
          style={{ padding:"3px 11px", borderRadius:6, border:"none", fontSize:12, fontWeight:600,
            cursor: v==="v3" ? "default" : "pointer",
            background: v==="v3" ? accentColor : "transparent",
            color: v==="v3" ? "#fff" : "var(--v3-text2)",
            transition:"all 0.15s", letterSpacing:0.3 }}
          onMouseEnter={(e)=>{ if(v!=="v3") e.currentTarget.style.color="var(--v3-text)"; }}
          onMouseLeave={(e)=>{ if(v!=="v3") e.currentTarget.style.color="var(--v3-text2)"; }}>{v}</button>
      ))}
    </div>
  );
};

// ─── Nav Items ────────────────────────────────────────────────────────────────
interface NavItem { label: string; path: string; icon: React.ReactNode; }
const NAV_ITEMS: NavItem[] = [
  { label:"About",    path:RoutePaths.about.path,   icon:<FiUser        size={16} /> },
  { label:"Résumé",   path:RoutePaths.resume.path,  icon:<FiFileText    size={16} /> },
  { label:"Projects", path:RoutePaths.project.path, icon:<BsGrid1X2Fill size={14} /> },
  { label:"Contact",  path:RoutePaths.contact.path, icon:<FiMail        size={16} /> },
];


// ─── Sidebar ─────────────────────────────────────────────────────────────────
const Sidebar: React.FC<{ basePath: string }> = ({ basePath }) => {
  const location = useLocation();
  const { accentColor, glassMode } = useV3ThemeContext();
  const { profile, social } = useDataContext();
  const name = profile?.name || FALLBACK.name;
  const position = profile?.position || FALLBACK.position;
  const activePath = location.pathname.replace(basePath, "") || "/";
  const github   = social?.find((s) => s.label?.toLowerCase().includes("github"))?.href   || FALLBACK.github;
  const linkedin = social?.find((s) => s.label?.toLowerCase().includes("linkedin"))?.href || FALLBACK.linkedin;

  return (
    <div style={{ width:260, minWidth:260, height:"100%", display:"flex", flexDirection:"column",
      ...glass({ borderRight:"1px solid var(--v3-border)", borderRadius:0 }),
      overflow:"hidden", position:"relative" }}>
      {glassMode && (
        <div style={{ position:"absolute", top:0, left:"-60%", width:"40%", height:"100%",
          background:"linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
          animation:"v3shimmer 10s ease-in-out 3s infinite", pointerEvents:"none", zIndex:5 }} />
      )}
      {/* Profile */}
      <div style={{ padding:"28px 20px 18px", textAlign:"center" }}>
        <motion.div initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }}
          transition={{ type:"spring", stiffness:220, damping:20 }}
          style={{ width:90, height:90, borderRadius:"50%", border:"3px solid "+accentColor, margin:"0 auto 14px",
            overflow:"hidden", boxShadow:"0 0 0 6px "+accentColor+"22, 0 10px 32px rgba(0,0,0,0.4)",
            animation: glassMode ? "v3float 6s ease-in-out infinite" : "none" }}>
          <img src={ProfileImage} alt={name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        </motion.div>
        <motion.h2 initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.12 }}
          style={{ fontWeight:700, fontSize:17, margin:"0 0 8px", letterSpacing:-0.3,
            ...(glassMode ? { background:"linear-gradient(135deg, var(--v3-text) 20%, "+accentColor+" 60%, var(--v3-text) 80%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundSize:"200% auto", animation:"v3textShimmer 5s linear infinite" } : { color:"var(--v3-text)" }) }}>
          {name}
        </motion.h2>
        <motion.span initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.18 }}
          style={{ background:accentColor+"20", color:accentColor, fontSize:11, fontWeight:700,
            padding:"4px 14px", borderRadius:20, border:"1px solid "+accentColor+"50",
            letterSpacing:0.4, textTransform:"uppercase" }}>
          {position}
        </motion.span>
      </div>
      <div style={{ height:1, background:"var(--v3-border)", margin:"0 16px 16px" }} />
      {/* Contact */}
      <div style={{ padding:"0 20px", display:"flex", flexDirection:"column", gap:11 }}>
        {[{icon:<FaEnvelope size={11}/>,text:FALLBACK.email},{icon:<FaPhone size={11}/>,text:FALLBACK.phone},{icon:<FaMapMarkerAlt size={11}/>,text:FALLBACK.location}].map((item,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:9 }}>
            <span style={{ color:accentColor, flexShrink:0, width:26, height:26, borderRadius:8, background:accentColor+"18",
              display:"flex", alignItems:"center", justifyContent:"center" }}>{item.icon}</span>
            <span style={{ color:"var(--v3-text2)", fontSize:12, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.text}</span>
          </div>
        ))}
      </div>
      {/* Social */}
      <div style={{ padding:"14px 20px", display:"flex", gap:10 }}>
        {[{icon:<FaGithub size={17}/>,href:github,label:"GitHub"},{icon:<FaLinkedin size={17}/>,href:linkedin,label:"LinkedIn"},{icon:<FaInstagram size={17}/>,href:"#",label:"Instagram"}].map((s)=>(
          <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
            whileHover={{ y:-3, scale:1.08 }} whileTap={{ scale:0.90 }}
            style={{ color:"var(--v3-text2)", display:"flex", alignItems:"center", width:34, height:34, borderRadius:10,
              background:"var(--v3-surface2)", border:"1px solid var(--v3-border)", justifyContent:"center", textDecoration:"none",
              transition:"color 0.15s, border-color 0.15s, box-shadow 0.15s" }}
            onMouseEnter={(e)=>{ e.currentTarget.style.color=accentColor; e.currentTarget.style.borderColor=accentColor+"55"; e.currentTarget.style.boxShadow="0 0 12px "+accentColor+"44"; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.color="var(--v3-text2)"; e.currentTarget.style.borderColor="var(--v3-border)"; e.currentTarget.style.boxShadow="none"; }}>
            {s.icon}
          </motion.a>
        ))}
      </div>
      <div style={{ height:1, background:"var(--v3-border)", margin:"0 16px 14px" }} />
      {/* Nav */}
      <nav style={{ flex:1, padding:"0 10px", display:"flex", flexDirection:"column", gap:3 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activePath===item.path || (item.path!=="/" && activePath.startsWith(item.path));
          return (
            <Link key={item.path} to={basePath+item.path} style={{ textDecoration:"none" }}>
              <motion.div whileHover={{ x:5 }} whileTap={{ scale:0.95 }}
                style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", borderRadius:11,
                  background: isActive ? accentColor+"22" : "transparent",
                  color: isActive ? accentColor : "var(--v3-text2)", fontWeight: isActive ? 700 : 400,
                  fontSize:14, cursor:"pointer", transition:"background 0.15s, color 0.15s",
                  border: isActive ? "1px solid "+accentColor+"44" : "1px solid transparent",
                  boxShadow: isActive && glassMode ? "0 0 14px "+accentColor+"22" : "none" }}>
                <span style={{ display:"flex", alignItems:"center" }}>{item.icon}</span>
                {item.label}
                {isActive && <motion.div layoutId="sidebar-active"
                  style={{ marginLeft:"auto", width:7, height:7, borderRadius:"50%", background:accentColor,
                    animation: glassMode ? "v3glow 2s ease-in-out infinite" : "none" }} />}
              </motion.div>
            </Link>
          );
        })}
      </nav>
      <div style={{ padding:"14px 20px", color:"var(--v3-text2)", fontSize:11, textAlign:"center", letterSpacing:0.3 }}>
        © {new Date().getFullYear()} Rajeev Dessai
      </div>
    </div>
  );
};


// ─── Title Bar ────────────────────────────────────────────────────────────────
const TitleBar: React.FC = () => {
  const { mode, toggleMode, accentColor, glassMode, toggleGlassMode } = useV3ThemeContext();
  const [showPicker, setShowPicker] = useState(false);
  return (
    <div style={{ height:46, display:"flex", alignItems:"center", padding:"0 16px",
      borderBottom:"1px solid var(--v3-border)", gap:12, flexShrink:0, position:"relative",
      background:"rgba(255,255,255,0.02)" }}>
      <TrafficLights />
      <div style={{ flex:1, textAlign:"center", color:"var(--v3-text2)", fontSize:13, fontWeight:500, pointerEvents:"none", letterSpacing:0.2 }}>
        Rajeev Dessai — Portfolio
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
        <VersionSwitcher />
        <motion.button onClick={toggleGlassMode} whileHover={{ scale:1.1 }} whileTap={{ scale:0.88 }}
          title={glassMode ? "Disable Glass UI" : "Enable Glass UI"}
          style={{ background: glassMode ? accentColor+"22" : "var(--v3-surface2)",
            border: "1px solid "+(glassMode ? accentColor+"55" : "var(--v3-border)"),
            cursor:"pointer", color: glassMode ? accentColor : "var(--v3-text2)",
            display:"flex", alignItems:"center", padding:6, borderRadius:8, transition:"all 0.2s",
            boxShadow: glassMode ? "0 0 10px "+accentColor+"44" : "none" }}>
          {glassMode ? <BsDropletHalf size={14} /> : <BsDroplet size={14} />}
        </motion.button>
        <motion.button onClick={toggleMode} whileHover={{ scale:1.1 }} whileTap={{ scale:0.88 }}
          title={mode==="DARK" ? "Switch to Light" : "Switch to Dark"}
          style={{ background:"var(--v3-surface2)", border:"1px solid var(--v3-border)", cursor:"pointer",
            color:"var(--v3-text2)", display:"flex", alignItems:"center", padding:6, borderRadius:8, transition:"all 0.15s" }}
          onMouseEnter={(e)=>{ e.currentTarget.style.color=accentColor; }}
          onMouseLeave={(e)=>{ e.currentTarget.style.color="var(--v3-text2)"; }}>
          {mode==="DARK" ? <HiOutlineSun size={14} /> : <HiOutlineMoon size={14} />}
        </motion.button>
        <div style={{ position:"relative" }}>
          <motion.button onClick={()=>setShowPicker(p=>!p)} whileHover={{ scale:1.1 }} whileTap={{ scale:0.88 }}
            style={{ background: showPicker ? accentColor+"22" : "var(--v3-surface2)",
              border: "1px solid "+(showPicker ? accentColor+"55" : "var(--v3-border)"),
              cursor:"pointer", color:accentColor, display:"flex", alignItems:"center", padding:6, borderRadius:8, transition:"all 0.15s" }}>
            <IoColorPaletteOutline size={14} />
          </motion.button>
          <AnimatePresence>{showPicker && <ColorPicker onClose={()=>setShowPicker(false)} />}</AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ─── Desktop Dock ─────────────────────────────────────────────────────────────
// Version switcher is in TitleBar only – not repeated here
const Dock: React.FC<{ basePath: string }> = ({ basePath }) => {
  const location = useLocation();
  const { accentColor, glassMode } = useV3ThemeContext();
  const [hoveredIdx, setHoveredIdx] = useState<number|null>(null);
  const activePath = location.pathname.replace(basePath,"") || "/";
  const getScale = (i: number) => {
    if (hoveredIdx===null) return 1;
    const d = Math.abs(i-hoveredIdx);
    return d===0 ? 1.48 : d===1 ? 1.24 : d===2 ? 1.08 : 1;
  };
  const iconBtn = (isActive: boolean) => ({
    width:46, height:46, borderRadius:13,
    background: isActive ? accentColor+"2e" : "rgba(255,255,255,0.07)",
    border: isActive ? "1.5px solid "+accentColor+"66" : "1px solid rgba(255,255,255,0.12)",
    display:"flex" as const, alignItems:"center" as const, justifyContent:"center" as const,
    color: isActive ? accentColor : "var(--v3-text2)", transition:"all 0.15s",
    boxShadow: (isActive && glassMode) ? "0 0 18px "+accentColor+"44" : (isActive ? "0 0 10px "+accentColor+"22" : "none"),
    position:"relative" as const, overflow:"hidden" as const,
  });
  return (
    <div style={{ display:"flex", justifyContent:"center", padding:"8px 0 14px", flexShrink:0 }}>
      <div style={{ position:"relative" }}>
        {glassMode && (
          <div style={{ position:"absolute", top:"100%", left:"5%", right:"5%", height:20,
            background:"linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
            filter:"blur(4px)", transform:"scaleY(-0.4)", transformOrigin:"top", pointerEvents:"none" }} />
        )}
        <motion.div initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }}
          transition={{ type:"spring", stiffness:200, damping:22, delay:0.1 }}
          style={{ backdropFilter:"saturate(200%) blur(var(--v3-blur-amt, 28px))",
            WebkitBackdropFilter:"saturate(200%) blur(var(--v3-blur-amt, 28px))",
            background: glassMode ? "rgba(255,255,255,0.04)" : "rgba(30,30,38,0.75)",
            border:"1px solid var(--v3-window-border, rgba(255,255,255,0.14))",
            borderRadius:22, padding:"10px 18px", display:"flex", alignItems:"flex-end", gap:10,
            boxShadow: glassMode
              ? "0 12px 44px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18), 0 0 60px "+accentColor+"15"
              : "0 10px 36px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.09)",
            position:"relative", overflow:"hidden" }}>
          {glassMode && (
            <div style={{ position:"absolute", top:"-50%", left:"-60%", width:"50%", height:"200%",
              background:"linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
              animation:"v3shimmer 9s ease-in-out 1s infinite", pointerEvents:"none" }} />
          )}
          {NAV_ITEMS.map((item,i) => {
            const isActive = activePath===item.path || (item.path!=="/" && activePath.startsWith(item.path));
            return (
              <Link key={item.path} to={basePath+item.path} style={{ textDecoration:"none" }}>
                <motion.div onHoverStart={()=>setHoveredIdx(i)} onHoverEnd={()=>setHoveredIdx(null)}
                  animate={{ scale:getScale(i) }} transition={{ type:"spring", stiffness:340, damping:20 }}
                  style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                  <div style={iconBtn(isActive)}>
                    {item.icon}
                    {isActive && glassMode && (
                      <div style={{ position:"absolute", top:0, left:"-100%", width:"60%", height:"100%",
                        background:"linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                        animation:"v3cardshine 3s ease-in-out infinite" }} />
                    )}
                  </div>
                  <span style={{ fontSize:10, color:isActive?accentColor:"var(--v3-text2)", fontWeight:isActive?700:400 }}>{item.label}</span>
                  {isActive && <motion.div layoutId="dock-active"
                    style={{ width:4, height:4, borderRadius:"50%", background:accentColor,
                      boxShadow: glassMode ? "0 0 8px "+accentColor+", 0 0 16px "+accentColor+"66" : "0 0 6px "+accentColor }} />}
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};


// ─── Typing Text ──────────────────────────────────────────────────────────────
const TypingText: React.FC = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { accentColor } = useV3ThemeContext();
  useEffect(() => {
    const word = TYPING_WORDS[wordIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length) t = setTimeout(()=>setDisplayed(word.slice(0,displayed.length+1)),75);
    else if (!deleting && displayed.length===word.length) t = setTimeout(()=>setDeleting(true),1800);
    else if (deleting && displayed.length>0) t = setTimeout(()=>setDisplayed(displayed.slice(0,-1)),38);
    else { setDeleting(false); setWordIdx(i=>(i+1)%TYPING_WORDS.length); }
    return ()=>clearTimeout(t);
  }, [displayed,deleting,wordIdx]);
  return (
    <span style={{ color:accentColor, fontWeight:500 }}>
      {displayed}
      <span style={{ borderRight:"2px solid "+accentColor, marginLeft:2, animation:"v3blink 0.85s step-end infinite" }} />
    </span>
  );
};

// ─── Service Card (with 3D tilt) ──────────────────────────────────────────────
const ServiceCard: React.FC<{
  service:{title:string;description:string;percentage:number}; icon:React.ReactNode; i:number;
}> = ({ service, icon, i }) => {
  const { accentColor, glassMode } = useV3ThemeContext();
  const { rotateX, rotateY, onMove, onLeave } = useTilt(5);
  return (
    <motion.div custom={i+2} variants={fadeUp} initial="hidden" animate="visible" style={{ perspective:800 }}>
      <motion.div onMouseMove={onMove} onMouseLeave={onLeave} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
        style={{ ...glass({ borderRadius:18, padding:24 }), cursor:"default", rotateX, rotateY,
          position:"relative", overflow:"hidden", transformStyle:"preserve-3d",
          boxShadow: glassMode
            ? "0 12px 48px rgba(0,0,0,0.4), 0 0 0 1px "+accentColor+"22, inset 0 1px 0 rgba(255,255,255,0.18)"
            : "0 4px 20px rgba(0,0,0,0.2)" }}>
        {glassMode && (
          <div style={{ position:"absolute", top:0, left:"-100%", width:"55%", height:"100%",
            background:"linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.07) 50%, transparent 65%)",
            animation:"v3cardshine 5s ease-in-out infinite", pointerEvents:"none" }} />
        )}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1,
          background:"var(--v3-specular, rgba(255,255,255,0.12))", borderRadius:"18px 18px 0 0", pointerEvents:"none" }} />
        <div style={{ width:52, height:52, borderRadius:16, background:accentColor+"18", color:accentColor,
          display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16,
          border:"1px solid "+accentColor+"33", boxShadow: glassMode ? "0 0 20px "+accentColor+"22" : "none" }}>
          {icon}
        </div>
        <h4 style={{ color:"var(--v3-text)", fontWeight:700, fontSize:15, margin:"0 0 8px", letterSpacing:-0.2 }}>{service.title}</h4>
        <p style={{ color:"var(--v3-text2)", fontSize:13, margin:"0 0 16px", lineHeight:1.65 }}>{service.description}</p>
        {service.percentage>0 && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ color:"var(--v3-text2)", fontSize:11, textTransform:"uppercase", letterSpacing:0.5 }}>Proficiency</span>
              <span style={{ color:accentColor, fontSize:12, fontWeight:700 }}>{service.percentage}%</span>
            </div>
            <div style={{ height:5, background:"var(--v3-border)", borderRadius:3, overflow:"hidden" }}>
              <motion.div initial={{ width:0 }} animate={{ width:service.percentage+"%" }}
                transition={{ delay:i*0.09+0.5, duration:0.9, ease:"easeOut" }}
                style={{ height:"100%", borderRadius:3, background:"linear-gradient(90deg, "+accentColor+", "+accentColor+"bb)",
                  boxShadow: glassMode ? "0 0 8px "+accentColor+"88" : "none" }} />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── About Section ────────────────────────────────────────────────────────────
const AboutSection: React.FC = () => {
  const { profile, services } = useDataContext();
  const { accentColor, glassMode } = useV3ThemeContext();
  const about = profile?.about || FALLBACK.about;
  const name  = profile?.name  || FALLBACK.name;
  const gradientText = glassMode ? {
    background:"linear-gradient(135deg, var(--v3-text) 10%, "+accentColor+" 55%, var(--v3-text) 90%)",
    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
    backgroundSize:"200% auto", animation:"v3textShimmer 5s linear infinite",
  } : { color:"var(--v3-text)" };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ padding:"36px 36px 48px" }}>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom:40 }}>
        <motion.p initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.05 }}
          style={{ color:"var(--v3-text2)", fontSize:14, marginBottom:10, letterSpacing:0.3 }}>
          Hi there 👋, I&apos;m
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, type:"spring" }}
          style={{ fontSize:46, fontWeight:800, margin:"0 0 10px", lineHeight:1.06, letterSpacing:-1.2, ...gradientText }}>
          {name}
        </motion.h1>
        <h2 style={{ color:"var(--v3-text2)", fontSize:22, fontWeight:400, margin:"0 0 22px", minHeight:34 }}>
          <TypingText />
        </h2>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
          style={{ color:"var(--v3-text2)", fontSize:15, lineHeight:1.78, maxWidth:620, marginBottom:28 }}>
          {about}
        </motion.p>
        <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
          {[{href:FALLBACK.github,icon:<FaGithub size={15}/>,label:"View GitHub",primary:true},{href:FALLBACK.linkedin,icon:<FaLinkedin size={15}/>,label:"LinkedIn",primary:false}].map((btn)=>(
            <motion.a key={btn.label} href={btn.href} target="_blank" rel="noopener noreferrer"
              whileHover={{ y:-3, scale:1.03 }} whileTap={{ scale:0.96 }}
              style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"11px 24px", borderRadius:13,
                textDecoration:"none", fontWeight:700, fontSize:14,
                ...(btn.primary ? { background:accentColor, color:"#fff", boxShadow:"0 4px 22px "+accentColor+"55" }
                  : { background:"var(--v3-surface2)", color:"var(--v3-text)", border:"1px solid var(--v3-border)" }) }}>
              {btn.icon} {btn.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
      {services && services.length>0 && (
        <div>
          <motion.h3 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            style={{ color:"var(--v3-text)", fontSize:22, fontWeight:700, marginBottom:22, letterSpacing:-0.4 }}>
            What I Do
          </motion.h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:18 }}>
            {services.map((service,i) => {
              const ServiceIcon = SERVICE_ICON_MAP[service.icon??""] ?? <VscCode size={24}/>;
              return <ServiceCard key={service.title} service={service} icon={ServiceIcon} i={i} />;
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
  const { accentColor, glassMode } = useV3ThemeContext();

  const TimelineEntry: React.FC<{
    title:string; subtitle:string; duration?:string; description?:string;
    subItems?:{subTitle:string;date:string}[]; i:number;
  }> = ({ title, subtitle, duration, description, subItems, i }) => (
    <motion.div custom={i} variants={fadeUp} initial="hidden" animate="visible"
      style={{ display:"flex", gap:18, marginBottom:26 }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
        <motion.div
          animate={glassMode ? { boxShadow:["0 0 10px "+accentColor+"88","0 0 24px "+accentColor,"0 0 10px "+accentColor+"88"] } : {}}
          transition={{ duration:2.4, repeat:Infinity }}
          style={{ width:14, height:14, borderRadius:"50%", background:accentColor,
            boxShadow:"0 0 10px "+accentColor+"88", flexShrink:0, marginTop:4 }} />
        <div style={{ width:2, flex:1, background:accentColor+"30", marginTop:6 }} />
      </div>
      <motion.div whileHover={{ y:-3, boxShadow:"0 14px 40px "+accentColor+"22" }}
        transition={{ type:"spring", stiffness:280 }}
        style={{ ...glass({ borderRadius:16, padding:20 }), flex:1, position:"relative", overflow:"hidden" }}>
        {glassMode && <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"var(--v3-specular, rgba(255,255,255,0.15))" }} />}
        <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:6 }}>
          <h4 style={{ color:"var(--v3-text)", fontWeight:700, fontSize:16, margin:0, letterSpacing:-0.3 }}>{title}</h4>
          {duration && <span style={{ color:accentColor, fontSize:11, fontWeight:700, background:accentColor+"18",
            padding:"3px 12px", borderRadius:20, border:"1px solid "+accentColor+"33" }}>{duration}</span>}
        </div>
        <p style={{ color:accentColor, fontSize:13, fontWeight:600, margin:"0 0 10px" }}>{subtitle}</p>
        {description && <p style={{ color:"var(--v3-text2)", fontSize:13, lineHeight:1.7, margin:"0 0 10px" }}>{description}</p>}
        {subItems?.map((sub,si) => (
          <div key={si} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderTop:"1px solid var(--v3-border)" }}>
            <span style={{ color:"var(--v3-text2)", fontSize:13 }}>{sub.subTitle}</span>
            <span style={{ color:"var(--v3-text2)", fontSize:12 }}>{sub.date}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ padding:"36px 36px 48px" }}>
      <motion.h3 custom={0} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color:"var(--v3-text)", fontSize:22, fontWeight:700, marginBottom:26, display:"flex", alignItems:"center", gap:10, letterSpacing:-0.4 }}>
        <span style={{ color:accentColor, display:"flex" }}><MdWork size={22}/></span> Work Experience
      </motion.h3>
      {company?.length>0 ? company.map((c,i) => <TimelineEntry key={i} i={i+1} title={c.name} subtitle={c.title} duration={c.duration} description={c.description} subItems={c.subItems} />)
        : <p style={{ color:"var(--v3-text2)", marginBottom:32 }}>No work experience data.</p>}

      <motion.h3 custom={0} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color:"var(--v3-text)", fontSize:22, fontWeight:700, margin:"32px 0 26px", display:"flex", alignItems:"center", gap:10, letterSpacing:-0.4 }}>
        <span style={{ color:accentColor, display:"flex" }}><MdSchool size={22}/></span> Education
      </motion.h3>
      {education?.length>0 ? education.map((e,i) => <TimelineEntry key={i} i={i+1} title={e.name} subtitle={e.title} duration={e.duration} description={e.description} />)
        : <p style={{ color:"var(--v3-text2)", marginBottom:32 }}>No education data.</p>}

      {services?.length>0 && (
        <div style={{ marginTop:36 }}>
          <motion.h3 custom={0} variants={fadeUp} initial="hidden" animate="visible"
            style={{ color:"var(--v3-text)", fontSize:22, fontWeight:700, marginBottom:24, letterSpacing:-0.4 }}>Skills</motion.h3>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {services.map((s,i) => (
              <motion.div key={s.title} custom={i+1} variants={fadeUp} initial="hidden" animate="visible">
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
                  <span style={{ color:"var(--v3-text)", fontSize:14, fontWeight:500 }}>{s.title}</span>
                  <span style={{ color:accentColor, fontSize:13, fontWeight:700 }}>{s.percentage}%</span>
                </div>
                <div style={{ height:6, background:"var(--v3-border)", borderRadius:4, overflow:"hidden" }}>
                  <motion.div initial={{ width:0 }} animate={{ width:s.percentage+"%" }}
                    transition={{ delay:i*0.07+0.3, duration:0.9, ease:"easeOut" }}
                    style={{ height:"100%", borderRadius:4, background:"linear-gradient(90deg, "+accentColor+", "+accentColor+"99)",
                      boxShadow: glassMode ? "0 0 8px "+accentColor+"88" : "none" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tech?.length>0 && (
        <div style={{ marginTop:36 }}>
          <motion.h3 custom={0} variants={fadeUp} initial="hidden" animate="visible"
            style={{ color:"var(--v3-text)", fontSize:22, fontWeight:700, marginBottom:22, letterSpacing:-0.4 }}>Tech Stack</motion.h3>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {tech.map((t,i) => (
              <motion.div key={t.title} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                whileHover={{ scale:1.1, y:-3, boxShadow:"0 8px 24px "+accentColor+"33" }}
                style={{ ...glass({ borderRadius:12, padding:"9px 14px" }), display:"flex", alignItems:"center", gap:8, cursor:"default" }}>
                {(t.lightIcon||t.darkIcon) && <img src={t.lightIcon||t.darkIcon} alt={t.title} style={{ width:20, height:20, objectFit:"contain" }} />}
                {!t.renderOnlyIcon && <span style={{ color:"var(--v3-text)", fontSize:13, fontWeight:500 }}>{t.title}</span>}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};


// ─── Project Card (with 3D tilt) ──────────────────────────────────────────────
const ProjectCard: React.FC<{
  project:{title:string;description:string;images?:string[];type?:unknown;techStack?:{title:string}[];link?:string}; i:number;
}> = ({ project, i }) => {
  const { accentColor, glassMode } = useV3ThemeContext();
  const { rotateX, rotateY, onMove, onLeave } = useTilt(4);
  return (
    <motion.div custom={i} variants={fadeUp} initial="hidden" animate="visible"
      exit={{ opacity:0, scale:0.88 }} layout style={{ perspective:900 }}>
      <motion.div onMouseMove={onMove} onMouseLeave={onLeave} whileHover={{ y:-8 }} whileTap={{ scale:0.97 }}
        style={{ ...glass({ borderRadius:18 }), overflow:"hidden", cursor:"default", rotateX, rotateY,
          transformStyle:"preserve-3d",
          boxShadow: glassMode
            ? "0 16px 56px rgba(0,0,0,0.45), 0 0 0 1px "+accentColor+"22, inset 0 1px 0 rgba(255,255,255,0.18)"
            : "0 4px 20px rgba(0,0,0,0.2)" }}>
        <div style={{ height:162, overflow:"hidden", background:accentColor+"10", position:"relative" }}>
          {project.images && project.images.length>0 ? (
            <motion.img src={project.images[0]} alt={project.title} whileHover={{ scale:1.07 }}
              transition={{ duration:0.4 }}
              style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          ) : (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", color:accentColor, opacity:0.32 }}>
              <BsGrid1X2Fill size={52} />
            </div>
          )}
          {glassMode && <div style={{ position:"absolute", inset:0,
            background:"linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 50%)", pointerEvents:"none" }} />}
          <span style={{ position:"absolute", top:10, right:10,
            background:"rgba(0,0,0,0.55)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
            color:"#fff", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:20,
            letterSpacing:0.6, textTransform:"uppercase" }}>
            {typeof project.type==="string" ? project.type : "Project"}
          </span>
        </div>
        <div style={{ padding:20, position:"relative" }}>
          {glassMode && <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"var(--v3-specular, rgba(255,255,255,0.10))" }} />}
          <h4 style={{ color:"var(--v3-text)", fontWeight:700, fontSize:15, margin:"0 0 8px", letterSpacing:-0.2 }}>{project.title}</h4>
          <p style={{ color:"var(--v3-text2)", fontSize:13, lineHeight:1.65, margin:"0 0 14px",
            display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" } as React.CSSProperties}>
            {project.description}
          </p>
          {project.techStack && project.techStack.length>0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
              {project.techStack.slice(0,5).map((t)=>(
                <span key={t.title} style={{ padding:"3px 10px", borderRadius:20, fontSize:11,
                  background:accentColor+"18", color:accentColor, border:"1px solid "+accentColor+"33", fontWeight:600 }}>{t.title}</span>
              ))}
              {project.techStack.length>5 && <span style={{ color:"var(--v3-text2)", fontSize:11, padding:"3px 0" }}>+{project.techStack.length-5} more</span>}
            </div>
          )}
          {project.link && (
            <motion.a href={project.link} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.04, y:-1 }} whileTap={{ scale:0.95 }}
              style={{ display:"inline-flex", alignItems:"center", gap:6, background:accentColor,
                color:"#fff", padding:"8px 18px", borderRadius:10, textDecoration:"none", fontSize:13, fontWeight:700,
                boxShadow: glassMode ? "0 4px 20px "+accentColor+"55" : "0 4px 14px "+accentColor+"44" }}>
              <RiExternalLinkLine size={13}/> View
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Projects Section ──────────────────────────────────────────────────────────
const ProjectsSection: React.FC = () => {
  const { projects } = useDataContext();
  const { accentColor, glassMode } = useV3ThemeContext();
  const [filter, setFilter] = useState<"All"|"Web"|"Mobile">("All");
  const filtered = useMemo(() => {
    if (!projects) return [];
    if (filter==="All") return projects;
    return projects.filter(p => (typeof p.type==="string" ? p.type : String(p.type)).toLowerCase()===filter.toLowerCase());
  }, [projects, filter]);
  const gradientText = glassMode ? {
    background:"linear-gradient(135deg, var(--v3-text) 20%, "+accentColor+" 55%, var(--v3-text) 90%)",
    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
    backgroundSize:"200% auto", animation:"v3textShimmer 5s linear infinite",
  } : { color:"var(--v3-text)" };
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ padding:"36px 36px 48px" }}>
      <motion.h2 custom={0} variants={fadeUp} initial="hidden" animate="visible"
        style={{ fontSize:30, fontWeight:800, marginBottom:8, letterSpacing:-0.8, ...gradientText }}>
        Projects
      </motion.h2>
      <motion.p custom={1} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color:"var(--v3-text2)", fontSize:15, marginBottom:26 }}>
        A selection of things I&apos;ve built.
      </motion.p>
      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" style={{ display:"flex", gap:8, marginBottom:30 }}>
        {(["All","Web","Mobile"] as const).map(f=>(
          <motion.button key={f} onClick={()=>setFilter(f)} whileHover={{ scale:1.05 }} whileTap={{ scale:0.94 }}
            style={{ padding:"7px 22px", borderRadius:22,
              background: filter===f ? accentColor : "var(--v3-surface2)",
              color: filter===f ? "#fff" : "var(--v3-text2)", fontWeight: filter===f ? 700 : 500, fontSize:13,
              cursor:"pointer", border: "1px solid "+(filter===f ? accentColor : "var(--v3-border)"),
              boxShadow: filter===f && glassMode ? "0 4px 20px "+accentColor+"55" : (filter===f ? "0 4px 12px "+accentColor+"33" : "none"),
              transition:"all 0.2s" } as React.CSSProperties}>{f}</motion.button>
        ))}
      </motion.div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:20 }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((project,i)=><ProjectCard key={project.title} project={project} i={i} />)}
        </AnimatePresence>
      </div>
      {filtered.length===0 && <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
        style={{ color:"var(--v3-text2)", textAlign:"center", padding:48 }}>No projects found.</motion.p>}
    </motion.div>
  );
};


// ─── Contact Section ──────────────────────────────────────────────────────────
const ContactSection: React.FC = () => {
  const { accentColor, glassMode } = useV3ThemeContext();
  const [formData, setFormData] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSent(true);
    setTimeout(()=>setSent(false),3000);
    setFormData({ name:"", email:"", message:"" });
  };
  const inputBase: React.CSSProperties = {
    width:"100%", padding:"12px 16px", borderRadius:12,
    background:"var(--v3-surface2)", border:"1px solid var(--v3-border)",
    color:"var(--v3-text)", fontSize:14, outline:"none",
    boxSizing:"border-box", transition:"border-color 0.15s, box-shadow 0.15s", fontFamily:"inherit",
  };
  const gradientText = glassMode ? {
    background:"linear-gradient(135deg, var(--v3-text) 20%, "+accentColor+" 55%, var(--v3-text) 90%)",
    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
    backgroundSize:"200% auto", animation:"v3textShimmer 5s linear infinite",
  } : { color:"var(--v3-text)" };
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ padding:"36px 36px 48px" }}>
      <motion.h2 custom={0} variants={fadeUp} initial="hidden" animate="visible"
        style={{ fontSize:30, fontWeight:800, marginBottom:8, letterSpacing:-0.8, ...gradientText }}>
        Get in Touch
      </motion.h2>
      <motion.p custom={1} variants={fadeUp} initial="hidden" animate="visible"
        style={{ color:"var(--v3-text2)", fontSize:15, marginBottom:36 }}>
        I&apos;m always open to new opportunities and collaborations.
      </motion.p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:36 }}>
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:26 }}>
            {[{icon:<FaEnvelope/>,label:"Email",value:FALLBACK.email,href:"mailto:"+FALLBACK.email},
              {icon:<FaPhone/>,label:"Phone",value:FALLBACK.phone,href:"tel:"+FALLBACK.phone},
              {icon:<FaMapMarkerAlt/>,label:"Location",value:FALLBACK.location,href:undefined},
              {icon:<FaGithub/>,label:"GitHub",value:"fury-r",href:FALLBACK.github},
              {icon:<FaLinkedin/>,label:"LinkedIn",value:"rajeev-dessai",href:FALLBACK.linkedin},
            ].map((item,i)=>(
              <motion.div key={item.label} custom={i+3} variants={fadeUp} initial="hidden" animate="visible" whileHover={{ x:5 }}
                style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ width:44, height:44, borderRadius:13, background:accentColor+"18", color:accentColor,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0,
                  border:"1px solid "+accentColor+"33", boxShadow: glassMode ? "0 0 14px "+accentColor+"22" : "none" }}>{item.icon}</div>
                <div>
                  <p style={{ color:"var(--v3-text2)", fontSize:10, margin:"0 0 3px", textTransform:"uppercase", letterSpacing:0.8, fontWeight:600 }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      style={{ color:"var(--v3-text)", fontSize:14, fontWeight:600, textDecoration:"none" }}
                      onMouseEnter={e=>{e.currentTarget.style.color=accentColor;}} onMouseLeave={e=>{e.currentTarget.style.color="var(--v3-text)";}}>
                      {item.value}
                    </a>
                  ) : <p style={{ color:"var(--v3-text)", fontSize:14, fontWeight:600, margin:0 }}>{item.value}</p>}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div custom={9} variants={fadeUp} initial="hidden" animate="visible"
            style={{ borderRadius:16, overflow:"hidden", border:"1px solid var(--v3-border)", boxShadow:"0 4px 24px rgba(0,0,0,0.2)" }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116953.44217685494!2d73.7364965!3d15.2993265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb36d98c0e82b%3A0x4a4f33d5bf1d4538!2sGoa%2C%20India!5e0!3m2!1sen!2sus!5m2!1sen!2sus"
              width="100%" height="200" style={{ border:0, display:"block" }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Location map" />
          </motion.div>
        </motion.div>
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {[{label:"Name",key:"name",type:"text",ph:"Your name"},{label:"Email",key:"email",type:"email",ph:"your@email.com"}].map(field=>(
              <div key={field.key}>
                <label style={{ color:"var(--v3-text2)", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:0.8, display:"block", marginBottom:7 }}>{field.label}</label>
                <input type={field.type} placeholder={field.ph} value={formData[field.key as "name"|"email"]}
                  onChange={e=>setFormData(p=>({...p,[field.key]:e.target.value}))} required style={inputBase}
                  onFocus={e=>{e.target.style.borderColor=accentColor;e.target.style.boxShadow="0 0 0 3px "+accentColor+"22";}}
                  onBlur={e=>{e.target.style.borderColor="var(--v3-border)";e.target.style.boxShadow="none";}} />
              </div>
            ))}
            <div>
              <label style={{ color:"var(--v3-text2)", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:0.8, display:"block", marginBottom:7 }}>Message</label>
              <textarea placeholder="Tell me about your project or just say hi..." value={formData.message}
                onChange={e=>setFormData(p=>({...p,message:e.target.value}))} required rows={5}
                style={{ ...inputBase, resize:"vertical" }}
                onFocus={e=>{e.target.style.borderColor=accentColor;e.target.style.boxShadow="0 0 0 3px "+accentColor+"22";}}
                onBlur={e=>{e.target.style.borderColor="var(--v3-border)";e.target.style.boxShadow="none";}} />
            </div>
            <motion.button type="submit" whileHover={{ scale:1.02, boxShadow:"0 8px 32px "+accentColor+"66" }} whileTap={{ scale:0.96 }}
              style={{ background:accentColor, color:"#fff", padding:"14px 28px", borderRadius:13, border:"none",
                fontWeight:700, fontSize:15, cursor:"pointer",
                boxShadow: glassMode ? "0 4px 24px "+accentColor+"55" : "0 4px 18px "+accentColor+"44", letterSpacing:0.2 }}>
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


// ─── Desktop Window (iOS 26 Liquid Glass) ─────────────────────────────────────
const DesktopWindow: React.FC<{ basePath: string }> = ({ basePath }) => {
  const { accentColor, glassMode } = useV3ThemeContext();
  const { rotateX, rotateY, onMove, onLeave } = useTilt(1.5);
  return (
    <motion.div
      initial={{ opacity:0, scale:0.93, y:28 }} animate={{ opacity:1, scale:1, y:0 }}
      transition={{ type:"spring", stiffness:150, damping:22 }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        width:"93vw", height:"92vh", borderRadius:22,
        background:"var(--v3-window-bg, rgba(18,18,24,0.78))",
        backdropFilter:"saturate(220%) blur(var(--v3-blur-amt, 28px))",
        WebkitBackdropFilter:"saturate(220%) blur(var(--v3-blur-amt, 28px))",
        border:"1px solid var(--v3-window-border, rgba(255,255,255,0.13))",
        boxShadow: glassMode
          ? "0 50px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08), 0 0 100px "+accentColor+"18, inset 0 1px 0 rgba(255,255,255,0.14)"
          : "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), 0 0 80px "+accentColor+"12",
        display:"flex", flexDirection:"column", overflow:"hidden",
        position:"relative", zIndex:1,
        rotateX, rotateY, transformStyle:"preserve-3d",
      }}>
      {/* Top specular */}
      <div style={{ position:"absolute", top:0, left:0, right:0,
        height: glassMode ? 80 : 2,
        background: glassMode
          ? "linear-gradient(180deg, var(--v3-specular, rgba(255,255,255,0.14)) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)"
          : "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
        borderRadius:"22px 22px 0 0", pointerEvents:"none", zIndex:10 }} />
      {/* Left specular edge (glass mode) */}
      {glassMode && (
        <div style={{ position:"absolute", top:0, left:0, bottom:0, width:2,
          background:"linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.05) 40%, transparent 100%)",
          pointerEvents:"none", zIndex:10 }} />
      )}
      {/* Shimmer sweep */}
      {glassMode && (
        <div style={{ position:"absolute", top:"-40%", left:"-60%", width:"55%", height:"200%",
          background:"linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.06) 50%, transparent 62%)",
          animation:"v3shimmer 10s ease-in-out 2s infinite", pointerEvents:"none", zIndex:9, borderRadius:22 }} />
      )}
      <TitleBar />
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        <Sidebar basePath={basePath} />
        <div style={{ flex:1, overflow:"auto", display:"flex", flexDirection:"column" }}>
          <ContentRouter />
        </div>
      </div>
      <Dock basePath={basePath} />
    </motion.div>
  );
};

// ─── Mobile Tab Bar ────────────────────────────────────────────────────────────
// Version switcher shown in MobileProfileHeader above — not repeated here
const MobileTabBar: React.FC<{ basePath: string }> = ({ basePath }) => {
  const location = useLocation();
  const { accentColor, glassMode } = useV3ThemeContext();
  const activePath = location.pathname.replace(basePath,"") || "/";
  return (
    <div style={{ backdropFilter:"saturate(200%) blur(var(--v3-blur-amt, 28px))",
      WebkitBackdropFilter:"saturate(200%) blur(var(--v3-blur-amt, 28px))",
      background: glassMode ? "rgba(8,8,20,0.14)" : "rgba(18,18,24,0.85)",
      borderTop:"1px solid var(--v3-border)", borderRadius:"20px 20px 0 0",
      display:"flex", justifyContent:"space-around",
      padding:"10px 0 calc(10px + env(safe-area-inset-bottom, 0px))",
      flexShrink:0, position:"relative",
      boxShadow: glassMode ? "0 -8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.14)" : "0 -4px 24px rgba(0,0,0,0.25)" }}>
      {glassMode && <div style={{ position:"absolute", top:0, left:0, right:0, height:1,
        background:"var(--v3-specular, rgba(255,255,255,0.16))", borderRadius:"20px 20px 0 0", pointerEvents:"none" }} />}
      {NAV_ITEMS.map(tab => {
        const isActive = activePath===tab.path || (tab.path!=="/" && activePath.startsWith(tab.path));
        return (
          <Link key={tab.path} to={basePath+tab.path} style={{ textDecoration:"none" }}>
            <motion.div whileTap={{ scale:0.80, y:-5 }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                padding:"4px 14px", color: isActive ? accentColor : "var(--v3-text2)" }}>
              <div style={{ width:36, height:36, borderRadius:11,
                background: isActive ? accentColor+"22" : "transparent",
                display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s",
                boxShadow: isActive && glassMode ? "0 0 12px "+accentColor+"44" : "none" }}>{tab.icon}</div>
              <span style={{ fontSize:10, fontWeight:isActive?700:400 }}>{tab.label}</span>
              {isActive && <motion.div layoutId="mobile-active"
                style={{ width:4, height:4, borderRadius:"50%", background:accentColor,
                  boxShadow: glassMode ? "0 0 8px "+accentColor+", 0 0 16px "+accentColor+"66" : "0 0 6px "+accentColor }} />}
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

// ─── Mobile Profile Header (no status bar) ────────────────────────────────────
const MobileProfileHeader: React.FC = () => {
  const { profile } = useDataContext();
  const { accentColor, glassMode, toggleGlassMode, mode, toggleMode } = useV3ThemeContext();
  const [showPicker, setShowPicker] = useState(false);
  const name     = profile?.name     || FALLBACK.name;
  const position = profile?.position || FALLBACK.position;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 18px",
      background: glassMode ? "rgba(8,8,20,0.14)" : "rgba(18,18,24,0.75)",
      backdropFilter:"saturate(200%) blur(var(--v3-blur-amt, 28px))",
      WebkitBackdropFilter:"saturate(200%) blur(var(--v3-blur-amt, 28px))",
      borderBottom:"1px solid var(--v3-border)", flexShrink:0, position:"relative", overflow:"hidden" }}>
      {glassMode && <div style={{ position:"absolute", top:0, left:0, right:0, height:1,
        background:"var(--v3-specular, rgba(255,255,255,0.18))", pointerEvents:"none" }} />}
      <div style={{ width:46, height:46, borderRadius:"50%", border:"2.5px solid "+accentColor,
        overflow:"hidden", flexShrink:0,
        boxShadow: glassMode ? "0 0 0 4px "+accentColor+"22, 0 0 20px "+accentColor+"44" : "0 0 0 4px "+accentColor+"22",
        animation: glassMode ? "v3float 6s ease-in-out infinite" : "none" }}>
        <img src={ProfileImage} alt={name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <h1 style={{ fontWeight:700, fontSize:16, margin:0, letterSpacing:-0.3,
          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
          ...(glassMode ? { background:"linear-gradient(135deg, var(--v3-text) 20%, "+accentColor+" 60%, var(--v3-text) 90%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            backgroundSize:"200% auto", animation:"v3textShimmer 5s linear infinite" } : { color:"var(--v3-text)" }) }}>
          {name}
        </h1>
        <span style={{ color:accentColor, fontSize:11, fontWeight:600 }}>{position}</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
        <VersionSwitcher />
        <motion.button onClick={toggleGlassMode} whileHover={{ scale:1.1 }} whileTap={{ scale:0.86 }}
          style={{ width:32, height:32, borderRadius:9, border:"none",
            background: glassMode ? accentColor+"22" : "var(--v3-surface2)",
            color: glassMode ? accentColor : "var(--v3-text2)",
            display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
            boxShadow: glassMode ? "0 0 10px "+accentColor+"44" : "none" }}>
          {glassMode ? <BsDropletHalf size={14}/> : <BsDroplet size={14}/>}
        </motion.button>
        <motion.button onClick={toggleMode} whileHover={{ scale:1.1 }} whileTap={{ scale:0.86 }}
          style={{ width:32, height:32, borderRadius:9, border:"none",
            background:"var(--v3-surface2)", color:"var(--v3-text2)",
            display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
          {mode==="DARK" ? <HiOutlineSun size={14}/> : <HiOutlineMoon size={14}/>}
        </motion.button>
        <div style={{ position:"relative" }}>
          <motion.button onClick={()=>setShowPicker(p=>!p)} whileHover={{ scale:1.1 }} whileTap={{ scale:0.86 }}
            style={{ width:32, height:32, borderRadius:9, border:"none",
              background: showPicker ? accentColor+"22" : "var(--v3-surface2)", color:accentColor,
              display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <IoColorPaletteOutline size={14}/>
          </motion.button>
          <AnimatePresence>{showPicker && <ColorPicker onClose={()=>setShowPicker(false)} />}</AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ─── Mobile Layout — no status bar ────────────────────────────────────────────
const MobileLayout: React.FC<{ basePath: string }> = ({ basePath }) => (
  <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", overflow:"hidden" }}>
    <MobileProfileHeader />
    <div style={{ flex:1, overflow:"auto" }}><ContentRouter /></div>
    <MobileTabBar basePath={basePath} />
  </div>
);

// ─── V3 Layout ────────────────────────────────────────────────────────────────
const V3Layout: React.FC = () => {
  const { accentColor, glassMode } = useV3ThemeContext();
  const [isMobile, setIsMobile] = useState(()=>window.innerWidth<768);
  const basePath = "/v3";
  useEffect(() => {
    const h = ()=>setIsMobile(window.innerWidth<768);
    window.addEventListener("resize",h);
    return ()=>window.removeEventListener("resize",h);
  }, []);
  return (
    <div style={{ width:"100vw", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      overflow:"hidden", position:"relative", background:"var(--v3-bg)" }}>
      <AnimatedBackground accent={accentColor} glassMode={glassMode} />
      {isMobile ? (
        <div style={{ position:"relative", zIndex:1, width:"100%", height:"100%" }}>
          <MobileLayout basePath={basePath} />
        </div>
      ) : (
        <DesktopWindow basePath={basePath} />
      )}
    </div>
  );
};

export default V3Layout;
