import MainRoute from './Routes/MainRoute';
import { HashRouter} from "react-router-dom";
import { ServerProvider } from './context/Authcontext';
import Scroll from './component/Scroll';
import { ThemeProvider } from 'styled-components';
import { Globalstyle, ToggleMode, } from './context/component';

import { lightmode,darkmode } from './context/theme';
import { useState } from 'react';
import MainNavbar from './component/navbar';
const App=()=>{
  const [mode, themeToggler, mountedComponent] = ToggleMode();


    const themeMode = mode === 'light' ? lightmode : darkmode;
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