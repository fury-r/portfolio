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

export type MODE = "DARK" | "LIGHT";
const AuthContext = React.createContext<{
  stateChange: (mode: MODE) => void;
  main: MODE;
  theme: any;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
}>({
  stateChange: () => {},
  main: "LIGHT",
  theme: [],
  setTheme: Function,
});

export const ServerProvider = ({ children }: { children: ReactNode }) => {
  const [main, setMain] = useState<MODE>("DARK");
  const [theme, setTheme] = useState(dark);
  const { mode } = ToggleMode();
  useEffect(() => {
    setTheme(main === "DARK" ? dark : light);
  }, [main]);

  const getThemeFromStorage = useCallback(async () => {
    const mode = await localStorage.getItem("theme_mode");
    if (mode) {
      setMain(mode as MODE);
      setTheme(mode === "DARK" ? dark : light);
    }
  }, [setMain]);

  useEffect(() => {
    getThemeFromStorage();
  }, [getThemeFromStorage]);

  const stateChange = useCallback(
    (mode: MODE) => {
      localStorage.setItem("theme_mode", mode);
      setMain(mode);
    },
    [setTheme, setMain, main]
  );
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
