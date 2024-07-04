import React, { useState } from "react";
import Image from "next/image";
import Profile from "../../../../assets/profile.jpg";
import { IoIosArrowDown } from "react-icons/io";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
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
export const ProfileCard = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-full md:flex md:flex-col w-full">
      <div className="flex flex-row justify-end md:hidden">
        <ShadowContainer
          className=" p-3 rounded-bl-lg"
          onClick={() => setShow((prev) => !prev)}
        >
          <IoIosArrowDown />
        </ShadowContainer>
      </div>
      <div className="grid md:grid-cols-1 gap-4 my-5 items-center max-md:grid-cols-2 p-3  w-full  ">
        <div className=" rounded-md flex flex-col items-center ">
          <Image
            width={100}
            className="m-3 rounded-md"
            src={Profile}
            alt={""}
          />
        </div>
        <div className="flex flex-col items-center justify-between h-[70px] max-md:items-start ">
          <div>Rajeev Dessai</div>
          <div
            className=" p-2 rounded-lg "
            style={{ background: "var(--primary)" }}
          >
            <label className="text-sm font-semibold">Software Engineer</label>
          </div>
        </div>
      </div>
      <div id="desktop-contacts" className="max-md:hidden   ">
        <Contacts />
      </div>
      {show && (
        <div className="md:hidden flex flex-col w-full items-center">
          <Contacts />
          {SocialFooter}
        </div>
      )}
      <div className="max-md:hidden flex flex-row justify-center h-[50%] ">
        {SocialFooter}
      </div>
    </div>
  );
};
