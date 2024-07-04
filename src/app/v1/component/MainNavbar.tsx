"use client";
import React, { useCallback, useState } from "react";
import {
  AnimatedStyledLabel,
  StyledRoundedButton,
  StyledLabel,
  StyledNavItem,
  StyledNavLink,
  StyledNavbar,
} from "../context/component";
import { LuContact } from "react-icons/lu";
import { BiHomeAlt, BiInfoCircle, BiMoon, BiSun } from "react-icons/bi";
import { AiOutlineProject } from "react-icons/ai";

import { Nav, Navbar } from "react-bootstrap";
import { Routes } from "../Routes/routes";
import "../scss/navbar.css";
import { useTheme } from "styled-components";
import { useModalContext } from "../context/ModalContext/useContext";
import { useThemeContext } from "../context/ThemeContext/useContext";
import { TNavItem } from "../../../types/theme";

const NAV_ITEMS: TNavItem[] = [
  {
    title: "Home",
    icon: <BiHomeAlt />,
    routes: Routes.home.path,
  },
  {
    title: "About",
    icon: <BiInfoCircle />,
    routes: Routes.about.path,
  },
  {
    title: "Project",
    icon: <AiOutlineProject />,
    routes: Routes.project.path,
  },
  // {
  //   title: "Publications",
  //   icon: <SiGradleplaypublisher />,
  //   routes: Routes.publications.path,
  // },
  {
    title: "Contact",
    icon: <LuContact />,
    routes: Routes.contact.path,
  },
];
export const MainNavbar = () => {
  const { data } = useModalContext();
  const [scrollPosition, setSrollPosition] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { stateChange, main } = useThemeContext();
  const navbar = document.getElementById("nav");
  const handleScroll = useCallback(async () => {
    const position = window.scrollY;
    if (scrollPosition <= position && open) {
      navbar!.style.top = "0px";
    }
    if (scrollPosition != position) {
      if ((position > scrollPosition || position == 0) && navbar?.style.top) {
        navbar!.style.top = "-500px";
      } else if (navbar?.style.top) {
        navbar!.style.top = "0px";
      }
      setSrollPosition(position);
    }
  }, [scrollPosition, navbar, open]);

  window.addEventListener("scroll", handleScroll);
  const locationpath = location.pathname
    .split("/")
    .at(location.pathname.split("/").length - 1);

  return (
    <StyledNavbar
      collapseOnSelect
      fixed="top"
      expand="sm"
      data-bs-theme="dark"
      className={
        ` sticky-top w-full  ${window.scrollY > 1 ? "shadow-md " : ""} p-3 ` +
        (data !== null ? "z-0" : "z-10")
      }
      id="nav"
      style={{
        //@ts-ignore
        backgroundColor: theme.secondaryColor,
      }}
    >
      <Navbar.Brand href="/">
        <StyledLabel>Rajeev Dessai</StyledLabel>
      </Navbar.Brand>

      <div className="flex items-center">
        <StyledRoundedButton
          className={
            "rounded-[30px] shadow-md h-10 w-10 self-center  me-2  rotate-icon button flex justify-center items-center"
          }
          onClick={() => stateChange(main === "DARK" ? "LIGHT" : "DARK")}
        >
          {main === "DARK" ? (
            <BiSun color="white" />
          ) : (
            <BiMoon
              color="black
          "
            />
          )}
        </StyledRoundedButton>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="border-none"
          style={{
            border: "none",
          }}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className={"nav-icon4 " + (open ? "  open " : "")}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Navbar.Toggle>
      </div>
      <Navbar.Collapse id="responsive-navbar-nav   ">
        <Nav
          className={open ? "w-full" : " absolute right-6"}
          activeKey={location.pathname}
        >
          {NAV_ITEMS.map((value, index) => (
            <StyledNavItem
              key={index.toString()}
              background={open ? "transparent" : ""}
            >
              <StyledNavLink href={value.routes}>
                <div
                  className={
                    "flex   items-center " +
                    (open ? "justify-center" : "justify-between")
                  }
                >
                  <AnimatedStyledLabel
                    className={
                      "mr-2 " +
                      ((locationpath?.length === 0 &&
                        value.routes.split("/").filter((value) => value)
                          .length === 0) ||
                      (locationpath?.length !== 0 &&
                        value.routes.includes(locationpath || ""))
                        ? "active"
                        : "")
                    }
                  >
                    {value.title}
                  </AnimatedStyledLabel>
                  <StyledLabel>{value.icon}</StyledLabel>
                </div>
              </StyledNavLink>
            </StyledNavItem>
          ))}
        </Nav>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};
