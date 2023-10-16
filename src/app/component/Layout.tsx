import React from "react";
import { Themebody } from "../context/component";
import MainFooter from "./Footer";
import Contact from "./Contact";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Themebody>
      <div className="min-h-screen flex flex-col ">
        <div className="h-3/4">{children}</div>
     

        <div className="h-1/4">
        <Contact/>
          <MainFooter />
        </div>
      </div>
    </Themebody>
  );
};
