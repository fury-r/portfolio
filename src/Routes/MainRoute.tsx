import { Route, Routes } from "react-router-dom";
import { Routes as RoutePath } from "./routes";
import { About } from "../pages";
import { Projects } from "../pages";
import MainFooter from "../component/Footer";
import { Themebody } from "../context/component";

import "../scss/react-bootstrap.scss";
import CovidTracker from "../projects/covid_tracker";
import { Home } from "../pages";

const RouteWithLoader = ({ component: Component }: any) => {
  console.log(Component);
  return (
    <Themebody>
      <div className="min-h-screen flex flex-col justify-between ">
        <div className="h-3/4">{Component}</div>
        <div className="h-1/4">
          <MainFooter />
        </div>
      </div>
    </Themebody>
  );
};
export const MainRoute = () => (
  <Routes>
    <Route
      path={RoutePath.home.path}
      element={<RouteWithLoader component={<Home />} />}
    />
    <Route
      path={RoutePath.about.path}
      element={<RouteWithLoader component={<About />} />}
    />
    <Route
      path={RoutePath.project.path}
      element={<RouteWithLoader component={<Projects />} />}
    />
    <Route
      path={RoutePath.covidtracker.path}
      element={<RouteWithLoader component={<CovidTracker />} />}
    />
  </Routes>
);
