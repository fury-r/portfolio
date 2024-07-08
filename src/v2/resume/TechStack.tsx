import { useMediaQuery } from "../../hooks/useMediaQuery";
import { chunk } from "lodash";
import { useThemeContext } from "../context/ThemeContext/useContext";
import styled from "styled-components";
import { ShadowContainer } from "../components/Container";
import { getTech } from "../../data/skills";
import { useMemo } from "react";

export const ShadowList = styled(ShadowContainer)`
  border-radius: 10px;
`;

export const TechStack = () => {
  const isMobileScreen = useMediaQuery("lg");
  const { mode } = useThemeContext();
  const tech = useMemo(() => {
    return getTech(mode);
  }, [mode]);

  console.log(isMobileScreen);
  return (
    <ul className="scrollbar scroll  min-w-full ">
      {(isMobileScreen ? chunk(tech, 4) : [tech]).map((value, i) => (
        <li
          key={`tech-${(i + 1).toString()}`}
          className="grid grid-cols-4 gap-3 max-md:grid-cols-2 min-w-full scroll-snap flex-1"
        >
          {value.map((item, j) => (
            <ShadowList
              className={` h-[50px] w-[150px] rounded-lg p-2   ${
                item.renderOnlyIcon || !item.iconPath
                  ? "flex flex-row justify-center items-center"
                  : "grid grid-cols-2 items-center justify-items-center"
              }`}
              key={`tech-${(j + 1).toString()}`}
            >
              {item.iconPath && (
                <img
                  loading="lazy"
                  src={item.iconPath}
                  alt={item.title}
                  width={item.renderOnlyIcon ? 70 : 30}
                  height={50}
                  className="object-contain"
                />
              )}
              {!item.renderOnlyIcon && <h3>{item.title}</h3>}
            </ShadowList>
          ))}
        </li>
      ))}
    </ul>
  );
};
