"use client";
import React from "react";
import "./index.css";
import "./scss/react-bootstrap.scss";
// import AOS from "aos";

import { light, dark } from "./context/theme";
import { ToggleMode } from "./context/component";
import { Layout } from "./component/Layout";
import "./index.css";
import { CustomThemeProvider } from "./context/ThemeContext/Provider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export default function Template({ children }: { children: React.ReactNode }) {
  const { mode, mountedComponent } = ToggleMode();

  const _themeMode = mode === false ? dark : light;
  if (!mountedComponent) return <div />;

  return (
    <CustomThemeProvider>
      <div className="cursor"></div>
      <div className="cursor2"></div>
      <Layout>{children}</Layout>
      <ToastContainer />
    </CustomThemeProvider>
  );
}
