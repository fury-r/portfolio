import React from "react";
import { PARTICLES } from "../constants";
import { V3_CSS } from "../utils";

interface AnimatedBackgroundProps {
  accent: string;
  glassMode: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  accent,
  glassMode,
}) => {
  const c = accent.length === 7 ? accent : "#FF9500";
  const hr = parseInt(c.slice(1, 3), 16),
    hg = parseInt(c.slice(3, 5), 16),
    hb = parseInt(c.slice(5, 7), 16);
  const rgba = (a: number) =>
    "rgba(" + hr + "," + hg + "," + hb + "," + a + ")";
  const bA = glassMode ? 0.72 : 0.55,
    bB = glassMode ? 0.48 : 0.3;
  const bC = glassMode ? 0.55 : 0.38,
    bD = glassMode ? 0.38 : 0.2;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: V3_CSS }} />
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          left: "0%",
          top: "0%",
          width: 680,
          height: 680,
          borderRadius: "50%",
          background: rgba(bA),
          filter: "blur(110px)",
          animation: "v3blob0 24s ease-in-out infinite",
        }}
      />
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          right: "2%",
          top: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: rgba(bB),
          filter: "blur(95px)",
          animation: "v3blob1 30s ease-in-out infinite",
        }}
      />
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          left: "30%",
          bottom: "0%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: rgba(bC),
          filter: "blur(120px)",
          animation: "v3blob2 26s ease-in-out infinite",
        }}
      />
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          right: "25%",
          bottom: "20%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: rgba(bD),
          filter: "blur(80px)",
          animation: "v3blob3 20s ease-in-out infinite",
        }}
      />
      <div className="v3-grid" />
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="v3-particle"
          style={{
            position: "absolute",
            left: p.x + "%",
            top: p.y + "%",
            width: p.s,
            height: p.s,
            borderRadius: "50%",
            background: rgba(0.6),
            boxShadow: "0 0 " + p.s * 3 + "px " + rgba(0.5),
            animation:
              p.anim + " " + p.dur + "s ease-in-out " + p.del + "s infinite",
          }}
        />
      ))}

      {/* ── iOS 26 Liquid Glass: caustic mesh overlay ── */}
      {glassMode && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            background: [
              "radial-gradient(ellipse 70% 55% at 20% 30%, " +
                rgba(0.18) +
                " 0%, transparent 60%)",
              "radial-gradient(ellipse 50% 65% at 75% 65%, " +
                rgba(0.14) +
                " 0%, transparent 55%)",
              "radial-gradient(ellipse 40% 35% at 55% 15%, rgba(255,255,255,0.06) 0%, transparent 50%)",
            ].join(", "),
            backgroundSize: "120% 120%",
            animation: "v3caustic 18s ease-in-out infinite",
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* ── iOS 26: SVG light-refraction filter definition ── */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden>
        <defs>
          <filter id="v3-refract" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.012"
              numOctaves="3"
              seed="8"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={glassMode ? "18" : "8"}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="v3-iris" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
        </defs>
      </svg>

      {/* ── iOS 26: iris glow orb follows accent ── */}
      {glassMode && (
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "46%",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: rgba(0.22),
            filter: "url(#v3-iris)",
            animation: "v3irisglow 10s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};

export default AnimatedBackground;
