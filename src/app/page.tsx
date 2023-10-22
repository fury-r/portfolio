"use client";
import React from "react";
import { Container } from "react-bootstrap";
import { StyledLabel } from "./context/component";
import Image from "next/image";
import "./css/introduction.css";
import { BiUser } from "react-icons/bi";
import styled from "styled-components";
import { Companies } from "./component/Company";

const IntroductionContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .img {
    align-items: center;
    @media (max-width: 768px) {
      width: 50%;
    }
  }
  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }
`;
const App = () => {
  return (
    <Container className="flex flex-col  items-center w-fit ">
      <IntroductionContainer className="">
        <div className="flex flex-col justify-start items-start  ">
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
            <Image height={50} src={require("../assets/Wave.svg")} alt={""} />
          </div>
          <StyledLabel fontWeight={"bolder"} fontSize={20}>
            A Software Engineer
          </StyledLabel>
          <StyledLabel fontWeight={"bolder"} fontSize={20}>
            Based in Goa, India.
          </StyledLabel>
        </div>
        {/* <Image
          src={require("./assets/pic.png")}
          
          alt="User Photo"
   
          className=" responsive  blobby-div"
          style={{ transform: "translateZ(30px)", objectFit: "cover",height:"70%" }}
        /> */}
        <Container className="flex justify-center">
          <BiUser className=" responsive img blobby-div" />
        </Container>
      </IntroductionContainer>
      <Companies />
    </Container>
  );
};

export default App;
