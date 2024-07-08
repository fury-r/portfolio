import { CustomThemeProvider } from "../context/ThemeContext/Provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Portfolio from "../page";
import Resume from "../resume/page";
import Project from "../projects/page";
import Contact from "../contact/page";
import { Routes } from "./path";
import Template from "../template";
import { GlobalStyle } from "../theme/GlobalStyle";
export const V2Router = () => {
  return (
    <CustomThemeProvider>
      <GlobalStyle />
      <RouterProvider
        router={createBrowserRouter([
          {
            path: Routes.about.path,
            element: (
              <Template>
                <Portfolio />
              </Template>
            ),
          },
          {
            path: Routes.skills.path,
            element: (
              <Template>
                <Portfolio />
              </Template>
            ),
          },
          {
            path: Routes.resume.path,
            element: (
              <Template>
                <Resume />
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
