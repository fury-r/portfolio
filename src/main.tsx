import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./css/index.scss";
import App from "./App";
import { GlobalContextProvider } from "./context/GlobalContext/Provider";
import { ToastContainer } from "react-bootstrap";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      {/* <div className="h-full w-full"> */}
      <App />
      {/* </div> */}
    </GlobalContextProvider>
    <ToastContainer />
  </React.StrictMode>
);
