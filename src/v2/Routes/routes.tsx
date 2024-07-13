import { CustomThemeProvider } from "../context/ThemeContext/Provider";
import { Route, Routes } from "react-router-dom";
import Portfolio from "../page";
import Resume from "../resume/page";
import Project from "../projects/page";
import Contact from "../contact/page";
import { Routes as RoutePath } from "./path";
import Template from "../template";
import { GlobalStyle } from "../theme/GlobalStyle";
export const V2Router = () => {
  return (
    <CustomThemeProvider>
      <GlobalStyle />
      <Template>
        <Routes>
          <Route path={RoutePath.about.path} element={<Portfolio />} />
          <Route path={RoutePath.resume.path} element={<Resume />} />
          <Route path={RoutePath.project.path} element={<Project />} />
          <Route path={RoutePath.contact.path} element={<Contact />} />
        </Routes>
      </Template>
    </CustomThemeProvider>
  );
};
