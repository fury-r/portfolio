"use client";
import React from "react";
// import "./scss/react-bootstrap.scss";
// // import AOS from "aos";
// import "./scss/react-bootstrap.scss";
// import AOS from "aos";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CustomThemeProvider } from "./context/ThemeContext/Provider";
import { Layout } from "./components/Layout";
import { GlobalStyle } from "./theme";
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <CustomThemeProvider>
      <GlobalStyle />
      <Layout>{children}</Layout>
      <ToastContainer />
    </CustomThemeProvider>
  );
}
