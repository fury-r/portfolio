import React, { useState } from "react";
import {
  NeuromorphicButton,
  NeuromorphicCard,
  NeuromorphicImage,
  Label,
} from "../../context/component";
import {  Col, Card, FloatingLabel } from "react-bootstrap";

const Row=({type,data,setPopup})=>(
  <div className="flex flex-col">
  <label className="text-2xl font-semibold border-b-2 opacity-80 w-1/4 pb-2 ">
  {type}
</label>

<div className="flex flex-row flex-wrap">
  {data.map((value, key) => (
    <NeuromorphicButton
      className="transform hover:scale-100 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-1/4 m-4"
      key={key}
    >
      {value}
    </NeuromorphicButton>
  ))}
</div>
</div>
)
const Skills = () => {
  const [Popup, setPopup] = useState(false);

  const FetchInfo = () => {
    setPopup(true);
  };
  const [open, setOpen] = useState(false);

  const [skills, setSkills] = useState([
    "Python", "Java", "Javascript",
    "PHP", "CSS", "HTML",
    "Reactjs", "NextJS", "Laravel",
    "SQL", "NOSQL", "Database management",
    "MongoDb", "Firebase", "Moralis",
    "MERN", "FERN","web3" ,
  ]);
  const [services, setSevices] = useState([
    "Software Development",
    "Backend Development",
    "Frontend Development",
    "Recat Native Development",
    "ReactJs Development",
    "Flutter Development","Python Development",
  ]);
  const [learning, setLearning] = useState([
 'Flutter','Machine Learning'
  ]);
  return (
    <div id="Skills" className=" ms-3  ext-lg h-min-screen ">
      <Row type={'Knowledge'} data={skills}/>
      <Row type={'Services'} data={services}/>
      <Row type={'Learning'} data={learning}/>
    </div>
  );
};

export default Skills;
