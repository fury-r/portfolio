
import React from "react";
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
    <div className="flex flex-col m-3 jusitfy-end h-min-screen">
      <label className="text-3xl font-semibold border-b-2 opacity-80 w-1/4 pb-2 ">
        Socials
      </label>

      <div className="flex flex-row justify-center mt-10">
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
    </div>
  );
};
export default Contact;
