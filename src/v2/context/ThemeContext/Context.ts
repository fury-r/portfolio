import { MODE, TColorTheme } from "../../../types/theme";
import React from "react";

export const ThemeContext = React.createContext<{
  stateChange: (mode: MODE) => void;
  mode: MODE;
  theme: TColorTheme;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
  setRounded: React.Dispatch<React.SetStateAction<number>>;
  isAnimationFinished: boolean;
  setIsAnimationFinished: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);
