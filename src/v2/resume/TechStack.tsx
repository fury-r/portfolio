import { Cloud } from "react-icon-cloud";
import { useThemeContext } from "../context/ThemeContext/useContext";
import styled from "styled-components";
import { ShadowContainer } from "../components/Container";
import { useDataContext } from "../../context/DataContext/useContext";
import AnimateInView from "../components/AnimateInView/AnimateInView";

export const ShadowList = styled(ShadowContainer)`
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TechStack = () => {
  const { mode } = useThemeContext();
  const { tech } = useDataContext();

  const filteredData = tech.filter(
    (value) =>
      !["OAuth", "Flask", "Redux", "Sockets", "Express"].includes(value.title)
  );

  const icons = filteredData.map((item) => ({
    ...item,
    icon: mode === "DARK" ? item.darkIcon : item.lightIcon,
  }));

  return (
    <AnimateInView animate>
      <ShadowList className="p-3">
        <Cloud
          containerProps={{}}
          options={{
            freezeActive: true,
            wheelZoom: false,
            pinchZoom: false,
            animTiming: "Smooth",
            imageMode: "both",
            noSelect: true,
            depth: 1,
            imageScale: 1.1,
            initial: [0.1, -0.1],
            tooltip: "native",
            scrollPause: false,
            dragControl: true,
            dragThreshold: 0.001,
            activeCursor: "default",
            reverse: true,
            minSpeed: 0.01,
            maxSpeed: 0.02,
          }}
        >
          {icons.map((item, i) => (
            <a
              key={i}
              href="#"
              title={item.title}
              className="hover:border-none"
            >
              {item.icon ? (
                <img
                  loading="lazy"
                  src={item.icon}
                  alt={item.title}
                  width={100}
                  height={80}
                  className="object-contain"
                />
              ) : (
                <span className="text-9xl font-bold">{item.title}</span>
              )}
            </a>
          ))}
        </Cloud>
      </ShadowList>
    </AnimateInView>
  );
};
