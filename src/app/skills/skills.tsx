"use client";
import React from "react";
import {
  StyledAccentLabel,
  StyledLabel,
  ThemeContainer,
} from "../context/component";
import Image, { StaticImageData } from "next/image";
import Python from "../../assets/icon_programming/Python.svg";

import Java from "../../assets/icon_programming/Java.svg";
import Php from "../../assets/icon_programming/Php.svg";
import CSS from "../../assets/icon_programming/css.svg";
import Html from "../../assets/icon_programming/html.svg";
import ReactJs from "../../assets/icon_programming/React.svg";
import NodeJs from "../../assets/icon_programming/NodeJs.svg";
import Javascript from "../../assets/icon_programming/Javascript.svg";
import Golang from "../../assets/icon_programming/Go.svg";
import Grpc from "../../assets/icon_programming/grpc.png";

import Cpp from "../../assets/icon_programming/C++.svg";
import Sql from "../../assets/icon_programming/Sql.svg";
import Mongo from "../../assets/icon_programming/mongodb.svg";
import Moralis from "../../assets/icon_programming/moralis.png";
import FireBase from "../../assets/icon_programming/firebase.svg";
import Fluter from "../../assets/icon_programming/flutter.svg";
import Ai from "../../assets/icon_programming/ai-network.svg";
import Kotlin from "../../assets/icon_programming/kotlin.svg";
import Laravel from "../../assets/icon_programming/laravel.svg";
import NextJs from "../../assets/icon_programming/next-js.svg";
import Docker from "../../assets/icon_programming/docker.svg";
import Git from "../../assets/icon_programming/Git.svg";
import TailwindCSS from "../../assets/icon_programming/tailwind-css.svg";

import styled from "styled-components";
import { Container } from "react-bootstrap";
type Item = {
  title: string;
  iconPath: StaticImageData;
  renderOnlyIcon?: boolean;
};
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
    border: 1px solid var(--primary-color);
  }
`;

const Row = ({ type, data }: { type: string; data: Item[] }) => {
  return (
    <Container className="flex flex-col  ">
      <StyledLabel className="heading-point">{type}</StyledLabel>

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
                  <Image
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
  const skills: Item[] = [
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
      iconPath: NodeJs,
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
