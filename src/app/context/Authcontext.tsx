"use client";
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ToggleMode } from "./component";
import { dark, light } from "./theme";

const AuthContext = React.createContext<{
  stateChange: () => void;
  main: boolean;
  theme: any;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
}>({
  stateChange: () => {},
  main: false,
  theme: [],
  setTheme: Function,
});

export const ServerProvider = ({ children }: { children: ReactNode }) => {
  const [main, setMain] = useState(false);
  const [theme, setTheme] = useState(light);
  const { mode } = ToggleMode();
  useEffect(() => {
    setTheme(main ? dark : light);
  }, [mode]);

  const getThemeFromStorage = useCallback(async () => {
    const mode = await localStorage.getItem("theme_mode");
    setMain(mode === "dark");
    setTheme(mode === "dark" ? dark : light);
  }, [setMain]);

  useEffect(() => {
    getThemeFromStorage();
  }, [getThemeFromStorage]);

  const stateChange = useCallback(() => {
    localStorage.setItem("theme_mode", !main ? "dark" : "light");
    setTheme(!main ? dark : light);
    setMain(!main);
  }, [setTheme, setMain, main]);
  const value = {
    stateChange,
    main,
    theme,
    setTheme,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
