import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { V3ThemeContext, ThemeMode } from "./Context";

const DEFAULT_ACCENT = "#FF9500";
const LS_MODE = "v3-theme-mode";
const LS_ACCENT = "v3-accent-color";
const LS_GLASS = "v3-glass-mode";

function applyTheme(mode: ThemeMode, accent: string, glass: boolean) {
  const root = document.documentElement;
  if (mode === "DARK") {
    if (glass) {
      root.style.setProperty("--v3-bg", "#010108");
      root.style.setProperty("--v3-bg2", "#04040e");
      root.style.setProperty("--v3-surface", "rgba(8,8,20,0.18)");
      root.style.setProperty("--v3-surface2", "rgba(14,14,28,0.22)");
      root.style.setProperty("--v3-border", "rgba(255,255,255,0.22)");
      root.style.setProperty("--v3-text", "#ffffff");
      root.style.setProperty("--v3-text2", "rgba(235,235,245,0.70)");
      root.style.setProperty("--v3-blur-amt", "28px");
      root.style.setProperty("--v3-window-bg", "rgba(5,5,14,0.14)");
      root.style.setProperty("--v3-window-border", "rgba(255,255,255,0.22)");
      root.style.setProperty("--v3-specular", "rgba(255,255,255,0.16)");
      // iOS 26 liquid glass — dark glass vars
      root.style.setProperty("--v3-liquid-surface", "rgba(255,255,255,0.08)");
      root.style.setProperty("--v3-liquid-border", "rgba(255,255,255,0.30)");
      root.style.setProperty("--v3-liquid-saturate", "200%");
      root.style.setProperty("--v3-liquid-brightness", "1.06");
    } else {
      root.style.setProperty("--v3-bg", "#050507");
      root.style.setProperty("--v3-bg2", "#0d0d14");
      root.style.setProperty("--v3-surface", "rgba(30,30,35,0.75)");
      root.style.setProperty("--v3-surface2", "rgba(45,45,52,0.80)");
      root.style.setProperty("--v3-border", "rgba(255,255,255,0.10)");
      root.style.setProperty("--v3-text", "#ffffff");
      root.style.setProperty("--v3-text2", "rgba(235,235,245,0.55)");
      root.style.setProperty("--v3-blur-amt", "28px");
      root.style.setProperty("--v3-window-bg", "rgba(18,18,24,0.78)");
      root.style.setProperty("--v3-window-border", "rgba(255,255,255,0.13)");
      root.style.setProperty("--v3-specular", "rgba(255,255,255,0.10)");
      // liquid glass vars (solid mode — not used but keep consistent)
      root.style.setProperty("--v3-liquid-surface", "rgba(30,30,35,0.75)");
      root.style.setProperty("--v3-liquid-border", "rgba(255,255,255,0.14)");
      root.style.setProperty("--v3-liquid-saturate", "200%");
      root.style.setProperty("--v3-liquid-brightness", "1.0");
    }
  } else {
    if (glass) {
      root.style.setProperty("--v3-bg", "#d8e4f4");
      root.style.setProperty("--v3-bg2", "#e4eef8");
      root.style.setProperty("--v3-surface", "rgba(255,255,255,0.20)");
      root.style.setProperty("--v3-surface2", "rgba(255,255,255,0.28)");
      root.style.setProperty("--v3-border", "rgba(255,255,255,0.60)");
      root.style.setProperty("--v3-text", "#1c1c1e");
      root.style.setProperty("--v3-text2", "rgba(60,60,67,0.72)");
      root.style.setProperty("--v3-blur-amt", "28px");
      root.style.setProperty("--v3-window-bg", "rgba(255,255,255,0.16)");
      root.style.setProperty("--v3-window-border", "rgba(255,255,255,0.60)");
      root.style.setProperty("--v3-specular", "rgba(255,255,255,0.50)");
      // iOS 26 liquid glass — light glass vars
      root.style.setProperty("--v3-liquid-surface", "rgba(255,255,255,0.28)");
      root.style.setProperty("--v3-liquid-border", "rgba(255,255,255,0.70)");
      root.style.setProperty("--v3-liquid-saturate", "200%");
      root.style.setProperty("--v3-liquid-brightness", "1.04");
    } else {
      root.style.setProperty("--v3-bg", "#f0f0f5");
      root.style.setProperty("--v3-bg2", "#e5e5ea");
      root.style.setProperty("--v3-surface", "rgba(255,255,255,0.75)");
      root.style.setProperty("--v3-surface2", "rgba(242,242,247,0.85)");
      root.style.setProperty("--v3-border", "rgba(0,0,0,0.07)");
      root.style.setProperty("--v3-text", "#1c1c1e");
      root.style.setProperty("--v3-text2", "rgba(60,60,67,0.55)");
      root.style.setProperty("--v3-blur-amt", "28px");
      root.style.setProperty("--v3-window-bg", "rgba(240,240,245,0.88)");
      root.style.setProperty("--v3-window-border", "rgba(0,0,0,0.12)");
      root.style.setProperty("--v3-specular", "rgba(255,255,255,0.65)");
      // liquid glass vars (solid mode)
      root.style.setProperty("--v3-liquid-surface", "rgba(255,255,255,0.80)");
      root.style.setProperty("--v3-liquid-border", "rgba(0,0,0,0.10)");
      root.style.setProperty("--v3-liquid-saturate", "200%");
      root.style.setProperty("--v3-liquid-brightness", "1.0");
    }
  }
  // Respect prefers-reduced-motion: cap blur to 28px so heavy glass mode
  // doesn't add rendering strain for users who prefer reduced motion.
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    root.style.setProperty("--v3-blur-amt", "28px");
  }

  root.style.setProperty("--v3-accent", accent);
  root.style.setProperty("--v3-accent-subtle", accent + "22");
  root.setAttribute("data-v3-glass", String(glass));
  root.setAttribute("data-v3-mode", mode.toLowerCase());
}

export const V3ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(
    () => (localStorage.getItem(LS_MODE) as ThemeMode) || "DARK",
  );
  const [accentColor, setAccentColorState] = useState<string>(
    () => localStorage.getItem(LS_ACCENT) || DEFAULT_ACCENT,
  );
  const [glassMode, setGlassModeState] = useState<boolean>(
    () => localStorage.getItem(LS_GLASS) === "true",
  );

  useEffect(() => {
    applyTheme(mode, accentColor, glassMode);
  }, [mode, accentColor, glassMode]);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === "DARK" ? "LIGHT" : "DARK";
      localStorage.setItem(LS_MODE, next);
      return next;
    });
  }, []);

  const setAccentColor = useCallback((color: string) => {
    localStorage.setItem(LS_ACCENT, color);
    setAccentColorState(color);
  }, []);

  const toggleGlassMode = useCallback(() => {
    setGlassModeState((prev) => {
      const next = !prev;
      localStorage.setItem(LS_GLASS, String(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      mode,
      accentColor,
      glassMode,
      toggleMode,
      setAccentColor,
      toggleGlassMode,
    }),
    [mode, accentColor, glassMode, toggleMode, setAccentColor, toggleGlassMode],
  );

  return (
    <V3ThemeContext.Provider value={value}>{children}</V3ThemeContext.Provider>
  );
};
