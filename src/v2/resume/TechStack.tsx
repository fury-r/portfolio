import { useMediaQuery } from "../../hooks/useMediaQuery";
import { chunk } from "lodash";
import { useThemeContext } from "../context/ThemeContext/useContext";
import styled from "styled-components";
import { ShadowContainer } from "../components/Container";
import { useDataContext } from "../../context/DataContext/useContext";

export const ShadowList = styled(ShadowContainer)`
  border-radius: 10px;
`;

export const TechStack = () => {
  const isMobileScreen = useMediaQuery("lg");
  const { mode } = useThemeContext();
  const { tech } = useDataContext();

  const filteredData = tech.filter(
    (value) =>
      !["OAuth", "Flask", "Redux", "Sockets", "Express"].includes(value.title)
  );

  return (
    <ul className="scrollbar scroll  min-w-full ">
      {(isMobileScreen ? chunk(filteredData, 4) : [filteredData]).map(
        (value, i) => (
          <li
            key={`tech-${(i + 1).toString()}`}
            className="grid grid-cols-4 gap-3 max-md:grid-cols-2 min-w-full scroll-snap flex-1"
          >
            {value.map((item, j) => (
              <ShadowList
                className={` h-[50px] w-[150px] rounded-lg p-2   ${
                  item.renderOnlyIcon || (!item.darkIcon && !item.lightIcon)
                    ? "flex flex-row justify-center items-center"
                    : "grid grid-cols-2 items-center justify-items-center"
                }`}
                key={`tech-${(j + 1).toString()}`}
              >
                {(item.darkIcon || item.lightIcon) && (
                  <img
                    loading="lazy"
                    src={mode === "DARK" ? item.darkIcon : item.lightIcon}
                    alt={item.title}
                    width={item.renderOnlyIcon ? 70 : 30}
                    height={50}
                    className="object-contain"
                  />
                )}
                {!item.renderOnlyIcon && (
                  <h3
                    className={
                      item.renderOnlyIcon || (!item.darkIcon && !item.lightIcon)
                        ? "whitespace-nowrap"
                        : ""
                    }
                  >
                    {item.title}
                  </h3>
                )}
              </ShadowList>
            ))}
          </li>
        )
      )}
    </ul>
  );
};
