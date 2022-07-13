import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import MainRoute from './Routes/MainRoute';
import { HashRouter} from "react-router-dom";
import { ServerProvider } from './context/Authcontext';
import Scroll from './component/Scroll';
import App from './App';


ReactDOM.render(
  <App/>
, 
  document.getElementById('root') 
);