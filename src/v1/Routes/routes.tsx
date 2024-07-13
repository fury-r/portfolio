import { Route, Routes } from "react-router-dom";
import Home from "../page";
import About from "../about/page";
import Project from "../projects/page";
import { Routes as RoutePath } from "./path";
import Template from "../template";
import Contact from "../contact/page";
import { CustomThemeProvider } from "../context/ThemeContext/Provider";
export const V1Router = () => {
  return (
    <CustomThemeProvider>
      <div className="cursor"></div>
      <div className="acursor2"></div>
      <Template>
        <Routes>
          <Route path={RoutePath.home.path} element={<Home />} />
          <Route path={RoutePath.about.path} element={<About />} />
          <Route path={RoutePath.project.path} element={<Project />} />
          <Route path={RoutePath.contact.path} element={<Contact />} />
        </Routes>
      </Template>
    </CustomThemeProvider>
  );
};
