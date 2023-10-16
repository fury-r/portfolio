import React from "react";
import { StyledButton } from "../context/component";

const Row = ({ type, data }: any) => (
  <div className="flex flex-col ">
    <label className="text-2xl font-semibold border-b-2 opacity-80 w-1/4 pb-2 ">
      {type}
    </label>

    <div className="flex flex-row flex-wrap justify-center">
      {data.map((value: any, key: string) => (
        <StyledButton
          className="transform hover:scale-100  motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary  w-1/4 m-4"
          key={key}
        >
          {value}
        </StyledButton>
      ))}
    </div>
  </div>
);
const Skills = () => {
  const skills: {
    title:string,
    iconPath:string
  }[] =  [{
    iconPath: require("../../assets/icon-programming/Python.png"),
    title: "Python"
  }, {
    iconPath: require("../../assets/icon-programming/Java.png"),
    title: "Java"
  }, {
    iconPath: require("../../assets/icon-programming/Javascript.png"),
    title: "Javascript"
  }, {
    iconPath: require("../../assets/icon-programming/Php.png"),
    title: "PHP"
  }, {
    iconPath: require("../../assets/icon-programming/css-1.png"),
    title: "CSS"
  }, {
    iconPath: require("../../assets/icon-programming/html-1.png"),
    title: "HTML"
  }, {
    iconPath: require("../../assets/icon-programming/React.png"),
    title: "Reactjs"
  }, {
    iconPath: require("../../assets/icon-programming/nextjs.svg"),
    title: "Laravel"
  }, {
    iconPath: require("../../assets/icon-programming/nextjs.svg"),
    title: "NextJS"
  }, {
    iconPath: require("../../assets/icon-programming/Python.png"),
    title: "SQL"
  }, {
    iconPath: require("../../assets/icon-programming/Python.png"),
    title: "Database management"
  }, {
    iconPath: require("../../assets/icon-programming/Python.png"),
    title: "MongoDb"
  }, {
    iconPath: require("../../assets/icon-programming/Python.png"),
    title: "Firebase"
  }, {
    iconPath: require("../../assets/icon-programming/Python.png"),
    title: "Moralis"
  }, {
    iconPath: require("../../assets/icon-programming/NodeJs.png"),
    title: "NodeJs"
  }, {
    iconPath: require("../../assets/icon-programming/Python.png"),
    title: "FERN stack"
  }, {
    iconPath: require("../../assets/icon-programming/Python.png"),
    title: "web3"
  }, {
    iconPath: require("../../assets/icon-programming/Python.png"),
    title: "Ai/ML"
  }, {
    iconPath: require("../../assets/icon-programming/Python.png"),
    title: "Flutter"
  }, {
    iconPath: require("../../assets/icon-programming/Python.png"),
    title: "Golang"
  }];
//   const services: string[] = [
//     "Backend Development",
//     "Frontend Development",
//     "Recat Native Development",
//     "ReactJs Development",
//     "Flutter Development",
//     "Python Development",
//   ];
  return (
    <div id="Skills" className=" ms-3  ext-lg h-min-screen ">
      <Row type={"Skills"} data={skills} />
    </div>
  );
};

export default Skills;
