import { MainRoute } from "./Routes/MainRoute";
import { HashRouter } from "react-router-dom";
import { ServerProvider } from "./context/Authcontext";
import Scroll from "./component/Scroll";
import { ThemeProvider } from "styled-components";
import { Globalstyle, MainLayout, ToggleMode } from "./context/component";
import AOS from "aos";

import { light, dark } from "./context/theme";
import MainNavbar from "./component/Navbar";

const App = () => {
  const { mode, themeToggler, mountedComponent, theme } = ToggleMode();

  AOS.init();

  const themeMode = mode === false ? light : dark;
  if (!mountedComponent) return <div />;

  return (
    <>
      <HashRouter>
        <ServerProvider>
          <ThemeProvider theme={themeMode}>
            <Globalstyle />
            {/* <Scroll /> */}
            <MainLayout>
              <MainNavbar toggletheme={themeToggler} />

              <MainRoute />
            </MainLayout>
          </ThemeProvider>
        </ServerProvider>
      </HashRouter>
    </>
  );
};
export default App;
