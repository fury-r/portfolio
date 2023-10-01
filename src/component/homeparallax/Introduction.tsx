import React from "react";
import Tilty from "react-tilty";
import Pic from "../../assets/img/pic.png";
import { Image } from "react-bootstrap";
const Introduction = () => {
  return (
    <div className="flex flex-col min-h-screen justify-start   ">
      <div className="flex flex-row justify-around items-center ">
        <div className="p-3 bg-white rounded-2xl mt-4  flex flex-col px-4 ">
          <label className="text-xl text-gray-500">
            Hello there, Welcome to my site.
          </label>
          <label className="text-3xl font-semibold text-gray-500">
            I'm Rajeev Dessai
          </label>
          <label className="text-3xl font-semibold text-red-400">
            {" "}
            A Software Engineer
          </label>
        </div>

        <Tilty style={{ transformStyle: "preserve-3d" }} className="p-2 mt-10 ">
          <Image
            src={Pic}
            fluid
            alt="User Photo"
            width="150"
            className="neuromorphic-border-animation responsive border-2 "
            roundedCircle
            style={{ transform: "translateZ(30px)", objectFit: "cover" }}
          />
        </Tilty>
      </div>
    </div>
  );
};
export default Introduction;
