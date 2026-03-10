import { IconBaseProps, IconType } from "react-icons/lib";
import { GradientBox } from "../components/Container";
import { useDataContext } from "../../context/DataContext/useContext";
import { iconMap } from "../../data/icon";
import AnimateInView from "../components/AnimateInView/AnimateInView";

export type TCardData = {
  icon: (props?: IconBaseProps) => JSX.Element;
  title: string;
  description: string;
};

export const ServiceCards = () => {
  const { services } = useDataContext();

  return (
    <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
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
          <AnimateInView animate key={`doing-${(index + 1).toString()}`}>
            <GradientBox
              key={`doing-${(index + 1).toString()}`}
              className="group flex flex-row items-center h-[150px] p-4 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="basis-[35%] transition-transform duration-200 motion-safe:group-hover:scale-105">
                {IconElem}
              </div>
              <div className="flex flex-col justify-start overflow-hidden h-full basis-[65%]">
                <h1 className="text-base md:text-lg font-bold">
                  {title}
                </h1>
                <label className="text-ellipsis whitespace-pre-line text-sm md:text-[0.95rem] opacity-90">
                  {description}
                </label>
              </div>
            </GradientBox>
          </AnimateInView>
        );
      })}
    </div>
  );
};
