'use client'
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ToggleMode } from "./component";
import { dark, light } from "./theme";

const AuthContext = React.createContext<{
  stateChange: () => void;
  main: boolean;
  theme: any;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);


export const ServerProvider = ({ children }: { children: ReactNode }) => {
  const [main, setMain] = useState(false);
  const [theme, setTheme] = useState({});
  const { mode } = ToggleMode();
  useEffect(() => {
    setTheme(mode ? dark : light);
    //@ts-nocheck
  }, [mode]);
  const stateChange = () => {
    setMain(!main);
  };
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
