import DarkOqton from "../assets/company/DarkOqton.svg";
import LightOqton from "../assets/company/LightOqton.svg";
import CtrlSaveWhite from "../assets/company/ctrlsave-white.png";
import Vtech from "../assets/company/vtech.png";
import { TCompany, TEducation } from "../types/component";

export const companyData: TCompany[] = [
  {
    name: "Oqton",
    duration: "Dec 2022 - Present",
    darkImage: LightOqton,
    lightImage: DarkOqton,
    link: "https://oqton.com",
    title: "Intermediate Software Engineer",
    description:
      "Working on front-end bug fixes and feature development, managing Node.js middleware, onboarding IoT-compatible devices, building PyQt-based UI tooling, writing emulation scripts, and developing Golang backend integrations with SAP and QuickBooks.",
    subItems: [
      {
        subTitle: "Intermediate Software Engineer",
        date: "Dec 2022 - Present",
      },
    ],
  },
  {
    name: "13th June Infotech Pvt Ltd",
    duration: "Sep 2022 - Nov 2022",
    link: "https://www.linkedin.com/company/13thjune-infotech-private-limited/about/",
    title: "Consultant Engineer",
    description:
      "Managed and guided ReactJS front-end development and transformed processed data into normalized UI-ready formats for meaningful presentation.",
    subItems: [
      {
        subTitle: "Consultant Engineer",
        date: "Sep 2022 - Nov 2022",
      },
    ],
  },
  {
    name: "Ctrl Save Pvt Ltd",
    duration: "Oct 2021 - Sep 2022",
    darkImage: CtrlSaveWhite,
    lightImage: CtrlSaveWhite,
    link: "https://www.ctrlsave.in/",
    title: "Full Stack Developer",
    description:
      "Handled front-end and back-end development for multiple mobile applications, implemented UI designs, and optimized database queries for faster data retrieval.",
    subItems: [
      {
        subTitle: "Full Stack Developer",
        date: "Oct 2021 - Sep 2022",
      },
    ],
  },
  {
    name: "V-Tech Computer Solutions",
    duration: "May 2019 - June 2019",
    lightImage: Vtech,
    link: "https://vtechgoa.com/",
    title: "Web Developer",
    description:
      "Developed a company website using HTML, CSS, and JavaScript.",
    subItems: [
      {
        subTitle: "Web Developer (Intern)",
        date: "May 2019 - Jun 2019",
      },
    ],
  },
];

export const educationData: TEducation[] = [
  {
    name: "Parvatibai Chowgule College (Goa University)",
    link: "https://www.unigoa.ac.in/",
    title: "Master of Science in Information Technology",
    subTitle: "Goa, India",
    date: "2023",
    course: "Master of Science in Information Technology",
    marks: "9.47 / 10",
    description: "CGPA: 9.47 / 10",
  },
  {
    name: "Parvatibai Chowgule College (Goa University)",
    link: "https://www.unigoa.ac.in/",
    title: "Bachelor in Vocation (Software Development)",
    subTitle: "Goa, India",
    date: "2021",
    course: "Bachelor in Vocation (Software Development)",
    marks: "8.02 / 10",
    description: "CGPA: 8.02 / 10",
  },
];
