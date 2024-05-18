import React from "react";
import { Container } from "react-bootstrap";
import { StyledLabel, AnimatedButton } from "../../context/component";
import Image from "next/image";
import "../css/introduction.css";
export const Landing = () => {
  return (
    <Container className="flex flex-row h-[80vh]  items-center w-[70rem] ">
      <Container className="flex flex-row justify-between h-1/2">
        <div className="flex flex-col justify-start items-start ">
          <div className="bg-white w-32  h-16 flex justify-center items-center shadow-lg rounded-t-3xl rounded-e-3xl ">
            <label className="border-solid border-red-500 text-black">
              Hello
            </label>
          </div>
          <div className="flex items-center justify-start">
            <StyledLabel
              className="bg-red flex  bolder underline italic  "
              fontSize={30}
            >
              {"I'm Rajeev Dessai"}
            </StyledLabel>
            <Image
              height={50}
              src={require("../../../assets/Wave.svg")}
              alt={""}
            />
          </div>
          <StyledLabel fontWeight={"bolder"} fontSize={20}>
            A Software Engineer
          </StyledLabel>
          <StyledLabel fontWeight={"bolder"} fontSize={20}>
            Based in Goa, India.
          </StyledLabel>
        </div>
        <Image
          src={require("../../../assets/pic.png")}
          alt="User Photo"
          className=" responsive border-2  blobby-div"
          style={{
            transform: "translateZ(30px)",
            objectFit: "cover",
            height: "70%",
          }}
        />
      </Container>
    </Container>
  );
};
