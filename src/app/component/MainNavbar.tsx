'use client'
import React from "react";
import {
  AnimatedStyledLabel,
  StyledNavItem,
  StyledNavLink,
  StyledNavbar,
} from "../context/component";
import { FiSettings } from "react-icons/fi";
import { LuContact } from "react-icons/lu";
import { BiHomeAlt, BiInfoCircle } from "react-icons/bi";
import { AiOutlineProject } from "react-icons/ai";
import { FaCaretDown } from "react-icons/fa";

import { Navbar} from "react-bootstrap";
import { Routes } from "../Routes/routes";

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
    title: "Contact",
    icon: <LuContact />,
    routes: Routes.contact.path,
  },
];

export const MainNavbar = () => {
  return (
    <StyledNavbar
      collapseOnSelect
      color="faded"
      fixed="top"
      expand="sm"
      variant="white"
      className="justify-content-end sticky-top w-full"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav">
        <FaCaretDown />
      </Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav " className="flex justify-end">
        <div className="flex w-6/12 ">
          {NAV_ITEMS.map((value, index) => (
            <StyledNavItem key={index.toString()}>
              <StyledNavLink href={value.routes}>
                <div className="flex  justify-between items-center">
                  <AnimatedStyledLabel className="mr-2">{value.title}</AnimatedStyledLabel>
                  {value.icon}
                </div>
              </StyledNavLink>
            </StyledNavItem>
          ))}
        </div>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};
