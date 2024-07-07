import React from "react";
import {
  CategorisedPhotoView,
  TCategorisedPhoto,
} from "../components/CategorisedPhotoView/CategorisedPhotoView";
import LeylinesImage2 from "../../assets/projects/leylines/image_11.png";

import AgileSprintImage2 from "../../assets/projects/agilemanagement/image_2.png";
import ERP1 from "../../assets/projects/erp/ERP1.png";
import Messenger from "../../assets/projects/chatapp/messenger.png";
import FileSharer from "../../assets/projects/filesharer/image.png";
import LifelineImage2 from "../../assets/projects/lifeline/image_3.png";

type TCategory = "Mobile" | "Web";

const ProjectView = () => {
  const ProjectsMenu: TCategorisedPhoto<TCategory>[] = [
    {
      title: "Chat Messenger with E2EE ",
      description:
        "SecureMessenger is a secure and end-to-end encrypted (E2EE) messaging application designed to prioritize user privacy and data security. ",
      url: "https://github.com/fury-r/encrypted-messenger",
      type: "Mobile",
      image: Messenger,
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
      description: `
                Lifeline, a cross-platform healthcare application, seamlessly connects patients, doctors, and other healthcare professionals, revolutionizing the way healthcare is delivered and experienced
                `,
      url: "https://github.com/fury-r/Lifeline",
      image: LifelineImage2,

      techStack: ["ReactJS", "CSS", "Firebase", "NodeJs", "Express", "Sockets"],
      type: "Web",
    },
    {
      title: "Project Management Web application",
      description: ` Streamlining Collaboration and Enhancing Productivity`,
      url: "https://github.com/Ayush-Noorani/Agile-Project",
      image: AgileSprintImage2,

      techStack: [
        "React Typescript",
        "Redux",
        "Python",
        "Python flask",
        "Mongodb",
        "CSS",
        "Sockets",
      ],
      type: "Web",
    },
    {
      title: "Leylines: A Web3 Social Media",
      description: `Leylines, a Web3-powered social media application, empowers users with ownership, privacy, and creative freedom`,
      url: "https://github.com/fury-r/web3-social-media",

      image: LeylinesImage2,
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
      type: "Web",
    },
    {
      title: "ERP Application",
      description:
        "The Orders Management System is a robust application designed to streamline business operations by efficiently tracking and managing customer orders. It includes a comprehensive product schema for organizing product structures, along with features for adding, editing, and deleting product information. The system also provides expense tracking to help businesses monitor their financials effectively.",
      url: "https://github.com/fury-r/encrypted-messenger",
      image: ERP1,
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
      type: "Web",
    },
    {
      title: "File Sharer",
      description:
        "The FileShare Web Application is a platform built to facilitate easy sharing of files through file uploads and QR code generation. It utilizes React with TypeScript on the frontend and Django with Python on the backend. The app allows users to upload files, generate QR codes for those files, and share them effortlessly.",
      url: "https://github.com/fury-r/filesharer",
      image: FileSharer,
      techStack: [
        "React",
        "Vite",
        "Typescript",
        "Tailwind",
        "Socket",
        "Python",
        "Django",
        "SQLite",
      ],
      type: "Web",
    },
  ];
  return (
    <CategorisedPhotoView<TCategory>
      data={ProjectsMenu}
      onClick={(value: TCategorisedPhoto<TCategory>) => {
        const a = document.createElement("a");
        a.href = value.url;
        a.target = "_blank";
        document.appendChild(a);
        a.click();
        document.removeChild(a);
      }}
    />
  );
};

export default ProjectView;
