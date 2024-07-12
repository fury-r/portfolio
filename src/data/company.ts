import DarkOqton from "../assets/company/DarkOqton.svg";
import LightOqton from "../assets/company/LightOqton.svg";
import CtrlSaveWhite from "../assets/company/ctrlsave-white.png";
import Vtech from "../assets/company/vtech.png";
import { TCompany } from "../types/component";

export const companyData: TCompany[] = [
  {
    name: "Oqton",
    duration: "Dec 2022 - Present",
    darkImage: LightOqton,
    lightImage: DarkOqton,
    link: "https://oqton.com",
    title: "Software Development Consultant",
    description:
      "I specialize in developing UI and middleware for the MOS system, crafting responsive UI components with React and robust APIs using Node.js. My contributions include IoT integration, automation with Selenium Java, and ensuring seamless system integration for user-friendly applications.",
    subItems: [
      {
        subTitle: "Software Development Consultant",
        date: "06/2023-Present",
      },
      {
        subTitle: "Junior Software Engineer",
        date: "12/2022 - 06/2023",
      },
    ],
  },
  {
    name: "13th June Infotech Pvt Ltd",
    duration: "Sept 2022 - Nov 2022",
    link: "https://www.linkedin.com/company/13thjune-infotech-private-limited/about/",
    title: "Consultant/Frontend Engineer",
    description:
      "As a Consultant Engineer, I led the transformation of a financial application from C++ to a modern web platform using React, HTML, and CSS. Over three months, I collaborated with the team to analyze requirements, optimize the codebase, and implement frontend solutions in React, gaining expertise in web development and project management.",
    subItems: [
      {
        subTitle: "Consultant Engineer",
        date: "09/2022-11/2022",
      },
    ],
  },
  {
    name: "Ctrl Save Pvt Ltd",
    duration: "Oct 2021 - Sept 2022",
    darkImage: CtrlSaveWhite,
    lightImage: CtrlSaveWhite,
    link: "https://www.ctrlsave.in/",
    title: "Full Stack Developer",
    description:
      "As a Full Stack Developer, I have developed four applications using technologies like React Native, Python, Flask, SQL, SQLAlchemy, HTML, and CSS. Projects include a Stock Trading Platform with real-time data streaming, a Barista App for coffee ordering, a Shopping App akin to Myntra, and a Logistics App for truck bookings. I utilized my front-end and back-end skills to implement features such as order tracking, personalized recommendations, and route optimization, contributing to innovative software solutions.",
    subItems: [
      {
        subTitle: "Full Stack Developer",
        date: "10/2021-11/2022",
      },
    ],
  },
  {
    name: "VTech",
    duration: "May 2019 - June 2019",
    lightImage: Vtech,
    link: "https://vtechgoa.com/",
    title: "Web Developer",
    description:
      "As a Web Developer, I developed the company's weblink using HTML, JavaScript, CSS, jQuery, and PHP, focusing on user-friendly interface design and cross-browser compatibility. This title enhanced my hands-on experience in web development and strengthened my skills in front-end technologies.",
    subItems: [
      {
        subTitle: "Web Developer (Intern)",
        date: "05/2019-06/2019",
      },
    ],
  },
];

export const educationData = [
  {
    title: "Masters of Science in Information Technology.[9.47 CGPA]",
    date: "2021 — 2023",
    description: "Masters of Science in Information Technology.[9.47 CGPA]",
  },
  {
    title: "Parvatibai Chowgule College of Arts and Science (Goa University)",
    date: "2018 — 2021",
    description: "Bachelors of Vocation in Software Development.[8.02 CGPA]",
  },
];
