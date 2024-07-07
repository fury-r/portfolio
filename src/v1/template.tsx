import React from "react";
// import AOS from "aos";
// import AOS from "aos";

import "react-toastify/dist/ReactToastify.css";

import { ToggleMode } from "./context/component";
import { Layout } from "./component/Layout";
export default function Template({ children }: { children: React.ReactNode }) {
  const { mountedComponent } = ToggleMode();

  // const _themeMode = mode === false ? dark : light;
  if (!mountedComponent) return <div />;

  return <Layout>{children}</Layout>;
}
