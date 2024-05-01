import { ReactNode, useState, useEffect, useCallback } from "react";
import { ThemeContext } from "styled-components";
import { ToggleMode } from "../component";
import { dark, light } from "../theme";
import { MODE } from "../../types/theme";

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [main, setMain] = useState<MODE>("DARK");
  const [theme, setTheme] = useState(dark);
  const { mode: _mode } = ToggleMode();
  useEffect(() => {
    setTheme(main === "DARK" ? dark : light);
  }, [main]);

  const getThemeFromStorage = useCallback(async () => {
    const mode = await localStorage.getItem("theme_mode");
    if (mode) {
      setMain(mode as MODE);
      setTheme(mode === "DARK" ? dark : light);
    }
  }, [setMain, setTheme]);

  useEffect(() => {
    getThemeFromStorage();
  }, [getThemeFromStorage]);

  const stateChange = useCallback(
    (mode: MODE) => {
      localStorage.setItem("theme_mode", mode);
      setMain(mode);
    },
    [setMain]
  );
  const value = {
    stateChange,
    main,
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
