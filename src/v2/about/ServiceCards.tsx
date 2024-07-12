import { IconBaseProps, IconType } from "react-icons/lib";
import { SiWebpack } from "react-icons/si";
import { CiMobile3, CiServer } from "react-icons/ci";
import { FaCamera } from "react-icons/fa";
import { ShadowContainer } from "../components/Container";
import { useDataContext } from "../../context/DataContext/useContext";
import { iconMap } from "../../data/icon";

export type TCardData = {
  icon: (props?: IconBaseProps) => JSX.Element;
  title: string;
  description: string;
};

const DATA: TCardData[] = [
  {
    description:
      "Specializing in creating dynamic, responsive, and visually appealing websites using HTML, CSS, and JavaScript. Proficient in front-end frameworks such as React.js and Next.js to build seamless user experiences. Skilled in using Tailwind for rapid UI development and enhancing the aesthetic appeal of web projects.",
    title: "Web Development",
    icon: (props?: IconBaseProps) => <SiWebpack {...props} />,
  },
  {
    description:
      "Developing high-performance mobile applications that provide a seamless user experience across iOS and Android platforms. Utilizing Flutter for creating visually stunning and natively compiled applications from a single codebase. Experienced in using Firebase for backend services, authentication, and real-time database integration. Proficient in Kotlin for native Android development and ensuring optimal performance and reliability.",
    title: "Mobile App Development",
    icon: (props?: IconBaseProps) => <CiMobile3 {...props} />,
  },
  {
    description:
      "Designing and implementing scalable and secure backend systems using Node.js, Java, and Python. Expertise in database management with SQL and MongoDB, ensuring efficient data storage and retrieval. Experienced in using Docker for containerization and streamlining deployment processes. Utilizing gRPC for efficient communication between microservices and ensuring reliable API integration.",
    title: "Backend Development",
    icon: (props?: IconBaseProps) => <CiServer {...props} />,
  },

  {
    description:
      "Passionate about photography, focusing on capturing stunning visuals and telling stories through images.Skilled in diverse photography styles, including portrait, landscape, and macro photography, to produce high-quality and impactful images.",
    title: "Photography",
    icon: (props?: IconBaseProps) => <FaCamera {...props} />,
  },
];
export const ServiceCards = () => {
  const { services } = useDataContext();

  return (
    <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
      {services.map(({ description, icon, title }, index) => {
        let IconElem: string | JSX.Element | IconType = "-";
        if (icon) {
          IconElem = iconMap[icon];
          IconElem = (
            <IconElem
              style={{
                width: "30%",
                height: "30%",
                objectFit: "fill",
                color: "var(--accent)",
              }}
            />
          );
        }
        return (
          <ShadowContainer
            key={`doing-${(index + 1).toString()}`}
            className=" flex flex-row items-center     h-[150px] p-3"
          >
            {IconElem}
            <div className="flex flex-col justify-start overflow-hidden h-full w-[60%]">
              <h1 className="md:text-xl  max-md:text-base font-bold  ">
                {title}
              </h1>
              <label className="text-ellipsis whitespace-pre-line max-md:text-sm overflow-hidden">
                {description}
              </label>
            </div>
          </ShadowContainer>
        );
      })}
    </div>
  );
};
