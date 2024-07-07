import React from "react";
import PageLayout from "./components/Page/PageLayout";
import About from "./about/About";
import { DoingCards } from "./about/DoingCards";

const Portfolio = () => {
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

export default Portfolio;
