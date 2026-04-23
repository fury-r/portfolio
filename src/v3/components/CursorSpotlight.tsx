import React, { useEffect, useRef, useState } from "react";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";

interface CursorSpotlightProps {
  /** The element to track mouse events on */
  containerRef: React.RefObject<HTMLDivElement>;
}

/**
 * Trending 2025/26 cursor spotlight effect — a soft radial gradient
 * that follows the cursor inside the window, creating a "torchlight" feel.
 */
const CursorSpotlight: React.FC<CursorSpotlightProps> = ({ containerRef }) => {
  const { accentColor } = useV3ThemeContext();
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const animRef = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId: number;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      animRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPos({ ...animRef.current });
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(rafId);
      setPos(null);
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  if (!pos) return null;

  const hex = accentColor.length >= 7 ? accentColor : "#FF9500";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 4,
        overflow: "hidden",
        borderRadius: "inherit",
      }}
    >
      {/* Outer soft glow */}
      <div
        ref={divRef}
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          width: 700,
          height: 700,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle at center,
                        rgba(${r},${g},${b},0.06) 0%,
                        rgba(${r},${g},${b},0.025) 30%,
                        transparent 65%)`,
          pointerEvents: "none",
          willChange: "left, top",
        }}
      />
      {/* Inner tight spotlight */}
      <div
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          width: 200,
          height: 200,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle at center,
                        rgba(${r},${g},${b},0.10) 0%,
                        transparent 70%)`,
          pointerEvents: "none",
          willChange: "left, top",
        }}
      />
    </div>
  );
};

export default CursorSpotlight;
