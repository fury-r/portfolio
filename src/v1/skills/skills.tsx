import {
  StyledAccentLabel,
  StyledLabel,
  ThemeContainer,
} from "../context/component";
import { TItem } from "../../types/page";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { useThemeContext } from "../context/ThemeContext/useContext";
import { getTech } from "../../data/skills";
import { useMemo } from "react";

const SkillsContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column: 2;
  }
  .skill {
    width: 12%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    @media (max-width: 1020px) {
      width: 20%;
    }
    @media (max-width: 768px) {
      width: 80%;
    }
  }
  .skill-container {
    background-color: var(--secodary-color);
    border: 1px solid var(--primary);
  }
`;

const Row = ({ type, data }: { type: string; data: TItem[] }) => {
  return (
    <Container className="flex flex-col  ">
      <div className="w-full flex  justify-center">
        <StyledLabel className="heading-point">{type}</StyledLabel>
      </div>
      <SkillsContainer>
        {data.map((value, key) => (
          <ThemeContainer
            className="transform hover:scale-100  skill-container  motion-reduce:transform-none skill  btn-outline-secondary w-44 h-14  p-2 rounded-[10px] m-4  flex justify-center items-center"
            key={key.toString()}
          >
            <div
              className={` ${
                value.iconPath && !value.renderOnlyIcon
                  ? "grid grid-cols-2 gap-0"
                  : " flex justify-center"
              }  w-full `}
            >
              {!value.renderOnlyIcon && (
                <StyledAccentLabel className=" self-center ">
                  {value.title}
                </StyledAccentLabel>
              )}
              {value.iconPath && (
                <Container className="p-3">
                  <img
                    src={value.iconPath}
                    width={30}
                    height={40}
                    alt={value.title}
                    loading="lazy"
                    className="self-center  w-fit object-fit h-[revert-layer]"
                  />
                </Container>
              )}
            </div>
          </ThemeContainer>
        ))}
      </SkillsContainer>
    </Container>
  );
};

export const Skills = () => {
  const { main } = useThemeContext();

  const skills = useMemo(() => {
    return getTech(main);
  }, [main]);

  return (
    <div id="Skills" className=" ms-3  ext-lg h-min-screen ">
      <Row type={"Tech Knowledge"} data={skills} />
    </div>
  );
};
