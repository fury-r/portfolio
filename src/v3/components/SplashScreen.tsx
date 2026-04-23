import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { accentRgba } from "../utils";

// ── Deterministic seeded stars ────────────────────────────────────────────────
let _seed = 7;
const sr = () => {
  _seed = (_seed * 16807 + 0) % 2147483647;
  return (_seed - 1) / 2147483646;
};
const STARS = Array.from({ length: 80 }, () => ({
  x: sr() * 100,
  y: sr() * 100,
  s: sr() * 2.5 + 0.4,
  d: sr() * 5 + 3,
  o: sr() * 0.6 + 0.2,
}));

// ── Aurora orb ────────────────────────────────────────────────────────────────
const Orb: React.FC<{
  color: string;
  size: number;
  x: string;
  y: string;
  dur: number;
  delay?: number;
}> = ({ color, size, x, y, dur, delay = 0 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size * 0.65,
      borderRadius: "50%",
      background: color,
      filter: "blur(80px)",
      opacity: 0.6,
      animation: `v3splashorb ${dur}s ease-in-out ${delay}s infinite alternate`,
      pointerEvents: "none",
    }}
  />
);

// ── Spinning ring ─────────────────────────────────────────────────────────────
const SpinRing: React.FC<{
  r: number;
  stroke: string;
  dash: number;
  gap: number;
  dur: number;
  reverse?: boolean;
  opacity?: number;
}> = ({ r, stroke, dash, gap, dur, reverse = false, opacity = 1 }) => {
  const size = (r + 6) * 2;
  return (
    <svg
      width={size}
      height={size}
      style={{ position: "absolute", inset: 0, margin: "auto", opacity }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeDasharray={`${dash} ${gap}`}
        strokeLinecap="round"
        style={{
          transformOrigin: "50% 50%",
          animation: `v3spinring ${dur}s linear infinite ${reverse ? "reverse" : ""}`,
          filter: `drop-shadow(0 0 4px ${stroke})`,
        }}
      />
    </svg>
  );
};

// ── Progress ring ─────────────────────────────────────────────────────────────
const ProgressRing: React.FC<{
  progress: number;
  accent: string;
  r: number;
}> = ({ progress, accent, r }) => {
  const size = (r + 6) * 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - progress / 100);
  return (
    <svg
      width={size}
      height={size}
      style={{ position: "absolute", inset: 0, margin: "auto" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={3}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ filter: `drop-shadow(0 0 8px ${accent})` }}
        transition={{ duration: 0.08 }}
      />
    </svg>
  );
};

