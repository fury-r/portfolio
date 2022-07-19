import React from "react"
import Welcome from "../component/homeparallax/Welcome.jsx"
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Introduction from "../component/homeparallax/Introduction.jsx"
import { ParallaxLayerTheme, ToggleMode } from "../context/component.js"
import Skills from "../component/homeparallax/Skills.jsx"
const Home=()=>{

    return( 
        
        <div className="border-2 border-transparent ">
        
        <ParallaxLayerTheme pages={2}  >
            <ParallaxLayer offset={0} speed={2.5}> 
                <Welcome/>
            </ParallaxLayer>
            <ParallaxLayer offset={0.9} speed={0.5}>
                <Introduction/>
            </ParallaxLayer>
            <ParallaxLayer offset={1.2} speed={0.5}>
                <Skills/>
            </ParallaxLayer>
           </ParallaxLayerTheme>
        </div>
    )
}
export default Home