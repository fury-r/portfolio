import React from "react";
import ContentRouter from "../components/ContentRouter";
import MobileProfileHeader from "./MobileProfileHeader";
import MobileTabBar from "./MobileTabBar";

const MobileLayout: React.FC<{ basePath: string }> = ({ basePath }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
  >
    <MobileProfileHeader />
    <div
      style={{
        flex: 1,
        overflow: "auto",
        scrollBehavior: "smooth",
        overscrollBehavior: "contain",
      }}
    >
      <ContentRouter />
    </div>
    <MobileTabBar basePath={basePath} />
  </div>
);

export default MobileLayout;
