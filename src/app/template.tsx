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

export default function Template({ children }: { children: React.ReactNode }) {
  const { mode, mountedComponent } = ToggleMode();
  console.log("hello");

  const themeMode = mode === false ? dark : light;
  if (!mountedComponent) return <div />;
  return (
    <ServerProvider>
      <Layout>{children}</Layout>
    </ServerProvider>
  );
}
