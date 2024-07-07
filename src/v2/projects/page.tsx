import React from "react";
import PageLayout from "../components/Page/PageLayout";
import ProjectView from "./ProjectView";

const Project = () => {
  return (
    <PageLayout
      title="My Projects"
      sections={[
        {
          component: <ProjectView />,
        },
      ]}
    />
  );
};

export default Project;
