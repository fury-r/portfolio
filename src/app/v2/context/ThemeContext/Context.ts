import { MODE } from "../../../../types/theme";
import React from "react";

export const ThemeContext = React.createContext<{
  stateChange: (mode: MODE) => void;
  mode: MODE;
  theme: any;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);
