import { ShadowContainer } from "../components/Container";

type TData = {
  name: string;
  percentage: number;
};
const DATA: TData[] = [
  {
    name: "Web development",
    percentage: 80,
  },
  {
    name: "Mobile App Development",
    percentage: 80,
  },
  {
    name: "Backend Development",
    percentage: 70,
  },
];
export const Skills = () => {
  return (
    <ShadowContainer className="p-3">
      {DATA.map((value, index) => (
        <div
          key={`skill-${(index + 1).toString()}`}
          className=" flex flex-col "
        >
          <div className="flex flex-row my-3">
            <h1 className="font-semibold">{value.name}</h1>
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
