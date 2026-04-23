import React from "react";

export type ThemeMode = "DARK" | "LIGHT";

export interface V3ThemeContextType {
  mode: ThemeMode;
  accentColor: string;
  glassMode: boolean;
  toggleMode: () => void;
  setAccentColor: (color: string) => void;
  toggleGlassMode: () => void;
}

export const V3ThemeContext = React.createContext<V3ThemeContextType | null>(null);
