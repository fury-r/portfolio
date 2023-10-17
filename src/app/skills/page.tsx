"use client";
import React, { lazy } from "react";
import { StyledButton, StyledLabel } from "../context/component";
import Image, { StaticImageData } from "next/image";
import Python from "../../assets/icon_programming/Python.svg"

import Java from "../../assets/icon_programming/Java.svg";
import Php from "../../assets/icon_programming/Php.svg"
import CSS from  "../../assets/icon_programming/css.svg"
import Html from  "../../assets/icon_programming/html.svg"
import ReactJs from "../../assets/icon_programming/React.svg"
import NodeJs from "../../assets/icon_programming/NodeJs.svg"
import Javascript from "../../assets/icon_programming/Javascript.svg"
import Golang from "../../assets/icon_programming/Go.svg"
import Cpp from "../../assets/icon_programming/C++.svg"
import Sql from "../../assets/icon_programming/Sql.svg"
import Mongo from "../../assets/icon_programming/mongodb.svg"
import Moralis from "../../assets/icon_programming/moralis.png"
import FireBase from "../../assets/icon_programming/firebase.svg"
import Fluter from "../../assets/icon_programming/flutter.svg"
import Ai from "../../assets/icon_programming/ai-network.svg"
import Kotlin from "../../assets/icon_programming/kotlin.svg"
import Laravel from "../../assets/icon_programming/laravel.svg"
import NextJs from "../../assets/icon_programming/next.png"

const Row = ({
  type,
  data,
}: {
  type: string;
  data: {
    title: string;
    iconPath: StaticImageData;
  }[];
}) => {
  return (
    <div className="flex flex-col ">
      <label className="text-2xl font-semibold border-b-2 opacity-80 w-1/4 pb-2 ">
        {type}
      </label>

      <div className="flex flex-row flex-wrap justify-center">
        {data.map((value, key) => 
           (
              <StyledButton
                className="transform hover:scale-100  motion-reduce:transform-none w-40 h-16  btn-outline-secondary  m-4 "
                key={key.toString()}
              >
                <div className="flex justify-center items-center">
                  
                <StyledLabel className="me-2">{value.title}</StyledLabel>
                <Image src={value.iconPath} width={30} height={40} alt={""} loading="lazy" />
                </div>

              </StyledButton>
          )
        )}
      </div>
    </div>
  );
};
const Skills = () => {
  const skills: {
    title: string;
    iconPath: StaticImageData;
  }[] = [
    {
      iconPath: Python,
      title: "Python",
    },
    {
      iconPath: Java,
      title: "Java",
    },
    {
      iconPath:Javascript,
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
      iconPath:Laravel,
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
      iconPath:NodeJs,
      title: "NodeJs",
    },

    {
      iconPath: Python,
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
      iconPath: Golang,
      title: "Grpc",
    },
  ];
  // /   const services: string[] = [
  // /     "Backend Development",
  // /     "Frontend Development",
  // /     "Recat Native Development",
  // /     "ReactJs Development",
  // /     "Flutter Development",
  // /     "Python Development",
  // /   ];
  return (
    <div id="Skills" className=" ms-3  ext-lg h-min-screen ">
      <Row type={"Skills"} data={skills} />
    </div>
  );
};

export default Skills;
