import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ScatterBoxLoader } from "react-awesome-loaders";
import { ToggleMode } from "../../context/component";
const Welcome = () => {
    const [mode]=ToggleMode()
  return (
    <div className="  flex flex-col items-center justify-center min-h-screen border-10 border-red-400 ">
      <ScatterBoxLoader primaryColor={"#FFFF"} background={mode?"#1d1d1d":'white'} />
      <label className="text-2xl mt-32">Scroll Down</label>
      <div className="arrow mt-10">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
export default Welcome;
