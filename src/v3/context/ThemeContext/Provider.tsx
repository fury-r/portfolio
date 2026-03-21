import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { V3ThemeContext, ThemeMode } from "./Context";

const DEFAULT_ACCENT = "#FF9500";
const LS_MODE = "v3-theme-mode";
const LS_ACCENT = "v3-accent-color";

function applyTheme(mode: ThemeMode, accent: string) {
  const root = document.documentElement;
  if (mode === "DARK") {
    root.style.setProperty("--v3-bg", "#050507");
    root.style.setProperty("--v3-bg2", "#0d0d14");
    root.style.setProperty("--v3-surface", "rgba(30,30,35,0.75)");
    root.style.setProperty("--v3-surface2", "rgba(45,45,52,0.8)");
    root.style.setProperty("--v3-border", "rgba(255,255,255,0.1)");
    root.style.setProperty("--v3-text", "#ffffff");
    root.style.setProperty("--v3-text2", "rgba(235,235,245,0.55)");
  } else {
    root.style.setProperty("--v3-bg", "#f0f0f5");
    root.style.setProperty("--v3-bg2", "#e5e5ea");
    root.style.setProperty("--v3-surface", "rgba(255,255,255,0.75)");
    root.style.setProperty("--v3-surface2", "rgba(242,242,247,0.85)");
    root.style.setProperty("--v3-border", "rgba(0,0,0,0.07)");
    root.style.setProperty("--v3-text", "#1c1c1e");
    root.style.setProperty("--v3-text2", "rgba(60,60,67,0.55)");
  }
  root.style.setProperty("--v3-accent", accent);
  root.style.setProperty("--v3-accent-subtle", accent + "22");
}

export const V3ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(
    () => (localStorage.getItem(LS_MODE) as ThemeMode) || "DARK"
  );
  const [accentColor, setAccentColorState] = useState<string>(
    () => localStorage.getItem(LS_ACCENT) || DEFAULT_ACCENT
  );

  useEffect(() => {
    applyTheme(mode, accentColor);
  }, [mode, accentColor]);

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

  const value = useMemo(
    () => ({ mode, accentColor, toggleMode, setAccentColor }),
    [mode, accentColor, toggleMode, setAccentColor]
  );

  return (
    <V3ThemeContext.Provider value={value}>{children}</V3ThemeContext.Provider>
  );
};
