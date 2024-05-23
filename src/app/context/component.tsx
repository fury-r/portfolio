"use client";
import { useState, useEffect } from "react";
import {
  Card,
  Nav,
  Navbar,
  FloatingLabel,
  FloatingLabelProps,
} from "react-bootstrap";
import { createGlobalStyle } from "styled-components";
import DarkModeToggle from "react-dark-mode-toggle";
import styled from "styled-components";
import { func } from "prop-types";
import { light } from "./theme";

import { Parallax } from "@react-spring/parallax";
import React from "react";
import Link from "next/link";
import StyledVariables from "./StyleVariables";
import { BsPrefixRefForwardingComponent } from "react-bootstrap/esm/helpers";
type props = {
  theme: any;
};
interface StyledFloatingLabelProps
  extends BsPrefixRefForwardingComponent<"div", FloatingLabelProps> {
  color?: string;
}
export const Globalstyle = createGlobalStyle`
${StyledVariables};
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--secondary-color);
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
`;
export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
export const StyledButton = styled.button<{
  color?: string;
}>`
  color: var(--accent);
  background-color: var(--dark-accent);

  outline: 0;
  border: 0;
  padding: 10px;

  &:hover {
    border: none;
  }
  /* @keyframes ripple-effect {
    0% {
      box-shadow: 0px;
    }
    100% {
      box-shadow: ${({ theme }: props) => theme.buttonshadow};
    }
  } */
`;
export const StyledRoundedButton = styled.button`
  color: var(--color);

  outline: 0;
  border: 0;
  padding: 10px;
  background: var(--secondary-color);
  border-radius: 30px;

  &:hover {
    border: none;
  }
  /* @keyframes ripple-effect {
    0% {
      box-shadow: 0px;
    }
    100% {
      box-shadow: ${({ theme }: props) => theme.buttonshadow};
    }
  } */
`;
export const AnimatedButton = styled(StyledButton)`
  display: block;
  padding: 15px;
  text-decoration: none;
  color: var(--accent);
  font-weight: 600;
  text-transform: uppercase;

  position: relative;
  align-items: center;
  z-index: 1;
  &:hover {
    transform: scale(1.1);
  }
  .active {
    border-bottom: 1px solid #6e07f3;
  }

  .btn-three::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.3s;
  }
  .btn-three:hover::before {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
  .btn-three::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0.5);
    transform: scale(1.2, 1.2);
  }
  .btn-three:hover::after {
    opacity: 1;
    transform: scale(1, 1);
  }
`;
export const ThemeBorderContainer = styled.div`
  background-color: var(--secondary-color);
  text-decoration: none;
  border: 1px solid var(--primary-color);
`;

export const ThemeContainer = styled.div`
  background-color: var(--primary-color);
  text-decoration: none;
  position: relative;
  &:hover {
    opacity: 0.8;
    float: right;
  }
`;

export const StyledNavLink = styled<any>(Link)`
  display: block;
  padding: 15px;
  text-decoration: none;
  color: var(--accent);
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
  align-items: center;
  z-index: 1;
  &:hover {
    color: var(--accent);

    transform: scale(1.1);
  }
  .active {
    border-bottom: 1px solid var(--accent);
  }
`;

export const StyledNavItem = styled<any>(Nav.Item)`
  background-color: ${({ background }) =>
    background || ` var(--secondary-color)`};
  color: var(--color);
  border-radius: 10px;
  margin-right: 15px;
`;

export const StyledNavbar = styled<any>(Navbar)`
  color: var(--color);
`;

export const StyledText = styled<any>(FloatingLabel)`
  font-family: "Poppins", sans-serif;
  font-size: 90px;
  color: ${({ theme }: props) => theme.text_shadow};
  text-shadow: ${({ theme }: props) => theme.textshadow};
`;
export const StyledCard = styled<any>(Card)`
  border: none;
  width: 70%;
  color: ${({ theme }: props) => theme.theme_text};
  background: var(--secondary-color);
  box-shadow: ${({ theme }: props) => theme.bordershadow};
`;
export const StyledCard2 = styled<any>(Card)`
  color: var(--color);

  outline: 0;
  padding: 18px;
  border-radius: 8px;
  background: var(--secondary-color);

  &:hover {
    animation: ripple 1.4s ease forwards;
    color: var(--color);
  }
  @keyframes ripple {
    0% {
    }
    100% {
      box-shadow: ${({ theme }: props) => theme.buttonshadow};
    }
  }
`;

