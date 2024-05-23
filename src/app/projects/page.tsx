"use client";
import { Container } from "react-bootstrap";
import Lifeline from "../../assets/projects/lifeline/image_1.png";
import LifelineImage2 from "../../assets/projects/lifeline/image_3.png";

import Leylines from "../../assets/projects/leylines/image_3.png";
import LeylinesImage1 from "../../assets/projects/leylines/image_7.png";
import LeylinesImage2 from "../../assets/projects/leylines/image_11.png";

import AgileSprint from "../../assets/projects/agilemanagement/image_9.jpg";
import AgileSprintImage1 from "../../assets/projects/agilemanagement/image_6.png";
import AgileSprintImage2 from "../../assets/projects/agilemanagement/image_2.png";
import ERP1 from "../../assets/projects/erp/ERP1.png";
import Messenger from "../../assets/projects/chatapp/messenger.png";

import "./css/style.css";
import { MenuItem } from "./types";
import { RowItem } from "./components/RowItem";
import { useModalContext } from "../context/ModalContext/useContext";

const ProjectsMenu: MenuItem[] = [
  {
    title: "Chat Messenger with E2EE ",
    desc: "SecureMessenger is a secure and end-to-end encrypted (E2EE) messaging application designed to prioritize user privacy and data security. ",
    link: "https://github.com/fury-r/encrypted-messenger",

    images: [],
    iconImage: Messenger,
    techStack: [
      "Kotlin",
      "Android",
      "NodeJs",
      "Typescript",
      "Protocol Buffers",
      "Grpc",
      "Firebase",
      "Golang",
      "RabbitMQ",
    ],
  },
  {
    title: "Lifeline",
    desc: `
        Lifeline, a cross-platform healthcare application, seamlessly connects patients, doctors, and other healthcare professionals, revolutionizing the way healthcare is delivered and experienced
        `,
    link: "https://github.com/fury-r/Lifeline",
    images: [Lifeline],
    iconImage: LifelineImage2,
    subItems: [
      {
        title:
          "Lifeline: Bridging the Gap between Healthcare Professionals and Patients",
        desc: `
        Lifeline, a cross-platform healthcare application, seamlessly connects patients, doctors, and other healthcare professionals, revolutionizing the way healthcare is delivered and experienced
        `,
      },
      {
        title:
          "Lifeline bridges the gap between healthcare providers and patients, transforming the healthcare experience through technology.",
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
    techStack: ["ReactJS", "CSS", "Firebase", "NodeJs", "Express", "Sockets"],
  },
  {
    title: "Project Management Web application",
    desc: ` Streamlining Collaboration and Enhancing Productivity`,
    link: "https://github.com/Ayush-Noorani/Agile-Project",
    images: [AgileSprint, AgileSprintImage1, AgileSprintImage2],
    iconImage: AgileSprintImage2,
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
    techStack: [
      "React Typescript",
      "Redux",
      "Python",
      "Python flask",
      "Mongodb",
      "CSS",
      "Sockets",
    ],
  },
  {
    title: "Leylines: A Web3 Social Media",
    desc: `Leylines, a Web3-powered social media application, empowers users with ownership, privacy, and creative freedom`,
    link: "https://github.com/fury-r/web3-social-media",
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
                Next JS
                Tailwind CSS
                Flask
                Solidity`.split("\n"),
      },
    ],
    images: [Leylines, LeylinesImage1, LeylinesImage2],
    iconImage: LeylinesImage2,
    techStack: [
      "Next JS",
      "CSS",
      "TailwindCSS",
      "Python",
      "Python Flask",
      "Mongodb",
      "Web3",
      "MoralisDb",
      "Sockets",
    ],
  },
  {
    title: "ERP Application",
    desc: "The Orders Management System is a robust application designed to streamline business operations by efficiently tracking and managing customer orders. It includes a comprehensive product schema for organizing product structures, along with features for adding, editing, and deleting product information. The system also provides expense tracking to help businesses monitor their financials effectively.",
    link: "https://github.com/fury-r/encrypted-messenger",
    subItems: [],
    images: [ERP1],
    iconImage: ERP1,
    techStack: [
      "React",
      "Redux",
      "Vite",
      "Typescript",
      "Node.js",
      "GraphQL",
      "styled-components",
      "OAuth",
      "JEST",
      "MongoDB",
    ],
  },
];

const Project = () => {
  const { setData } = useModalContext();
  const handleSetData = (data: MenuItem | null) => setData!(data);
  return (
    <Container className="h-full overflow-auto ">
      <Container className="grid grid-cols-1 ">
        {ProjectsMenu.map((item, index) => (
          <RowItem
            pos={index}
            key={index.toString()}
            setSelected={handleSetData}
            {...item}
          />
        ))}
      </Container>
    </Container>
  );
};
export default Project;
