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
    description: "",
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
    subItems: [
      {
        subTitle: "Consultant Engineer",
        date: "09/2022-11/2022",
      },
    ],
  },
  {
    title: "Ctrl Save Pvt Ltd",
    subItems: [
      {
        subTitle: "Full Stack Developer",
        date: "10/2021-11/2022",
      },
    ],
  },
  {
    title: "V-Tech",
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
