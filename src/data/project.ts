import LeylinesImage2 from "../assets/projects/leylines/image_11.png";

import AgileSprintImage2 from "../assets/projects/agilemanagement/image_2.png";
import ERP1 from "../assets/projects/erp/ERP1.png";
import Messenger from "../assets/projects/chatapp/messenger.png";
import FileSharer from "../assets/projects/filesharer/image.png";
import LifelineImage2 from "../assets/projects/lifeline/image_3.png";
import { TCategorisedPhoto, TCategory } from "../types/component";

export const ProjectsMenu: TCategorisedPhoto<TCategory>[] = [
  {
    title: "SecureMessenger (E2EE)",
    description:
      "Secure and end-to-end encrypted messaging app with Kotlin Android client, gRPC + Protocol Buffers communication, Node.js middleware, and Go backend services.",
    link: "https://github.com/fury-r/encrypted-messenger",
    type: "Mobile",
    image: Messenger,
    subItems: [
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
    title: "MCP WebRTC Transport",
    description:
      "Monorepo for a WebRTC-based MCP transport demo with a reusable TypeScript package, React + Vite frontend, and Django Channels signaling backend.",
    link: "https://github.com/fury-r/mcp-webrtc-transport",
    image: FileSharer,
    subItems: [
      "TypeScript",
      "React",
      "Vite",
      "WebRTC",
      "MCP",
      "Django",
      "Channels",
    ],
    type: "Web",
  },
  {
    title: "Medical Chatbot RAG",
    description:
      "Flask-based medical chatbot using Retrieval-Augmented Generation with Llama 2, Pinecone vector search, and Hugging Face integrations.",
    link: "https://github.com/fury-r/medical-chatbot-rag",
    image: LifelineImage2,
    subItems: [
      "Python",
      "Python Flask",
      "RAG",
      "Llama 2",
      "Pinecone",
      "Hugging Face",
      "JavaScript",
    ],
    type: "Web",
  },
  {
    title: "MCQ Generator with LangChain",
    description:
      "Streamlit app that turns uploaded documents into multiple-choice quizzes using LangChain and OpenAI models, deployed on AWS EC2.",
    link: "https://github.com/fury-r/ai-mcq-generator",
    image: ERP1,
    subItems: [
      "Python",
      "Streamlit",
      "LangChain",
      "OpenAI",
      "AWS EC2",
    ],
    type: "Web",
  },
  {
    title: "Web3 Social Media POC",
    description:
      "Proof-of-concept social media app with messaging, profile management, feed interactions, and NFT transfers powered by Next.js, Flask, and Solidity.",
    link: "https://github.com/fury-r/leylines-web3",
    image: LeylinesImage2,
    subItems: [
      "Next.js",
      "Flask",
      "Solidity",
      "MongoDB",
      "Web3",
      "Moralis",
    ],
    type: "Web",
  },
  {
    title: "CRUD To-Do App",
    description:
      "Full-stack to-do starter kit with React + TypeScript frontend and Node.js + Express backend using SQLite and JWT-based authentication.",
    link: "https://github.com/fury-r/crud-to-do-app",
    image: AgileSprintImage2,
    subItems: [
      "React",
      "Typescript",
      "Node.js",
      "Express",
      "SQLite",
      "JWT",
      "Redux",
    ],
    type: "Web",
  },
];
