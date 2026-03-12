import PageLayout from "../components/Page/PageLayout";
import TimeLine, { TTimeLineEvent } from "../components/TimeLine/TimeLine";
import { SiKnowledgebase } from "react-icons/si";
import { IconBaseProps } from "react-icons/lib";
import { MdOutlineWorkOutline } from "react-icons/md";
import { Skills } from "./Skills";
import { TechStack } from "./TechStack";
import { useDataContext } from "../../context/DataContext/useContext";

const Resume = () => {
  const { company, education } = useDataContext();
  const quickHighlights = [
    "Software Engineer with 3 years of full-stack development experience.",
    "Current role: Intermediate Software Engineer at Oqton (Dec 2022 - Present).",
    "M.Sc. IT (CGPA 9.47) and B.Voc Software Development (CGPA 8.02).",
    "Core strengths: React, TypeScript, Node.js, Python, Golang, SQL/NoSQL.",
  ];

  const certifications = [
    "Introduction to Flutter",
    "Introduction to Python OpenCV",
    "MongoDB Basics (M001) & Basic Cluster Administration (M103)",
    "HackerRank: Problem Solving, Python, SQL, JavaScript",
    "Machine Learning with Python",
  ];

  return (
    <PageLayout
      title="Resume"
      sections={[
        {
          component: (
            <div className="grid min-w-full gap-6 lg:grid-cols-2">
              <div className="min-w-0">
                <TimeLine
                  data={company as TTimeLineEvent[]}
                  title="Work Experience"
                  icon={(props?: IconBaseProps) => (
                    <MdOutlineWorkOutline {...props} />
                  )}
                />
              </div>
              <div className="min-w-0">
                <TimeLine
                  data={education as TTimeLineEvent[]}
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
          title: "Professional Highlights",
          component: (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-[var(--primary)] p-4">
                <h3 className="mb-2 text-lg font-semibold">Summary</h3>
                <ul className="list-disc space-y-2 pl-5">
                  {quickHighlights.map((item, index) => (
                    <li key={`highlight-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-[var(--primary)] p-4">
                <h3 className="mb-2 text-lg font-semibold">Certifications</h3>
                <ul className="list-disc space-y-2 pl-5">
                  {certifications.map((item, index) => (
                    <li key={`certification-${index}`}>{item}</li>
                  ))}
                </ul>
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
