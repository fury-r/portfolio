import MainRoute from './Routes/MainRoute';
import { HashRouter} from "react-router-dom";
import { ServerProvider, useAuth } from './context/Authcontext';
import Scroll from './component/Scroll';
import { ThemeProvider } from 'styled-components';
import { Globalstyle, ToggleMode, } from './context/component';
import AOS from 'aos';

import { light,dark } from './context/theme';
import { useState } from 'react';
import MainNavbar from './component/navbar';
const App=()=>{
  const [mode, themeToggler, mountedComponent,theme] = ToggleMode();

  AOS.init()

    const themeMode = mode === false ? light : dark;
    if(!mountedComponent) return <div/>

    return(<>
      <HashRouter>
      <ServerProvider>
      <ThemeProvider theme={themeMode}>
    <Globalstyle/>
  <Scroll/>
  <MainNavbar toggletheme={themeToggler} />

  <MainRoute/>
  </ThemeProvider>
</ServerProvider>
  </HashRouter>
    </>)
}
export default App;