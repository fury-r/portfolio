import Welcome from "../component/homeparallax/Welcome.jsx";
import { ParallaxLayer } from "@react-spring/parallax";
import Introduction from "../component/homeparallax/Introduction.jsx";
import { ParallaxLayerTheme } from "../context/component.js";
import Skills from "../component/homeparallax/Skills.jsx";
import Contact from "../component/homeparallax/Contact.jsx";

export const Home = () => {
  return (
    <div className="border-2 border-transparent ">
      <Welcome />

      <Introduction />
      <Skills />

      <Contact />
    </div>
  );
};
