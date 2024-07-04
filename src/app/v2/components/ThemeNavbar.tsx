"use client";
import React from "react";
import { LuContact } from "react-icons/lu";
import { BiInfoCircle } from "react-icons/bi";
import { AiOutlineProject } from "react-icons/ai";
import { TNavItem } from "../../../types/theme";
import { Routes } from "../Routes/routes";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const NAV_ITEMS: TNavItem[] = [
  {
    title: "About",
    icon: <BiInfoCircle />,
    routes: Routes.about.path,
  },
  {
    title: "Resume",
    icon: <BiInfoCircle />,
    routes: Routes.resume.path,
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

const StyledNavbar = styled(Navbar)`
  background-color: var(--darkAccent);
  border: 1px solid var(--primary);
  border-radius: 0 var(--rounded) 0 var(--rounded);

  backdrop-filter: blur(5px);
  @media (max-width: 748px) {
    border-radius: var(--rounded) var(--rounded) 0 0;
  }
  font-size: 15px;
  font-weight: 500;
  .active {
    color: var(--accent);
    font-weight: 600;
  }
`;

export const ThemeNavbar = () => {
  return (
    <StyledNavbar
      collapseOnSelect
      fixed="top"
      expand="sm"
      data-bs-theme="dark"
      className={` flex flex-row md:sticky-top w-1/2   max-md:bottom-[-5px]   max-md:fixed max-md:w-screen z-20 relative`}
      id="nav"
      style={
        {
          //@ts-ignore
          // backgroundColor: theme.secondaryColor,
        }
      }
    >
      {/* <Navbar.Collapse id="responsive-navbar-nav" className="w-full"> */}
      <Nav
        activeKey={location.pathname}
        className="flex w-full flex-row justify-between px-10 z-10"
      >
        {NAV_ITEMS.map((item, index) => (
          <Nav.Item
            key={(index + 1).toString()}
            className={`${location.pathname === item.routes ? "active" : ""}`}
          >
            <Nav.Link href={item.routes}>{item.title}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {/* </Navbar.Collapse> */}
    </StyledNavbar>
  );
};
