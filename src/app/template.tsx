"use client";
import React from "react";
import { ServerProvider } from "./context/Authcontext";
import "./index.css";
import "./scss/react-bootstrap.scss";
// import AOS from "aos";

import { light, dark } from "./context/theme";
import { ToggleMode } from "./context/component";
import { Layout } from "./component/Layout";
import "./index.css";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Rajeev Dessai",
  description: "Test",
};

export default function Template({ children }: { children: React.ReactNode }) {
  const { mode, mountedComponent } = ToggleMode();

  const themeMode = mode === false ? dark : light;
  if (!mountedComponent) return <div />;
  return (
    <ServerProvider>
      <Layout>{children}</Layout>
    </ServerProvider>
  );
}
