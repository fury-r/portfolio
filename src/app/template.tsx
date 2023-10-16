
'use client'
import React from "react"
import { ServerProvider } from "./context/Authcontext";
import { ThemeProvider } from "styled-components";
import "./index.css"
import "./scss/react-bootstrap.scss"
// import AOS from "aos";

import { light, dark } from "./context/theme";
import { Globalstyle, ToggleMode } from "./context/component"
import { Layout } from "./component/Layout";
import { MainNavbar } from "./component/MainNavbar";

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  const { mode, mountedComponent } = ToggleMode();
  console.log("hello")

  const themeMode = mode === false ? light : dark;
  if (!mountedComponent) return <div />;
  return (
    <html lang="en">
      <body>
      <ServerProvider>
          <ThemeProvider theme={themeMode}>
            <Globalstyle />
            <MainNavbar />

            <Layout>
        {children}
        </Layout>
          </ThemeProvider>
        </ServerProvider>

       
      </body>
    </html>
  )
}
