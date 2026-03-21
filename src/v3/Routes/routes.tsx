import { Routes, Route } from "react-router-dom";
import { V3ThemeProvider } from "../context/ThemeContext/Provider";
import V3Layout from "../page";

export const V3Router = () => {
  return (
    <V3ThemeProvider>
      <Routes>
        <Route path="/*" element={<V3Layout />} />
      </Routes>
    </V3ThemeProvider>
  );
};
