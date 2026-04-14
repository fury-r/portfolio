import React from "react";
import { PARTICLES } from "../constants";

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
  const bA = glassMode ? 0.65 : 0.48,
    bB = glassMode ? 0.4 : 0.25;
  const bC = glassMode ? 0.48 : 0.32,
    bD = glassMode ? 0.3 : 0.16;
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
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          left: "0%",
          top: "0%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: rgba(bA),
          filter: "blur(75px)",
          animation: "v3blob0 24s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          right: "2%",
          top: "-5%",
          width: 460,
          height: 460,
          borderRadius: "50%",
          background: rgba(bB),
          filter: "blur(65px)",
          animation: "v3blob1 30s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          left: "30%",
          bottom: "0%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: rgba(bC),
          filter: "blur(80px)",
          animation: "v3blob2 26s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        className="v3-blob"
        style={{
          position: "absolute",
          right: "25%",
          bottom: "20%",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: rgba(bD),
          filter: "blur(55px)",
          animation: "v3blob3 20s ease-in-out infinite",
          willChange: "transform",
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
            background: rgba(0.55),
            boxShadow: "0 0 " + p.s * 2 + "px " + rgba(0.4),
            animation:
              p.anim + " " + p.dur + "s ease-in-out " + p.del + "s infinite",
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* iOS 26 Liquid Glass: caustic mesh overlay */}
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
            ].join(", "),
            backgroundSize: "120% 120%",
            animation: "v3caustic 18s ease-in-out infinite",
            mixBlendMode: "screen",
            willChange: "background-position",
          }}
        />
      )}

      {/* SVG filter definitions — inert at 0x0 */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden>
        <defs>
          <filter id="v3-iris" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" />
          </filter>
        </defs>
      </svg>

      {/* Iris glow orb */}
      {glassMode && (
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "46%",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: rgba(0.18),
            filter: "url(#v3-iris)",
            animation: "v3irisglow 10s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 1,
            willChange: "transform, opacity",
          }}
        />
      )}
    </div>
  );
};

export default React.memo(AnimatedBackground);
