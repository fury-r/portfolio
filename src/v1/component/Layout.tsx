import React, { useEffect, useState } from "react";
import { Themebody } from "../context/component";
import { GlobalStyle } from "../context/GlobalStyle";

import MainFooter from "./Footer";
import { MainNavbar } from "./MainNavbar";
import { ThemeProvider } from "styled-components";
import { ModalPortal } from "./ModalPortal";
import { dark, light } from "../context/theme";
import { useThemeContext } from "../context/ThemeContext/useContext";
import { ModalProvider } from "../context/ModalContext/Provider";
import { Loader } from "../../components/Loader";
import SocialFooter from "../../components/SocialFooter/SocialFooter";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { main } = useThemeContext();
  const themeMode = main === "DARK" ? dark : light;
  const pathname = location.pathname;
  const [splash, setSplash] = useState(pathname.length > 1);

  useEffect(() => {
    let interval;
    if (!splash) {
      interval = setTimeout(() => {
        console.log("true");
        setSplash(true);
      }, 1000);
    }
    if (splash && interval) {
      clearInterval(interval);
    }
  }, [setSplash, splash]);
  return (
    <ThemeProvider theme={themeMode}>
      <ModalProvider>
        <ModalPortal />
        <GlobalStyle />
        <Themebody
          onScroll={(e: { currentTarget: { scrollTop: any } }) =>
            console.log(e.currentTarget.scrollTop)
          }
        >
          {!splash ? (
            <Loader />
          ) : (
            <div className="flex-1">
              <MainNavbar />
              <div className="flex flex-col border-black min-h-screen w-full ">
                <div className=" w-full p-3"> {children}</div>

                <div className=" w-full">
                  <SocialFooter />
                  <MainFooter />
                </div>
              </div>
            </div>
          )}
        </Themebody>
      </ModalProvider>
    </ThemeProvider>
  );
};
