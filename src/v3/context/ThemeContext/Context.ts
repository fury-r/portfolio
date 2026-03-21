import React from "react";

export type ThemeMode = "DARK" | "LIGHT";

export interface V3ThemeContextType {
  mode: ThemeMode;
  accentColor: string;
  toggleMode: () => void;
  setAccentColor: (color: string) => void;
}

export const V3ThemeContext = React.createContext<V3ThemeContextType | null>(null);
