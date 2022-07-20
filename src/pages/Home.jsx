import React from "react";
import Welcome from "../component/homeparallax/Welcome.jsx";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Introduction from "../component/homeparallax/Introduction.jsx";
import { ParallaxLayerTheme, ToggleMode } from "../context/component.js";
import Skills from "../component/homeparallax/Skills.jsx";
import { Image } from "react-bootstrap";
import python from "../assets/logo/python.png";
import js from "../assets/logo/javascript.png";
import Contact from "../component/homeparallax/Contact.jsx";

const Home = () => {
  return (
    <div className="border-2 border-transparent ">
      <ParallaxLayerTheme pages={4}>
        <ParallaxLayer offset={0} speed={2.5}>
          <Welcome />
        </ParallaxLayer>

        <ParallaxLayer offset={0.9} speed={0.5}>
          <Introduction />
        </ParallaxLayer>
        <ParallaxLayer offset={1.3} speed={0.5}>
          <Skills />
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0.5}>
          <Contact />
        </ParallaxLayer>
      </ParallaxLayerTheme>
    </div>
  );
};
export default Home;
