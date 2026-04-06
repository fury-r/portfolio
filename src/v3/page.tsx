import React, { useState, useEffect } from "react";
import { useV3ThemeContext } from "./context/ThemeContext/useContext";
import AnimatedBackground from "./components/AnimatedBackground";
import DesktopWindow from "./layouts/DesktopWindow";
import MobileLayout from "./layouts/MobileLayout";

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
