import React from "react";
import { Container } from "react-bootstrap";
import { CgMail } from "react-icons/cg";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
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
    {
      href: "mailto:rajeev.dessai11@gmail.com",
      label: "Gmail",
      css: "gmail",
      icon: <CgMail />,
    },
  ];
  return (
      <div className="flex flex-row justify-center m-5 ">
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
};
export default Contact;
