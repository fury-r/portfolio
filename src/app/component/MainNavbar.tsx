"use client";
import React, { useCallback, useState } from "react";
import {
  AnimatedStyledLabel,
  StyledButton,
  StyledLabel,
  StyledNavItem,
  StyledNavLink,
  StyledNavbar,
} from "../context/component";
import { FiSettings } from "react-icons/fi";
import { LuContact } from "react-icons/lu";
import { BiHomeAlt, BiInfoCircle, BiMoon, BiSun } from "react-icons/bi";
import { AiOutlineProject } from "react-icons/ai";
import { SiGradleplaypublisher } from "react-icons/si";

import { Nav, Navbar } from "react-bootstrap";
import { Routes } from "../Routes/routes";
import { useModalContext } from "../context/ModalContext";
import "../scss/navbar.css";
import { useAuth } from "../context/Authcontext";

const NAV_ITEMS: {
  title: string;
  icon: JSX.Element;
  routes: string;
}[] = [
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
    title: "Skills",
    icon: <FiSettings />,
    routes: Routes.skills.path,
  },
  {
    title: "Project",
    icon: <AiOutlineProject />,
    routes: Routes.project.path,
  },
  {
    title: "Publications",
    icon: <SiGradleplaypublisher />,
    routes: Routes.publications.path,
  },
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
  const [loading, setLoading] = useState(false);
  const { stateChange, main, theme } = useAuth();

  const handleScroll = useCallback(async () => {
    console.log("CALLING");
    const position = window.scrollY;
    if (scrollPosition <= position && open) {
      document.getElementById("nav")!.style.top = "0px";
    }
    if (scrollPosition != position) {
      if (position > scrollPosition || position == 0) {
        document.getElementById("nav")!.style.top = "-100px";
      } else {
        document.getElementById("nav")!.style.top = "0px";
      }
      setSrollPosition(position);
    }
  }, [window, scrollPosition]);

  window.addEventListener("scroll", handleScroll);
  const locationpath = location.pathname
    .split("/")
    .at(location.pathname.split("/").length - 1);
  console.log(locationpath?.length);
  return (
    <StyledNavbar
      collapseOnSelect
      fixed="top"
      expand="sm"
      variant="dark"
      data-bs-theme="dark"
      className={
        ` sticky-top w-full  ${window.scrollY > 1 ? "shadow-md " : ""} p-3 ` +
        (data !== null ? "z-0" : "z-10")
      }
      style={{
        backgroundColor: theme.secondaryColor,
      }}
      id="nav"
    >
      <Navbar.Brand href="#home">
        <StyledLabel>Rajeev Dessai</StyledLabel>
      </Navbar.Brand>

      <div className="flex items-center">
        <StyledButton
          className={
            "rounded-[30px] shadow-md h-9 w-9 self-center  me-2 " +
            (main ? "rotate-icon" : "rotate-icon")
          }
          onClick={() => stateChange()}
        >
          {main ? <BiSun /> : <BiMoon />}
        </StyledButton>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="border-none"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className={"nav-icon4 " + (open ? "  open " : "")}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Navbar.Toggle>
      </div>
      <Navbar.Collapse id="responsive-navbar-nav  ">
        <Nav
          className={open ? "" : " absolute right-6"}
          activeKey={location.pathname}
        >
          {NAV_ITEMS.map((value, index) => (
            <StyledNavItem
              key={index.toString()}
              background={open && "transparent"}
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
                  {value.icon}
                </div>
              </StyledNavLink>
            </StyledNavItem>
          ))}
        </Nav>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};
