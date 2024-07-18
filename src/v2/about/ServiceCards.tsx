import { IconBaseProps, IconType } from "react-icons/lib";
import { ShadowContainer } from "../components/Container";
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
            <ShadowContainer
              key={`doing-${(index + 1).toString()}`}
              className=" flex flex-row items-center  h-[150px] p-3"
            >
              {IconElem}
              <div className="flex flex-col justify-start  overflow-hidden h-full w-[60%] ">
                <h1 className="md:text-md  max-md:text-base font-bold  whitespace-nowrap">
                  {title}
                </h1>
                <label className="text-ellipsis whitespace-pre-line text-sm ">
                  {description}
                </label>
              </div>
            </ShadowContainer>
          </AnimateInView>
        );
      })}
    </div>
  );
};
