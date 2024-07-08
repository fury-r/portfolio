import { TItem } from "../types/page";
import Python from "../assets/iconprogramming/Python.svg";

import Java from "../assets/iconprogramming/Java.svg";
import Php from "../assets/iconprogramming/Php.svg";
import CSS from "../assets/iconprogramming/css.svg";
import Html from "../assets/iconprogramming/html.svg";
import ReactJs from "../assets/iconprogramming/React.svg";
import NodeJs from "../assets/iconprogramming/NodeJs.svg";
import Javascript from "../assets/iconprogramming/javascript.svg";
import Golang from "../assets/iconprogramming/Go.svg";
import Grpc from "../assets/iconprogramming/grpc.png";
import NodejsDark from "../assets/iconprogramming/NodejsDark.svg";

import Cpp from "../assets/iconprogramming/C++.svg";
import Sql from "../assets/iconprogramming/sql.svg";
import Mongo from "../assets/iconprogramming/mongodb.svg";
import Moralis from "../assets/iconprogramming/moralis.png";
import FireBase from "../assets/iconprogramming/firebase.svg";
import Fluter from "../assets/iconprogramming/flutter.svg";
import Ai from "../assets/iconprogramming/ai-network.svg";

import Kotlin from "../assets/iconprogramming/kotlin.svg";
import Laravel from "../assets/iconprogramming/laravel.svg";
import NextJs from "../assets/iconprogramming/next-js.svg";
import Docker from "../assets/iconprogramming/docker.svg";
import Git from "../assets/iconprogramming/Git.svg";
import TailwindCSS from "../assets/iconprogramming/tailwind-css.svg";
import { MODE } from "../types/theme";

export const getTech = (mode: MODE): TItem[] => [
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
    iconPath: mode === "LIGHT" ? NodejsDark : NodeJs,
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
