import React, { useState } from "react";
import {
  NeuromorphicButton,
  NeuromorphicCard,
  NeuromorphicImage,
  Label,
} from "../../context/component";
import { Row, Col, Card, FloatingLabel } from "react-bootstrap";

const Skills = () => {
  const [Popup, setPopup] = useState(false);

  const FetchInfo = () => {
    setPopup(true);
  };
  const [open, setOpen] = useState(false);

  const [skills, setSkills] = useState([
    ["Python", "Java", "Javascript"],
    ["PHP", "CSS", "HTML"],
    ["Reactjs", "NextJS", "Laravel"],
    ["SQL", "NOSQL", "Database management"],
    ["MongoDb", "Firebase", "Moralis"],
    ["MERN", "FERN", "MPFR"],
    ["web3", "Nodejs"],
  ]);
  const [knowledge, setKnwowledge] = useState([
    "Software Development",
    "Backend Development",
    "Frontend Development",
    "Recat Native Development",
    "ReactJs Development",
    "Flutter Development",
  ]);
  return (
    <div id="Skills" className=" ms-3  ext-lg ">
        <label className="text-3xl opacity-60  border-b-2">Skills</label>
      <div className="flex flex-col">
        {skills.map((value, key) => (
          <div className="flex flex-row justify-around" key={key}>
            {value.map((v, k) => (
              <NeuromorphicButton
                className="transform hover:scale-100 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-1/4 m-4"
                key={k}
              >
                {v}
              </NeuromorphicButton>
            ))}
          </div>
        ))}
      </div>
      <label className="mt-4 font-semibold  border-b-2  border-red-50">
        Industry Knowledge
      </label>

      <div className="flex flex-row flex-wrap">
        {knowledge.map((value, key) => (
          <NeuromorphicButton
            className="transform hover:scale-100 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-1/4 m-4"
            key={key}
          >
            {value}
          </NeuromorphicButton>
        ))}
      </div>
    </div>
  );
};

export default Skills;
