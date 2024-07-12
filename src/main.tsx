import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./css/index.scss";
import App from "./App";
import { GlobalContextProvider } from "./context/GlobalContext/Provider";
import "react-toastify/dist/ReactToastify.css";
import { DataContextProvider } from "./context/DataContext/Provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      {/* <div className="h-full w-full"> */}
      <DataContextProvider>
        <App />
      </DataContextProvider>
      {/* </div> */}
    </GlobalContextProvider>
  </React.StrictMode>
);
