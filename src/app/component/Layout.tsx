import React, { useEffect, useState } from "react";
import { Globalstyle, Themebody } from "../context/component";
import MainFooter from "./Footer";
import Contact from "./Contact";
import { MainNavbar } from "./MainNavbar";
import { ThemeProvider } from "styled-components";
import { ModalPortal } from "./ModalPortal";
import { dark, light } from "../context/theme";
import { useThemeContext } from "../context/ThemeContext/useContext";
import { ModalProvider } from "../context/ModalContext/Provider";
import { Loader } from "./Loader";
import { usePathname } from "next/navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { main } = useThemeContext();
  const themeMode = main === "DARK" ? dark : light;
  const pathname = usePathname();
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
        <Globalstyle />
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
              <div className="flex flex-col border-black min-h-screen ">
                <div className=""> {children}</div>

                <div className="">
                  <Contact />
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
