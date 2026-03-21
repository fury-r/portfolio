import { useContext } from "react";
import { V3ThemeContext } from "./Context";

export const useV3ThemeContext = () => {
  const ctx = useContext(V3ThemeContext);
  if (!ctx) throw new Error("useV3ThemeContext must be used within V3ThemeProvider");
  return ctx;
};
