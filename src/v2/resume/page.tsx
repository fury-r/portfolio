import PageLayout from "../components/Page/PageLayout";
import TimeLine from "../components/TimeLine/TimeLine";
import { SiKnowledgebase } from "react-icons/si";
import { IconBaseProps } from "react-icons/lib";
import { MdOutlineWorkOutline } from "react-icons/md";
import { Skills } from "./Skills";
import { TechStack } from "./TechStack";

const educationData = [
  {
    title: "Parvatibai Chowgule College of Arts and Science (Goa University)",
    date: "2018 — 2021",
    description: "Masters of Science in Information Technology.[9.47 CGPA]",
  },
  {
    title: "Parvatibai Chowgule College of Arts and Science (Goa University)",
    date: "2018 — 2021",
    description: "Bachelors of Vocation in Software Development.[8.02 CGPA]",
  },
];

const experinceData = [
  {
    title: "Oqton",
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
    title: "13th June Infotech Pvt Ltd",
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
    title: "Ctrl Save Pvt Ltd",
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
    title: "V-Tech",
    description:
      "As a Web Developer, I developed the company's website using HTML, JavaScript, CSS, jQuery, and PHP, focusing on user-friendly interface design and cross-browser compatibility. This role enhanced my hands-on experience in web development and strengthened my skills in front-end technologies.",
    subItems: [
      {
        subTitle: "Web Developer (Intern)",
        date: "05/2019-06/2019",
      },
    ],
  },
];
const Resume = () => {
  return (
    <PageLayout
      title="Resume"
      sections={[
        {
          component: (
            <div className="scrollbar scroll  min-w-full max-md:gap-[30px]">
              <div className=" scroll-snap min-w-full">
                <TimeLine
                  data={experinceData}
                  title="Work Experience"
                  icon={(props?: IconBaseProps) => (
                    <MdOutlineWorkOutline {...props} />
                  )}
                />
              </div>
              <div className=" scroll-snap min-w-full">
                <TimeLine
                  data={educationData}
                  title="Education"
                  icon={(props?: IconBaseProps) => (
                    <SiKnowledgebase {...props} />
                  )}
                />
              </div>
            </div>
          ),
        },

        {
          title: "Skills",
          component: <Skills />,
        },
        {
          title: "Tech",
          component: <TechStack />,
        },
      ]}
    />
  );
};

export default Resume;
