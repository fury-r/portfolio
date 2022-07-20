import logo from "../img/logo.svg";
import test from "../assets/img/test.jpg";
import React, { useState } from "react";
import { Row, Col, Card, FloatingLabel } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import { Routes } from "../Routes/routes";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  NeuromorphicButton,
  Label,
  NeuromorphicCard2,
  NeuroLabel,
} from "../context/component";
const Projects = () => {
  const [style, setStyle] = useState({ display: "block" });
  const [projects,setProjects]=useState([
    {name:'Hospital Management System',img:''},
    {name:'Social Media Web3 App',img:''}
  ])
  return (
    <div className=" flex flex-col ms-4  h-min-screen">

   
        <div className="flex  flex-wrap m-2">
        {projects.map((value,key)=>(
                  <NeuromorphicCard2 key={key} className="w-1/3 theme mx-3  special NeuromorphicCard2  theme">
                  <div>
                    <div className=" flex justify-content-center mb-3"></div>
                    <Card.Img
                      width={50}
                      height={50}
                      onMouseEnter={() => {
                        setStyle({ display: "block" });
                      }}
                      onMouseLeave={() => {
                        setStyle({ display: "none" });
                      }}
                      className="rounded-t"
                      src={test}
                    />{" "}
                    <div className=" flex justify-content-center"></div>
                  </div>
                  <hr />
        
                  <Card.Title className=" mt-3">
                    <p className="font-bold"> {value.name}</p>
                  </Card.Title>

                </NeuromorphicCard2>
        ))}
        </div>
    </div>
  );
};

export default Projects;
