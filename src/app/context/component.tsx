'use client'
import { useState, useEffect } from "react";
import { Card, Button, Nav, Navbar, FloatingLabel } from "react-bootstrap";
import {  createGlobalStyle } from "styled-components";
import DarkModeToggle from "react-dark-mode-toggle";
import styled from "styled-components";
import { func } from "prop-types";
import { dark, light } from "./theme";

import { Parallax } from "@react-spring/parallax";
import React from "react";
import Link from "next/link";
type props = {
  theme: any;

};
export const Globalstyle = createGlobalStyle`
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${({ theme }: props) => theme.background_color};
    color: ${({ theme }: props) => theme.color};
`;
export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
export const StyledButton = styled<any>(Button)`
  color: ${({ theme }: props) => theme.color};

  outline: 0;
  padding: 18px;
  border-radius: 8px;
  background: ${({ theme }: props) => theme.background};

  &:hover {
    animation: ripple-effect 1.4s ease forwards;
    color: ${({ theme }: props) => theme.color};
  }
  @keyframes ripple-effect {
    0% {
      box-shadow: 0px;
    }
    100% {
      box-shadow: ${({ theme }: props) => theme.buttonshadow};
    }
  }
`;
export const StyledNavLink = styled<any>(Link)`
  display: block;
  padding: 15px;
  text-decoration: none;
  color: ${({ theme }: props) => theme.theme_text};
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 10px;
  position: relative;
  z-index: 1;
  &:hover {
    color: ${({ theme }: props) => theme.theme_text};

    transform: scale(1.1);
  }
`;

export const StyledNavItem = styled<any>(Nav.Item)`

    &:hover{
      animation: ripple1 1.4s ease forwards ;
      background-color:transparent;
      color: ${({ theme }: props) => theme.theme_text};

    }
    @keyframes ripple1 {
  0%{
    border-radius: 100%;

   }
  100%{
    border-radius: 10px;
    box-shadow:  ${({ theme }: props) => theme.bordershadow};
    }
  }
`;

export const StyledNavbar = styled<any>(Navbar)`
  background: ${({ theme }: props) => theme.background_color};
  color: ${({ theme }: props) => theme.color};
`;

export const StyledText = styled<any>(FloatingLabel)`
  font-family: 'Poppins',sans-serif;
  font-size: 90px;
  color: ${({ theme }: props) => theme.text_shadow};
  text-shadow: ${({ theme }: props) => theme.textshadow};


`;
export const StyledCard = styled<any>(Card)`
  border: none;
  width: 70%;
  color: ${({ theme }: props) => theme.theme_text};
  background: ${({ theme }: props) => theme.background};
  box-shadow: ${({ theme }: props) => theme.bordershadow};
`;
export const StyledCard2 = styled<any>(Card)`
  color: ${({ theme }: props) => theme.color};

  outline: 0;
  padding: 18px;
  border-radius: 8px;
  background: ${({ theme }: props) => theme.background};

  &:hover {
    animation: ripple 1.4s ease forwards;
    color: ${({ theme }: props) => theme.color};
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
  background: ${({ theme }: props) => theme.background};

  box-shadow: ${({ theme }: props) => theme.bordershadow};
`;
export const StyledLabel = styled<any>(FloatingLabel)`
  font-family: "Poppins", sans-serif;
  color: ${({ theme }: props) => theme.color};
  text-transform: none;
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
    color: ${({ theme }: props) => theme.color};
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
export const Themebody = styled.main<any>`
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${({ theme }: props) => theme.theme_text};
  background: ${({ theme }: props) => theme.background_color};
  transition: all 0.5s linear;
`;
export const ParallaxLayerTheme = styled<any>(Parallax)`
  background: ${({ theme }: props) => theme.background_color};
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
    localtheme ? setMode(localtheme) : setMode(true);
    setMountedComponent(true);
    setMain(localtheme ? dark : light);
  }, []);
  return { mode, themeToggler, mountedComponent, main };
};
export const Toggle = ({ Toggler }:any) => {
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
