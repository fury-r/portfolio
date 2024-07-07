import React, { useState } from "react";
import Profile from "../../../assets/profile.jpg";
import { IoIosArrowDown } from "react-icons/io";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import styled from "styled-components";
import { Contacts } from "./components/Contacts";
import { ShadowContainer } from "../Container";
const socials = [
  {
    href: "https://www.facebook.com/lostStories11",
    label: "Facebook",
    css: "facebook",
    icon: <FaFacebookF />,
  },
  {
    href: "https://www.linkedin.com/in/rajeev-dessai-1497741b0/",
    label: "Linkedin",
    css: "linkedin",
    icon: <FaLinkedinIn />,
  },
  {
    href: "https://github.com/fury-r",
    label: "Github",
    css: "github",
    icon: <FaGithub />,
  },
  {
    href: "https://instagram.com/rajeevdessai",
    label: "Instagram",
    css: "instagram",
    icon: <FaInstagram />,
  },
];
export const StyledShadowContainer = styled(ShadowContainer)`
  border-top: 0;
  border-right: 0;
  border-radius: 0 0 0 var(--rounded);
`;

const SocialFooter = (
  <div
    className="flex flex-row justify-center items-center  w-full m-3  md:self-end "
    id="socials"
  >
    {socials.map((value, key) => (
      <a
        key={key}
        href={value.href}
        className={
          "social-buttons__button social-button social-button--" + value.css
        }
        aria-label={value.label}
      >
        {value.icon}
      </a>
    ))}
  </div>
);

export const StyledContainer = styled.div`
  min-height: fit-content;
  width: 100%;
  @media (max-width: 1920px) {
    display: flex;
    flex-direction: column;
  }
  position: relative;

  .conditional-btn {
    display: none;
    @media (max-width: 800px) {
      display: initial;
    }
  }

  .hide-contacts {
    display: initial;
    @media (max-width: 800px) {
      display: none;
    }
  }
`;
export const ProfileCard = () => {
  const [show, setShow] = useState(false);
  return (
    <StyledContainer className="transition">
      <div className="flex flex-row justify-end min-[1250px]:hidden absolute right-0">
        <StyledShadowContainer
          className=" p-3 rounded-bl-lg border-none conditional-btn"
          onClick={() => setShow((prev) => !prev)}
        >
          <IoIosArrowDown />
        </StyledShadowContainer>
      </div>
      <div className="grid xl:grid-cols-1 gap-4 my-4 items-center max-[1250px]:grid-cols-2 md:p-3  w-full h-[50%] p-2">
        <div className=" rounded-md flex flex-col items-center  ">
          <img
            width={100}
            className="m-3 rounded-md object-fit"
            src={Profile}
            alt={"Profile picture"}
          />
        </div>
        <div className="flex flex-col items-center justify-between max-lg:items-start  ">
          <div>Rajeev Dessai</div>
          <div
            className=" p-2 rounded-lg my-2 "
            style={{ background: "var(--primary)" }}
          >
            <label className="text-sm font-semibold ">Software Engineer</label>
          </div>
        </div>
      </div>
      <div
        id="desktop-contacts "
        className={`h-[50%] ${!show && "hide-contacts"}`}
      >
        <Contacts />
        <div className={` flex flex-row justify-center `}>{SocialFooter}</div>
      </div>
    </StyledContainer>
  );
};
