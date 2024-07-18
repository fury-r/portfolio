import { useDataContext } from "../../context/DataContext/useContext";
import AnimateInView from "../components/AnimateInView/AnimateInView";
import { ShadowContainer } from "../components/Container";

export const Skills = () => {
  const { services } = useDataContext();
  return (
    <ShadowContainer className="p-3">
      {services.map((value, index) => (
        <AnimateInView
          getStyle={(isInView: boolean) => ({
            transform: isInView ? "none" : "translateX(1200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          })}
          key={`skill-${(index + 1).toString()}`}
          className="flex flex-col"
          animate
        >
          <div className="flex flex-row my-3">
            <h1 className="font-semibold">{value.title}</h1>
            <h3 className="ml-3">{value.percentage}%</h3>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div
              style={{
                background: "var(--accent)",
                width: `${value.percentage}%`,
              }}
              className="h-2.5 rounded-full"
            ></div>
          </div>
        </AnimateInView>
      ))}
    </ShadowContainer>
  );
};
