import { ReactNode, useState, useEffect, useCallback, useMemo } from "react";
import { MODE } from "../../../types/theme";
import { ThemeContext } from "./Context";
import { dark, light } from "../../theme/themes";
import { ThemeProvider } from "styled-components";

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<MODE>("DARK");
  const [theme, setTheme] = useState(dark);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  const [rounded, setRounded] = useState(20);
  useEffect(() => {
    setTheme(mode === "DARK" ? dark : light);
  }, [mode]);
  useEffect(() => {
    setMode((localStorage.getItem("themeMode") as MODE) || "DARK");
  }, []);

  const getThemeFromStorage = useCallback(async () => {
    const mode = localStorage.getItem("themeMode");
    if (mode) {
      setMode(mode as MODE);
      setTheme(mode === "DARK" ? dark : light);
    }
  }, [setMode, setTheme]);

  useEffect(() => {
    getThemeFromStorage();
  }, [getThemeFromStorage]);

  const stateChange = useCallback(
    (mode: MODE) => {
      console.log(mode);
      localStorage.setItem("themeMode", mode);
      setMode(mode);
    },
    [setMode]
  );
  const value = useMemo(
    () => ({
      stateChange,
      mode,
      theme: {
        ...theme,
        rounded: `${rounded}px`,
      },
      setTheme,
      setRounded,
      isAnimationFinished,
      setIsAnimationFinished,
    }),
    [isAnimationFinished, mode, rounded, stateChange, theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={value.theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
