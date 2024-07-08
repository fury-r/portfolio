import StyledVariables from "./StyleVariables";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import 'aos/dist/aos.css';
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
${StyledVariables};
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--secondary);
    color: var(--color);

    .heading-point {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    font-size: clamp(26px, 5vw, var(--fz-heading));
    white-space: nowrap;
    text-decoration: underline var(--color);

    &:before {
      position: relative;
      bottom: 4px;
      margin-right: 10px;
      color: var(--shade);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-md), 3vw, var(--fz-xl));

      font-weight: 400;
      @media (max-width: 480px) {
        margin-bottom: -3px;
        margin-right: 5px;
      }
    }
  }

  :root{
    text-align: center;

  --dark:#1d1d1d;
  --dark-shadow:#222222;
  --light:#e0e0e0;
  --light-shadow:#ffffff;
    width: 100%;
    height: 100%;
    font-family: "Times New Roman", Times, serif, Inter, system-ui;

    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #040d12;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
}
.navbar-transparent{
    background-color: transparent;
    border:0;
    
    
} 


a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

html,
body {
  min-height: fit-content;
  min-width: 100%;
  height: fit-content;
  width: 100%;
  padding: 0;
  margin: 0;
  width: fit-content;
  height:fit-content;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background-color:#183D3D ;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.align-center-sm-device {
  @media (max-width: 740px) {
    justify-items: center;
    align-items: center;
  }
}

.font-sm {
  @media (max-width: 740px) {
    font-size: 15px;
  }
}
@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
.theme{
  background:#183D3D ;
}
.white-theme{
  background:#ffffff ;
}
.nav-text {
    display: block;
    padding: 15px;
    text-decoration: none;
    color:white;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 10px;
    position:relative;
    z-index: 1;
    
}




.nav-text {
  transition: all .3s ;
}
.effect-underline:after {
	content: '';
  position: absolute;
  left: 0;
  height: 1em;
  width: 100%;
  border-bottom: 1px solid;
  margin-top: 10px;
  opacity: 0;
	-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
	transition: opacity 0.35s, transform 0.35s;
	-webkit-transform: scale(0,1);
	transform: scale(0,1);
  color:white;
}

.effect-underline:hover:after {
  opacity: 1;
	-webkit-transform: scale(1);
	transform: scale(1);
}

.card-img:hover{
  animation: blur  1.5s forwards;
}

.typewriter  {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid black; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation: 
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
  font-family: inherit;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: black; }
}

.emmerse-effect{
  animation: emmerse ease 2s forwards;
}
@keyframes emmerse {
  0%{
    font-family: 'Poppins',sans-serif;
    font-size: 90px;
    text-shadow: none;
  }
  

}
.neuromorphic-select{
  color:whitesmoke;
  background-color: #1d1d1d;
  border:none;
  
  box-shadow:  -5px 5px 11px #151515,
  5px -5px 11px #252525;

} 
.neumorphic-text{
  font-family: 'Poppins',sans-serif;
  font-size: 90px;
  color: #1d1d1d;
  text-shadow:   -10px 5px 11px #151515,
    5px -8px 6px #252525;
}
 
  .nav-text:hover:after {
    opacity: 1;
    visibility: visible;
    height: 100%;
    
  }

  
.nav-toggle{
  color:whitesmoke;
  transition: all 1s;
}
.profile-text{
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 90px;
  // text-shadow: 0  5px 5px #3f3f3f, 0 5px 50px #4a4a4b;
  border-bottom: 0.5px solid whitesmoke;
}
.outer-neuromorphic{
  border-radius: 10px;
   justify-content: center;
  background: linear-gradient(45deg, #1a1a1a, #1f1f1f);
  box-shadow:  5px -5px 14px #191919,
               -5px 5px 14px #212121;
}
.neuromorphic-border{
  border-radius: 10px;
  width: 70%;
  box-shadow:  -10px -10px 20px #171717,
  10px 5px 20px #232323;
}
.neuromorphic-border-white{
  border-radius: 10px;
  width: 70%;
  color: #171717;
  box-shadow:  -10px -10px 20px #d6d6d6,
  10px 10px 20px #9c9c9c;
}
.neuromorphic-border-animation{

  animation: fade-border ease-in-out 1.4s forwards;
}
  
.neuromorphic-button{
  border: 0px solid #1d1d1d;
  outline: 0;
  padding:18px;
  border-radius: 8px;
  background: linear-gradient(225deg, #1a1a1a, #1f1f1f);

  box-shadow: 
  -5px -5px 18px #171717,
  5px 5px 18px #232323;
} 
.neuromorphic-button:hover{
  background-color:#1d1d1d ;
  border: 0;

}


.neuromorphic-border2{
  box-shadow:-1px -1px 3px 1px rgb(46, 46, 46);

}
.font-weight-bold{
  font-weight: 100px;
}
.neuromorphic-button:focus{
  background-color: #1d1d1d;
  
}

.animate-fade-in-top{
  animation: fade-in-top ease-in-out 1.4s forwards;

}
.animate-fade-in{
  animation: fade-in ease-in 1.5s forwards;


}

.animate-fade-in-right{
  animation: fade-right ease-in-out 2s backwards;


}

.animate-fade-in-left{
  animation: fade-left ease-in-out 2s backwards;


}
.animate-container{
  box-shadow: 0 0 5px 2px  #fff;
  transform: translateX(-10%) ;
  position: absolute;
  animation: 10s infinite alternate ease-in-out rotate;
}

.Anton{
  font-family: 'Oswald', sans-serif;
  letter-spacing: 1px;
  word-spacing: 0.5px;
  font-weight: -100px;
}
.footer{
  font-family: 'SF Mono','Fira Code','Fira Mono','Roboto Mono',monospace;
  
}
.glass-morphic{
  backdrop-filter: blur(16px) saturate(39%);
  -webkit-backdrop-filter: blur(16px) saturate(39%);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
}
@keyframes fade-border {
  0%{
    box-shadow: none;
  }

}
@keyframes fade-in {
  0%{
    opacity: 0%;
  }
}
@keyframes fade-in-top {
  0%{
    opacity: 0%;
    transform: translateY(-50%);
  }
  30%{
    opacity: 0%;

    transform: translateY(-20%);

  }
}


@keyframes fade-right {
  0%{
    opacity: 0%;
    transform: translateX(50%);
  }

}
@keyframes fade-left {
  0%{
    opacity: 0%;
    transform: translateX(-50%);
  }

}
@keyframes rotate {
  0%{
    transform: rotate(0deg);  
  }
  100%{
   transform: rotate(360deg);
  }
}


@keyframes blur {
  100%{
    background-color: white;
    opacity: 30%;
    filter: blur(10px);
  }
}



.arrow span{
    display: block;
    width: 30px;
    height: 30px;
    border-bottom: 5px solid ;
    border-right: 5px solid ;
    transform: rotate(45deg);
    margin: -10px;
    animation: animate 2s infinite;
}
.arrow span:nth-child(2){
    animation-delay: -0.2s;
}
.arrow span:nth-child(3){
    animation-delay: -0.4s;
}
@keyframes animate {
    0%{
        opacity: 0;
        transform: rotate(45deg) translate(-20px,-20px);
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 0;
        transform: rotate(45deg) translate(20px,20px);
    }
}





`;