export const Label = styled.label`
  border-radius: 10px;
  background: var(--secondary-color);

  box-shadow: ${({ theme }: props) => theme.bordershadow};
`;
export const StyledAccentLabel = styled<any>(FloatingLabel)`
  font-family: "Poppins", sans-serif;
  color: var(--color);
`;

export const StyledLabel = styled<any>(FloatingLabel)`
  font-family: "Poppins", sans-serif;
  color: var(--color);
  @media (max-width: 740px) {
    font-size: 18px;
  }
`;

export const StyledBoldLabel = styled<any>(StyledLabel)`
  font-weight: bold;
`;
export const AnimatedStyledLabel = styled<StyledFloatingLabelProps>(
  FloatingLabel
)`
  font-family: "Poppins", sans-serif;
  font-size: var(--fz-md);
  color: ${({ color }) => (color ? color : "var(--color)")};
  text-transform: none;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 1px;
    background: ${({ color }) => (color ? color : "var(--color)")};
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;

    //transition: width .3s;
  }
  &:active::after {
    content: "";
    display: block;
    width: 0;
    height: 1px;
    background: ${({ color }) => (color ? color : "var(--color)")};
    width: 100%;
  }
`;
export const GlassContainer = styled.div`
  background-color: var(--secondary-color);
  border-radius: 15px;

  color: var(--color);
  padding: 10px;
  &:hover {
    animation: hoverAnimate 1s forwards;
  }
  @keyframes hoverAnimate {
    100% {
      border-radius: 20px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(19.6px);
      -webkit-backdrop-filter: blur(19.6px);
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
export const navLabel = styled.label`
  .effect-underline:after {
    content: "";
    position: absolute;
    left: 0;
    height: 1em;
    width: 100%;
    border-bottom: 1px solid;
    margin-top: 10px;
    opacity: 0;
    -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
    transition: opacity 0.35s, transform 0.35s;
    -webkit-transform: scale(0, 1);
    transform: scale(0, 1);
    color: var(--color);
  }

  .effect-underline:hover:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;
export const Arrow = styled.main`
  border-bottom: 5px solid ${({ theme }: props) => theme.theme_text};
  border-right: 5px solid ${({ theme }: props) => theme.theme_text};
`;
export const Themebody = styled.div<any>`
  height: 100%;
  width: 100%;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${({ theme }: props) => theme.theme_text};
  background: var(--secondary-color);
  transition: all 0.5s linear;
`;
export const ParallaxLayerTheme = styled<any>(Parallax)`
  background: var(--secondary-color);
`;

/* 
export const StyledNav=styled<any>(Nav)`

    `

export const StyledNavItem=styled<any>(Nav.Item)`
`

export const StyledNavlink=styled<any>(Nav.link)`
` */

export const ToggleMode = () => {
  const [mode, setMode] = useState(true); //true dark false light
  const [mountedComponent, setMountedComponent] = useState(false);
  const [main, setMain] = useState({});
  // const setTheme = (theme) => {
  //   localStorage.setItem("mode", theme);
  //   setMode(theme);
  // };
  const themeToggler = () => {
    setMode(!mode);
  };
  useEffect(() => {
    const localtheme = Boolean(localStorage.getItem("mode"));
    localtheme ? setMode(localtheme) : setMode(false);
    setMountedComponent(true);
    setMain(light);
  }, []);
  return { mode, themeToggler, mountedComponent, main };
};
export const Toggle = ({ Toggler }: any) => {
  const [isDark, setDark] = useState(true);

  useEffect(() => {
    const isMode = localStorage.getItem("mode");

    if (Boolean(isMode) === false) {
      setDark(false);
    }
  }, []);
  const ToggleTheme = () => {
    const isMode = localStorage.getItem("mode");
    if (isMode == null) {
      localStorage.setItem("mode", "false");
    } else if (Boolean(isMode) === true) {
      localStorage.setItem("mode", "false");
    } else {
      localStorage.setItem("mode", "true");
    }
    console.log(localStorage.getItem("mode"));
    setDark(!isDark);
    Toggler();
  };
  return <DarkModeToggle onChange={ToggleTheme} checked={isDark} size={40} />;
};
Toggle.propTypes = {
  Toggler: func.isRequired,
};
