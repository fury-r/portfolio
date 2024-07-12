import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../page";
import About from "../about/page";
import Project from "../projects/page";
import { Routes } from "./path";
import Template from "../template";
import Contact from "../contact/page";
import { CustomThemeProvider } from "../context/ThemeContext/Provider";
import Landing from "../../landing/Landing";
export const V1Router = () => {
  return (
    <CustomThemeProvider>
      <div className="cursor"></div>
      <div className="acursor2"></div>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: <Landing />,
          },
          {
            path: Routes.home.path,
            element: (
              <Template>
                <Home />
              </Template>
            ),
          },
          {
            path: Routes.about.path,
            element: (
              <Template>
                <About />
              </Template>
            ),
          },
          {
            path: Routes.project.path,
            element: (
              <Template>
                <Project />
              </Template>
            ),
          },

          {
            path: Routes.contact.path,
            element: (
              <Template>
                <Contact />
              </Template>
            ),
          },
        ])}
      />
    </CustomThemeProvider>
  );
};
