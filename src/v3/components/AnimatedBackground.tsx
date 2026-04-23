import React from "react";
import { accentRgba } from "../utils";

interface AnimatedBackgroundProps {
  accent: string;
  glassMode: boolean;
}

// Deterministic pseudo-random for stable starfield positions
function seededRnd(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const STAR_COUNT = 28;
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  x: seededRnd(i * 3 + 0) * 100,
  y: seededRnd(i * 3 + 1) * 100,
  size: seededRnd(i * 3 + 2) * 1.4 + 0.6,
  dur: 2.5 + seededRnd(i * 7) * 4.5,
  delay: seededRnd(i * 5 + 3) * 6,
}));

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  accent,
  glassMode,
}) => {
  const rgba = (a: number) => accentRgba(accent, a);
  const bA = glassMode ? 0.58 : 0.4;
  const bB = glassMode ? 0.35 : 0.2;
  const bC = glassMode ? 0.42 : 0.26;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
        contain: "strict",
      }}
    >
      {/* ── Aurora orbs ──────────────────────────────────────────────────── */}
      {/* Orb 1 — large main accent, top-left, wide ellipse */}
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          left: "-8%",
          top: "-6%",
          width: 700,
          height: 400,
          borderRadius: "58% 42% 55% 45% / 52% 48% 60% 40%",
          background: rgba(bA),
          filter: "blur(88px)",
          animation: "v3blob0 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Orb 2 — medium accent, top-right */}
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          right: "-4%",
          top: "-10%",
          width: 540,
          height: 300,
          borderRadius: "45% 55% 40% 60% / 50% 55% 45% 50%",
          background: rgba(bB),
          filter: "blur(72px)",
          animation: "v3blob1 34s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Orb 3 — blue-tinted aurora band, bottom-center */}
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          left: "22%",
          bottom: "-8%",
          width: 620,
          height: 360,
          borderRadius: "55% 45% 60% 40% / 48% 52% 40% 60%",
          background: `rgba(55,120,255,${glassMode ? 0.28 : 0.15})`,
          filter: "blur(82px)",
          animation: "v3blob2 30s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Orb 4 — violet aurora, right-bottom */}
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          right: "8%",
          bottom: "8%",
          width: 400,
          height: 260,
          borderRadius: "50% 50% 45% 55%",
          background: `rgba(130,70,255,${glassMode ? 0.24 : 0.13})`,
          filter: "blur(65px)",
          animation: "v3blob3 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Orb 5 — faint accent, center horizontal sweep */}
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          left: "28%",
          top: "12%",
          width: 500,
          height: 220,
          borderRadius: "50%",
          background: rgba(bC),
          filter: "blur(70px)",
          animation: "v3blob0 40s ease-in-out 6s infinite reverse",
          willChange: "transform",
        }}
      />
      {/* Orb 6 — teal hint, far left-bottom */}
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          left: "-5%",
          bottom: "15%",
          width: 340,
          height: 200,
          borderRadius: "60% 40%",
          background: `rgba(30,200,160,${glassMode ? 0.18 : 0.08})`,
          filter: "blur(58px)",
          animation: "v3blob1 26s ease-in-out 8s infinite reverse",
          willChange: "transform",
        }}
      />

      {/* ── Grid overlay ─────────────────────────────────────────────────── */}
      <div className="v3-grid" />

      {/* ── Starfield ────────────────────────────────────────────────────── */}
      {STARS.map((star) => (
        <div
          key={star.id}
          className="v3-star"
          style={{
            left: star.x + "%",
            top: star.y + "%",
            width: star.size,
            height: star.size,
            background: rgba(0.95),
            boxShadow: `0 0 ${star.size * 2.5}px ${rgba(0.7)}`,
            animation: `v3twinkle ${star.dur}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}

      {/* ── Glass caustic overlay ─────────────────────────────────────────── */}
      {glassMode && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            background: [
              "radial-gradient(ellipse 70% 55% at 20% 30%, " +
                rgba(0.14) +
                " 0%, transparent 60%)",
              "radial-gradient(ellipse 50% 65% at 75% 65%, " +
                rgba(0.1) +
                " 0%, transparent 55%)",
              "radial-gradient(ellipse 40% 30% at 50% 80%, rgba(55,120,255,0.07) 0%, transparent 50%)",
            ].join(", "),
            backgroundSize: "120% 120%",
            animation: "v3caustic 18s ease-in-out infinite",
            mixBlendMode: "screen",
            willChange: "background-position",
          }}
        />
      )}

      {/* ── SVG filter defs + iris orb (glass mode) ──────────────────────── */}
      {glassMode && (
        <>
          <svg
            style={{ position: "absolute", width: 0, height: 0 }}
            aria-hidden
          >
            <defs>
              <filter id="v3-iris" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="20" />
              </filter>
            </defs>
          </svg>
          <div
            style={{
              position: "absolute",
              width: 260,
              height: 260,
              top: "28%",
              left: "52%",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${rgba(0.24)} 0%, transparent 70%)`,
              filter: "url(#v3-iris)",
              animation: "v3irisglow 8s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
        </>
      )}
    </div>
  );
};

const AnimatedBackgroundMemo = React.memo(AnimatedBackground);
export default AnimatedBackgroundMemo;
