import { useDataContext } from "../../context/DataContext/useContext";
import { ShadowContainer } from "../components/Container";

export const Skills = () => {
  const { services } = useDataContext();
  return (
    <ShadowContainer className="p-3">
      {services.map((value, index) => (
        <div
          key={`skill-${(index + 1).toString()}`}
          className=" flex flex-col "
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
        </div>
      ))}
    </ShadowContainer>
  );
};
