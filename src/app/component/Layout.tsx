import React from "react";
import { Globalstyle, Themebody } from "../context/component";
import MainFooter from "./Footer";
import Contact from "./Contact";
import { MainNavbar } from "./MainNavbar";
import { ThemeProvider } from "styled-components";
import { ModalPortal } from "./ModalPortal";
import { dark, light } from "../context/theme";
import { useThemeContext } from "../context/ThemeContext/useContext";
import { ModalProvider } from "../context/ModalContext/Provider";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { main } = useThemeContext();
  const themeMode = main === "DARK" ? dark : light;

  return (
    <ThemeProvider theme={themeMode}>
      <ModalProvider>
        <ModalPortal />
        <Globalstyle />
        <Themebody
          onScroll={(e: { currentTarget: { scrollTop: any } }) =>
            console.log(e.currentTarget.scrollTop)
          }
        >
          <MainNavbar />
          <div className="flex flex-col border-black min-h-screen ">
            <div className=""> {children}</div>

            <div className="">
              <Contact />
              <MainFooter />
            </div>
          </div>
        </Themebody>{" "}
      </ModalProvider>
    </ThemeProvider>
  );
};
