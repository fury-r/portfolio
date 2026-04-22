import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { FALLBACK } from "../constants";
import { accentRgba } from "../utils";

// ── Deterministic seeded stars ────────────────────────────────────────────────
let _seed = 7;
const sr = () => {
  _seed = (_seed * 16807 + 0) % 2147483647;
  return (_seed - 1) / 2147483646;
};
const STARS = Array.from({ length: 60 }, () => ({
  x: sr() * 100,
  y: sr() * 100,
  s: sr() * 2 + 0.5,
  d: sr() * 4 + 3,
  o: sr() * 0.5 + 0.3,
}));

// ── Letter reveal ─────────────────────────────────────────────────────────────
const LetterReveal: React.FC<{
  text: string;
  accent: string;
  delay?: number;
}> = ({ text, accent, delay = 0 }) => (
  <span
    style={{
      display: "inline-flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    {text.split("").map((ch, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          delay: delay + i * 0.04,
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          display: "inline-block",
          whiteSpace: ch === " " ? "pre" : "normal",
          background: `linear-gradient(135deg, #fff 20%, ${accent} 80%, #fff 120%)`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "v3splashshimmer 3s linear infinite",
          animationDelay: `${i * 0.08}s`,
        }}
      >
        {ch}
      </motion.span>
    ))}
  </span>
);

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
      height: size * 0.6,
      borderRadius: "50%",
      background: color,
      filter: "blur(70px)",
      opacity: 0.55,
      animation: `v3splashorb ${dur}s ease-in-out ${delay}s infinite alternate`,
      pointerEvents: "none",
    }}
  />
);

// ── Progress ring ─────────────────────────────────────────────────────────────
const ProgressRing: React.FC<{ progress: number; accent: string }> = ({
  progress,
  accent,
}) => {
  const r = 42;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - progress / 100);
  return (
    <svg
      width={100}
      height={100}
      style={{ position: "absolute", inset: 0, margin: "auto" }}
    >
      {/* Track */}
      <circle
        cx={50}
        cy={50}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={3}
      />
      {/* Progress */}
      <motion.circle
        cx={50}
        cy={50}
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={dash}
        transform="rotate(-90 50 50)"
        style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
        transition={{ duration: 0.1 }}
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
  const DURATION = 2400; // ms to fill progress bar

  useEffect(() => {
    // Start progress after brief delay for intro animation
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
          }, 300);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 600);
    return () => {
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onDone]);

  const name = FALLBACK.name;
  const role = FALLBACK.position;

  return (
    <AnimatePresence>
      {phase !== "out" && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(12px)",
            transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#080b12",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* ── CSS for splash-specific keyframes ── */}
          <style>{`
                        @keyframes v3splashorb {
                            from { transform: translate(-10%, -10%) scale(1); }
                            to   { transform: translate(10%, 10%) scale(1.18); }
                        }
                        @keyframes v3splashshimmer {
                            0%   { background-position: 200% center; }
                            100% { background-position: -200% center; }
                        }
                        @keyframes v3splashgrid {
                            0%   { opacity: 0.03; }
                            50%  { opacity: 0.07; }
                            100% { opacity: 0.03; }
                        }
                        @keyframes v3splashtwinkle {
                            0%,100% { opacity: 0.2; transform: scale(0.8); }
                            50%     { opacity: 1;   transform: scale(1.2); }
                        }
                    `}</style>

          {/* ── Aurora background ── */}
          <Orb
            color={accentRgba(accentColor, 0.6)}
            size={700}
            x="-15%"
            y="-20%"
            dur={7}
            delay={0}
          />
          <Orb
            color="rgba(55,120,255,0.5)"
            size={600}
            x="60%"
            y="50%"
            dur={9}
            delay={1.5}
          />
          <Orb
            color="rgba(130,60,255,0.45)"
            size={500}
            x="20%"
            y="55%"
            dur={11}
            delay={0.8}
          />
          <Orb
            color={accentRgba(accentColor, 0.3)}
            size={400}
            x="75%"
            y="-10%"
            dur={8}
            delay={2}
          />

          {/* ── Grid overlay ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
                        `,
              backgroundSize: "60px 60px",
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
                animation: `v3splashtwinkle ${s.d}s ease-in-out ${i * 0.15}s infinite`,
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
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Center content ── */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              padding: "0 24px",
              textAlign: "center",
            }}
          >
            {/* Avatar / logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: `2px solid ${accentColor}`,
                boxShadow: `0 0 0 6px ${accentRgba(accentColor, 0.15)}, 0 0 40px ${accentRgba(accentColor, 0.4)}`,
                background: `radial-gradient(circle at 35% 35%, ${accentRgba(accentColor, 0.35)}, transparent 70%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 8,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Rotating ring inside avatar */}
              <div
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: "50%",
                  background: `conic-gradient(from 0deg, transparent 60%, ${accentColor} 80%, transparent 100%)`,
                  animation: "v3gradrotate 2.5s linear infinite",
                  opacity: 0.8,
                }}
              />
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#fff",
                  position: "relative",
                  zIndex: 1,
                  letterSpacing: -0.5,
                }}
              >
                {name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
            </motion.div>

            {/* Eyebrow label */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={{ opacity: 0.55, letterSpacing: "0.18em" }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                color: "#fff",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                margin: 0,
                letterSpacing: "0.18em",
              }}
            >
              Portfolio · {new Date().getFullYear()}
            </motion.p>

            {/* Name */}
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(36px, 8vw, 72px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              <LetterReveal text={name} accent={accentColor} delay={0.45} />
            </h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.65, y: 0 }}
              transition={{
                delay: 0.45 + name.length * 0.04 + 0.15,
                duration: 0.5,
              }}
              style={{
                color: "#fff",
                fontSize: "clamp(14px, 2.5vw, 18px)",
                fontWeight: 400,
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              {role}
            </motion.p>

            {/* Progress section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              style={{
                marginTop: 32,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
              }}
            >
              {/* Ring with percentage */}
              <div style={{ position: "relative", width: 100, height: 100 }}>
                <ProgressRing progress={progress} accent={accentColor} />
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
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {Math.round(progress)}
                  </span>
                </div>
              </div>

              {/* Bar below ring */}
              <div
                style={{
                  width: "clamp(160px, 28vw, 280px)",
                  height: 3,
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${accentColor}, ${accentRgba(accentColor, 0.5)})`,
                    boxShadow: `0 0 10px ${accentColor}`,
                    width: progress + "%",
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <motion.p
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Loading...
              </motion.p>
            </motion.div>
          </div>

          {/* ── Bottom accent line ── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              style={{
                position: "absolute",
                ...pos,
                width: 20,
                height: 20,
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
