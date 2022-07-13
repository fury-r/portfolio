import { Card,Button, Nav, Navbar,  Image, FloatingLabel,
} from "react-bootstrap";
import { Card as MUICard} from '@mui/material';
import { createGlobalStyle} from "styled-components"
import DarkModeToggle from "react-dark-mode-toggle";
import { useState,useEffect } from "react";
import styled from "styled-components"
import Tilty from "react-tilty";
import { func } from "prop-types";

export const Globalstyle=createGlobalStyle`
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: ${({ theme }) => theme.background_color};
    color: ${({ theme }) => theme.color};
`

export const NeuromorphicButton=styled(Button)`
border: 0px solid #1d1d1d;
color: ${({theme})=>theme.color};

outline: 0;
padding:18px;
border-radius: 8px;
background: ${({theme})=>theme.background};

box-shadow:  ${({theme})=>theme.buttonshadow};

`
export const NueromorphicNavLink=styled(Nav.Link)`
    display: block;
    padding: 15px;
    text-decoration: none;
    color:${({theme})=>theme.theme_text};
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 10px;
    position:relative;
    z-index: 1;
  &:hover{
    color:${({theme})=>theme.theme_text};

  transform:scale(1.1);
  }

`
export const NueromorphicNavItem=styled(Nav.Item)`
    &:hover{
      animation: ripple-effect 1.4s ease forwards ;

    }
    @keyframes ripple-effect {
  0%{
    border-radius: 100%;

   }
  100%{
    border-radius: 10px;
    box-shadow:  ${({theme})=>theme.buttonshadow};
  }
}
`
export const NeuroNavbar=styled(Navbar)`
  background: ${({ theme }) => theme.background_color};
  color: ${({theme})=>theme.color};

`

export const NeuromorphicText=styled(FloatingLabel)
`
  font-family: 'Poppins',sans-serif;
  font-size: 90px;
  color: ${({theme})=>theme.text_shadow};
  text-shadow: ${({theme})=>theme.textshadow};

}
`
export const NeuromorphicCard=styled(Card)`
border-radius: 10px;
border:none;
width: 70%;
color: ${({theme})=>theme.theme_text};
background: ${({theme})=>theme.background};
box-shadow:  ${({theme})=>theme.bordershadow};

`
export const NeuromorphicCard2=styled(Card)`
border-radius: 10px;
border:none;
width:70%;
color: ${({theme})=>theme.theme_text};
background: ${({theme})=>theme.background};
box-shadow: ${({theme})=>theme.bordershadow};

` 
export const NeuromorphicImage=styled(Image)`
  border-radius: 10px;
  width: 70%;
  background: ${({theme})=>theme.theme_color};
  box-shadow:   ${({theme})=>theme.image};
`

export const Label=styled.label`
  border-radius: 10px;
  background: ${({theme})=>theme.background};

  box-shadow:  ${({theme})=>theme.bordershadow};
 
`
export const NeuroLabel=styled(FloatingLabel)`
  font-family: 'Poppins',sans-serif;
  font-size: 90px;
  color: ${({theme})=>theme.background_color};
  text-shadow: ${({theme})=>theme.textshadow}

`
export const navLabel=styled.label`
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
  color: ${({theme})=>theme.color};
}

.effect-underline:hover:after {
  opacity: 1;
	-webkit-transform: scale(1);
	transform: scale(1);
}

`
export const Themebody=styled.main`
 margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${({theme})=>theme.theme_text};
  background: ${({theme})=>theme.background_color};
  transition: all 0.50s linear;

`

/* 
export const NeuroNav=styled(Nav)`

    `

export const NeuroNavItem=styled(Nav.Item)`
`

export const NeuroNavlink=styled(Nav.link)`
` */

export const ToggleMode=()=>{
  const [mode,setMode]=useState('dark')
  const [mountedComponent, setMountedComponent] = useState(false)

  const setTheme=theme=>{
  localStorage.setItem('mode',theme)
  setMode(theme)
  }
  const themeToggler=()=>{
    mode==='light'?setMode('dark'):setMode('light')
  }
  useEffect(()=>{
    const localtheme=localStorage.getItem('mode')
    localtheme?setMode(localtheme):setMode('dark')
    setMountedComponent(true)
  },[])
  return [mode,themeToggler,mountedComponent]
}
export const Toggle=({Toggler})=>{
  const [isDark, setDark] = useState(true);
  useEffect(() => {
    if(localStorage.getItem('mode')==='light'){
      setDark(false)}

    else if(localStorage.getItem('mode')==='dark'){
       setDark(true)
    }
    }, [])
  const ToggleTheme=()=>{
    if(localStorage.getItem('mode')==null){
      localStorage.setItem('mode','light')
    }
    else if(localStorage.getItem('mode') ==='dark'){
      localStorage.setItem('mode','light')
    }
    else{
      localStorage.setItem('mode','dark')

    }
    console.log(localStorage.getItem('mode'))
    setDark(!isDark)
    Toggler()
  }
  return(
    <>
                <DarkModeToggle
      onChange={ToggleTheme}
      checked={isDark}
      size={40}
    />    </>
  )

}
Toggle.propTypes={
  Toggler:func.isRequired
}