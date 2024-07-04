"use client";
import React from "react";
import PageLayout from "./components/Page/PageLayout";
import About from "./about/About";
import { DoingCards } from "./about/DoingCards";

export const PortfolioV2 = () => {
  return (
    <div>
      <PageLayout
        title="About Me"
        sections={[
          {
            component: <About />,
          },
          {
            title: "What I am doing",
            component: <DoingCards />,
          },
        ]}
      />
    </div>
  );
};

export default PortfolioV2;
