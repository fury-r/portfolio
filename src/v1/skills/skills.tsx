import {
  StyledAccentLabel,
  StyledLabel,
  ThemeContainer,
} from "../context/component";
import Python from "../../assets/iconprogramming/Python.svg";

import Java from "../../assets/iconprogramming/Java.svg";
import Php from "../../assets/iconprogramming/Php.svg";
import CSS from "../../assets/iconprogramming/css.svg";
import Html from "../../assets/iconprogramming/html.svg";
import ReactJs from "../../assets/iconprogramming/React.svg";
import NodeJs from "../../assets/iconprogramming/NodeJs.svg";
import Javascript from "../../assets/iconprogramming/javascript.svg";
import Golang from "../../assets/iconprogramming/Go.svg";
import Grpc from "../../assets/iconprogramming/grpc.png";
import NodejsDark from "../../assets/iconprogramming/NodejsDark.svg";

import Cpp from "../../assets/iconprogramming/C++.svg";
import Sql from "../../assets/iconprogramming/sql.svg";
import Mongo from "../../assets/iconprogramming/mongodb.svg";
import Moralis from "../../assets/iconprogramming/moralis.png";
import FireBase from "../../assets/iconprogramming/firebase.svg";
import Fluter from "../../assets/iconprogramming/flutter.svg";
import Ai from "../../assets/iconprogramming/ai-network.svg";

import Kotlin from "../../assets/iconprogramming/kotlin.svg";
import Laravel from "../../assets/iconprogramming/laravel.svg";
import NextJs from "../../assets/iconprogramming/next-js.svg";
import Docker from "../../assets/iconprogramming/docker.svg";
import Git from "../../assets/iconprogramming/Git.svg";
import TailwindCSS from "../../assets/iconprogramming/tailwind-css.svg";
import { TItem } from "../../types/page";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { useThemeContext } from "../context/ThemeContext/useContext";

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
                    className="self-center  w-fit"
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
  const skills: TItem[] = [
    {
      iconPath: Python,
      title: "Python",
    },
    {
      iconPath: Java,
      title: "Java",
    },
    {
      iconPath: Javascript,
      title: "Javascript",
    },
    {
      iconPath: Php,
      title: "PHP",
    },
    {
      iconPath: CSS,
      title: "CSS",
    },
    {
      iconPath: Html,
      title: "HTML",
    },
    {
      iconPath: ReactJs,
      title: "Reactjs",
    },
    {
      iconPath: Laravel,
      title: "Laravel",
    },
    {
      iconPath: NextJs,
      title: "NextJS",
    },
    {
      iconPath: Sql,
      title: "SQL",
    },

    {
      iconPath: Mongo,
      title: "MongoDb",
    },
    {
      iconPath: FireBase,
      title: "Firebase",
    },
    {
      iconPath: Moralis,
      title: "Moralis",
    },
    {
      iconPath: main === "LIGHT" ? NodejsDark : NodeJs,
      title: "NodeJs",
      renderOnlyIcon: true,
    },

    {
      iconPath: null,
      title: "web3",
    },
    {
      iconPath: Ai,
      title: "Ai/ML",
    },
    {
      iconPath: Fluter,
      title: "Flutter",
    },
    {
      iconPath: Cpp,
      title: "C++",
    },
    {
      iconPath: Golang,
      title: "Golang",
    },
    {
      iconPath: Kotlin,
      title: "Kotlin",
    },
    {
      iconPath: Docker,
      title: "Docker",
      renderOnlyIcon: true,
    },
    {
      iconPath: Grpc,
      title: "Grpc",
    },
    {
      iconPath: Git,
      title: "Git",
    },
    {
      iconPath: TailwindCSS,
      title: "Tailwind",
    },
  ];

  return (
    <div id="Skills" className=" ms-3  ext-lg h-min-screen ">
      <Row type={"Tech Knowledge"} data={skills} />
    </div>
  );
};