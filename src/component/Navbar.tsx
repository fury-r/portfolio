import { useState } from "react";

import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { BsSun } from "react-icons/bs";
import { FaAffiliatetheme } from "react-icons/fa";

import { MdDarkMode } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { Routes } from "../Routes/routes";
import {
  NueromorphicNavLink,
  NueromorphicNavItem,
  NeuroNavbar,
} from "../context/component";
import { HashLink } from "react-router-hash-link";
import { func } from "prop-types";
import { useAuth } from "../context/Authcontext";
const MainNavbar = ({ toggletheme }) => {
  const [selected, setselected] = useState();
  const [check, setcheck] = useState(false);
  const { setTheme } = useAuth();
  const handleChange = () => {
    setcheck(!check);
  };
  const themes = [
    { id: 0, label: "Dark", icon: <MdDarkMode /> },
    { id: 1, label: "Light", icon: <BsSun /> },
    { id: 2, label: "Classic", icon: <FaAffiliatetheme /> },
  ];
  return (
    <>
      <NeuroNavbar
        collapseOnSelect
        color="faded"
        fixed="top"
        expand="sm"
        variant="white"
        className="justify-content-start    sticky-top "
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav ">
            <FontAwesomeIcon className="nav-toggle" icon={faCaretDown} />
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              className="justify-content-end"
              style={{ width: "100%" }}
              activeKey={Routes.home.path}
            >
              <NueromorphicNavItem>
                <NueromorphicNavLink as={HashLink} to={Routes.home.path}>
                  <label className="btn-outline-none">Home</label>
                </NueromorphicNavLink>
              </NueromorphicNavItem>

              <NueromorphicNavItem>
                <NueromorphicNavLink
                  as={HashLink}
                  eventkey="link-4"
                  className=" nav-text active"
                  to={Routes.project.path}
                >
                  <label>Projects</label>
                </NueromorphicNavLink>
              </NueromorphicNavItem>

              <NueromorphicNavItem>
                <NueromorphicNavLink
                  as={HashLink}
                  eventkey="link-4"
                  className=" nav-text active"
                  to={Routes.project.path}
                >
                  <label>About</label>
                </NueromorphicNavLink>
              </NueromorphicNavItem>

              <NueromorphicNavItem>
                <NueromorphicNavLink
                  as={HashLink}
                  eventkey="link-4"
                  className=" nav-text active"
                  to={Routes.project.path}
                >
                  <label>Contact</label>
                </NueromorphicNavLink>
              </NueromorphicNavItem>
            </Nav>
          </Navbar.Collapse>
          <Dropdown>
            <Dropdown.Toggle>Themes</Dropdown.Toggle>
            <Dropdown.Menu>
              {themes.map((value, key) => (
                <Dropdown.Item
                  className="flex flex-row justify-between"
                  key={key}
                  onClick={() => setTheme(value.id)}
                >
                  {value.label}
                  {value.icon}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </NeuroNavbar>
      <Navbar fixed="bottom"></Navbar>
    </>
  );
};
MainNavbar.propTypes = {
  toggletheme: func.isRequired,
};
export default MainNavbar;
