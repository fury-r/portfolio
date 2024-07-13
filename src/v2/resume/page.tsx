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
  return (
    <PageLayout
      title="Resume"
      sections={[
        {
          component: (
            <div className="scrollbar scroll  min-w-full max-md:gap-[30px]">
              <div className=" scroll-snap min-w-full">
                <TimeLine
                  data={company as TTimeLineEvent[]}
                  title="Work Experience"
                  icon={(props?: IconBaseProps) => (
                    <MdOutlineWorkOutline {...props} />
                  )}
                />
              </div>
              <div className=" scroll-snap min-w-full">
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
