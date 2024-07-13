import { LuContact } from "react-icons/lu";
import { BiInfoCircle } from "react-icons/bi";
import { AiOutlineProject } from "react-icons/ai";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { TNavItem } from "../../types/theme";
import { Routes } from "../Routes/path";
import { ThemeModeButton } from "../../components/ThemeModeButton";
import { useThemeContext } from "../context/ThemeContext/useContext";

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

  font-size: 15px;
  font-weight: 500;
  .active {
    color: var(--accent);
    font-weight: 700;
  }
  min-height: 3.5rem;

  @media (max-width: 800px) {
    border-radius: var(--rounded) var(--rounded) 0 0;
  }
`;

export const ThemeNavbar = () => {
  const { mode, stateChange, theme } = useThemeContext();
  return (
    <StyledNavbar
      collapseOnSelect
      fixed="top"
      expand="sm"
      data-bs-theme="dark"
      className=" flex flex-row z-20 relative items-center w-full "
      id="nav"
    >
      <Nav
        activeKey={location?.pathname || ""}
        className="flex w-full flex-row justify-between px-10 z-10 h-full items-center"
      >
        {NAV_ITEMS.map((item, index) => (
          <Nav.Item
            key={(index + 1).toString()}
            className={`${
              location?.pathname === item.routes ? "active" : ""
            } mx-2`}
          >
            <Nav.Link
              href={`/v2${item.routes.length === 1 ? "" : item.routes}`}
            >
              {item.title}
            </Nav.Link>
          </Nav.Item>
        ))}
        <ThemeModeButton
          mode={mode}
          style={{
            background: "none",
          }}
          className="rotate-icon"
          iconColor={theme.accent || ""}
          onClick={() => stateChange(mode === "DARK" ? "LIGHT" : "DARK")}
        />
      </Nav>
      {/* </Navbar.Collapse> */}
    </StyledNavbar>
  );
};
