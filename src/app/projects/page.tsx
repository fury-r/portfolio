"use client";
import Image, { StaticImageData } from "next/image";
import { Container } from "react-bootstrap";
import Lifeline from "../../assets/projects/lifeline/image_1.png";
import LifelineImage1 from "../../assets/projects/lifeline/image_2.png";
import LifelineImage2 from "../../assets/projects/lifeline/image_3.png";

import Leylines from "../../assets/projects/leylines/image_3.png";
import LeylinesImage1 from "../../assets/projects/leylines/image_7.png";
import LeylinesImage2 from "../../assets/projects/leylines/image_11.png";

import AgileSprint from "../../assets/projects/agilemanagement/image_9.jpg";
import AgileSprintImage1 from "../../assets/projects/agilemanagement/image_6.png";
import AgileSprintImage2 from "../../assets/projects/agilemanagement/image_2.png";
import { GlassContainer, StyledButton, StyledLabel } from "../context/component";
import "./css/style.css"
import { useState } from "react";
import { MenuItem } from "./types";
import { RowItem } from "./components/RowItem";
import { Modal } from "../component/Modal";
import { ModalChildren } from "./components/ModalChildren";


const ProjectsMenu: MenuItem[] = [
  {
    title:
      "Lifeline: Bridging the Gap between Healthcare Professionals and Patients",
    desc: `
        Lifeline, a cross-platform healthcare application, seamlessly connects patients, doctors, and other healthcare professionals, revolutionizing the way healthcare is delivered and experienced
        `,
    images: [Lifeline],
    iconImage:Lifeline,
    subItems: [
      {
        title:"Lifeline bridges the gap between healthcare providers and patients, transforming the healthcare experience through technology."
      },
      {
        title: "Key Features:",
        points: `Patient-doctor communication
           Appointment booking
           Hospital search
           Medicine ordering
           Secure patient data management`.split("\n"),
      },
      {
        title: "Technologies Used:",
        points: `Reactjs
            CSS
            Sass
            Firebase
            Nodejs`.split("\n"),
      },
    ],
  },
  {
    title:
      "Project Management: Streamlining Collaboration and Enhancing Productivity",
    desc: `Project Management Software: Streamlining Collaboration and Enhancing Productivity`,
    images: [AgileSprint, AgileSprintImage1, AgileSprintImage2],
    iconImage:AgileSprint,
    subItems: [
      {
        title: "Key Features:",
        points: `Content sharing and social networking
            Friend and follower management
            Personalized profile control
            Enhanced privacy settings
            Photo minting into NFTs
            NFT transfer and exchange`.split("\n"),
      },
      {
        title: "Technologies Used:",
        points: `MongoDB
            MoralisDb
            Nextjs
            Tailwind CSS
            Flask
            Solidity`.split("\n"),
      },
    ],
  },
  {
    title: "Leylines: A Web3 Social Media Revolution",
    desc: `Leylines, a Web3-powered social media application, empowers users with ownership, privacy, and creative freedom. Share content, manage connections, and mint your photos into NFTs, all within a secure and decentralized ecosystem.`,
    subItems: [
      {
        title: "Key Features:",
        points: `Content sharing and social networking
                Friend and follower management
                Personalized profile control
                Enhanced privacy settings
                Photo minting into NFTs
                NFT transfer and exchange`.split("\n"),
      },
      {
        title: "Technologies Used:",
        points: `MongoDB
                MoralisDb
                Nextjs
                Tailwind CSS
                Flask
                Solidity`.split("\n"),
      },
    ],
    images: [Leylines, LeylinesImage1, LeylinesImage2],
    iconImage:Leylines
  },
  
];


const Project = () => {
  const [selected,setSelected]=useState<number >(-1)

  return ( 
    <Container>

      <Modal isOpen={selected>=0} setIsOpen={()=>setSelected(-1)} title={selected>=0? ProjectsMenu[selected].title:''}>
        {
          selected>=0?<ModalChildren {...ProjectsMenu[selected]}/>:<></>
        }
      </Modal>
       <div className="grid grid-cols-2  gap-2 ">
      {ProjectsMenu.map((item,index) => (
        <RowItem pos={index} setSelected={setSelected} {...item} />
      ))}
    </div>
    </Container>
  );
};
export default Project;
