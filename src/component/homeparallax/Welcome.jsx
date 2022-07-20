import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { SunspotLoader  } from "react-awesome-loaders";
import { arrow, ToggleMode } from "../../context/component";
const Welcome = () => {
    const [mode]=ToggleMode()
  return (
    <div id='#' className="  flex flex-col items-center justify-center min-h-screen border-10 border-red-400 ">
      <SunspotLoader         gradientColors={["grey", "black"]}
        shadowColor={"#3730A3"}/>
      <label className="text-2xl mt-32 animate-bounce">Under Development {"</>"}</label>
      <label className="text-2xl mt-32">Scroll Down</label>
      <arrow>
      <div className="arrow mt-10">
        <span></span>
        <span></span>
        <span></span>
      </div>
      </arrow>
    </div>
  );
};
export default Welcome;