// ── Main SplashScreen ─────────────────────────────────────────────────────────
const SplashScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const { accentColor } = useV3ThemeContext();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 2200;

  useEffect(() => {
    const t = setTimeout(() => {
      const tick = (ts: number) => {
        if (!startRef.current) startRef.current = ts;
        const pct = Math.min(100, ((ts - startRef.current) / DURATION) * 100);
        setProgress(pct);
        if (pct < 100) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setPhase("hold");
          setTimeout(() => {
            setPhase("out");
            setTimeout(onDone, 900);
          }, 280);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 500);
    return () => {
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "out" && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(14px)",
            transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#07090f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <style>{`
            @keyframes v3splashorb {
              from { transform: translate(-12%, -12%) scale(1); }
              to   { transform: translate(12%, 12%) scale(1.22); }
            }
            @keyframes v3splashgrid {
              0%,100% { opacity: 0.025; }
              50%     { opacity: 0.065; }
            }
            @keyframes v3splashtwinkle {
              0%,100% { opacity: 0.15; transform: scale(0.7); }
              50%     { opacity: 1;    transform: scale(1.3); }
            }
            @keyframes v3spinring {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @keyframes v3gradrotate {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @keyframes v3splashpulse {
              0%,100% { transform: scale(1);    opacity: 0.5; }
              50%     { transform: scale(1.08); opacity: 0.9; }
            }
          `}</style>

          {/* ── Aurora orbs ── */}
          <Orb
            color={accentRgba(accentColor, 0.65)}
            size={750}
            x="-18%"
            y="-22%"
            dur={7}
            delay={0}
          />
          <Orb
            color="rgba(60,130,255,0.5)"
            size={620}
            x="62%"
            y="52%"
            dur={9}
            delay={1.4}
          />
          <Orb
            color="rgba(140,60,255,0.45)"
            size={520}
            x="22%"
            y="58%"
            dur={11}
            delay={0.7}
          />
          <Orb
            color={accentRgba(accentColor, 0.28)}
            size={420}
            x="78%"
            y="-12%"
            dur={8}
            delay={2.1}
          />
          <Orb
            color="rgba(255,80,140,0.25)"
            size={360}
            x="45%"
            y="70%"
            dur={6}
            delay={0.3}
          />

          {/* ── Grid ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
              `,
              backgroundSize: "56px 56px",
              animation: "v3splashgrid 4s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />

          {/* ── Starfield ── */}
          {STARS.map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.s,
                height: s.s,
                borderRadius: "50%",
                background: "#fff",
                opacity: s.o,
                animation: `v3splashtwinkle ${s.d}s ease-in-out ${i * 0.12}s infinite`,
                pointerEvents: "none",
              }}
            />
          ))}

          {/* ── Radial vignette ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.7) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Center orbital system ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", width: 220, height: 220 }}
          >
            {/* Outer spinning dashed ring */}
            <SpinRing
              r={100}
              stroke={accentRgba(accentColor, 0.35)}
              dash={12}
              gap={18}
              dur={14}
              opacity={0.8}
            />
            {/* Middle counter-spin */}
            <SpinRing
              r={78}
              stroke={accentRgba(accentColor, 0.25)}
              dash={6}
              gap={28}
              dur={9}
              reverse
              opacity={0.6}
            />
            {/* Progress ring */}
            <ProgressRing progress={progress} accent={accentColor} r={58} />

            {/* Core glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                margin: "auto",
                width: 90,
                height: 90,
                borderRadius: "50%",
                background: `radial-gradient(circle at 38% 35%, ${accentRgba(accentColor, 0.5)}, transparent 70%)`,
                boxShadow: [
                  `0 0 0 1px ${accentRgba(accentColor, 0.3)}`,
                  `0 0 30px ${accentRgba(accentColor, 0.4)}`,
                  `0 0 70px ${accentRgba(accentColor, 0.15)}`,
                ].join(", "),
                animation: "v3splashpulse 2.6s ease-in-out infinite",
              }}
            />

            {/* Rotating conic ring inside core */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                margin: "auto",
                width: 90,
                height: 90,
                borderRadius: "50%",
                background: `conic-gradient(from 0deg, transparent 55%, ${accentColor} 78%, transparent 100%)`,
                animation: "v3gradrotate 2.2s linear infinite",
                opacity: 0.55,
              }}
            />

            {/* Percentage */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {Math.round(progress)}
                <span style={{ fontSize: 13, fontWeight: 400, opacity: 0.6 }}>
                  %
                </span>
              </span>
            </div>
          </motion.div>

          {/* ── Bottom accent line ── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              transformOrigin: "center",
            }}
          />

          {/* ── Corner decorations ── */}
          {[
            { top: 24, left: 24 },
            { top: 24, right: 24 },
            { bottom: 24, left: 24 },
            { bottom: 24, right: 24 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.35, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
              style={{
                position: "absolute",
                ...pos,
                width: 18,
                height: 18,
                borderTop: i < 2 ? `1.5px solid ${accentColor}` : "none",
                borderBottom: i >= 2 ? `1.5px solid ${accentColor}` : "none",
                borderLeft: i % 2 === 0 ? `1.5px solid ${accentColor}` : "none",
                borderRight:
                  i % 2 !== 0 ? `1.5px solid ${accentColor}` : "none",
                pointerEvents: "none",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
