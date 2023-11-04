"use client";
import React from "react";
import { Container } from "react-bootstrap";
import { StyledLabel, ThemeContainer } from "./context/component";
import Image from "next/image";
import "./css/introduction.css";
import { BiUser } from "react-icons/bi";
import styled from "styled-components";
import { Companies } from "./component/Company";
import { Metadata } from "next";
import Profile from "../assets/profile.jpg";
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
    <Container className="flex flex-col  items-center w-fit mt-10 ">
      <IntroductionContainer className=" ">
        <div className="flex flex-col justify-end items-start mb-10  ">
          <StyledLabel className=" w-32  h-16 flex justify-start items-center    rounded-t-3xl rounded-e-3xl ">
            <StyledLabel className=" text-[32px]">Hello</StyledLabel>
            <Image height={30} src={require("../assets/Wave.svg")} alt={""} />
          </StyledLabel>
          <div className="flex items-center justify-start">
            <StyledLabel className="bg-red flex  bolder underline italic text-[32px] ">
              {"I'm Rajeev Dessai"}
            </StyledLabel>
          </div>
          <StyledLabel
            fontWeight={"bolder"}
            className="text-[25px]"
            fontSize={25}
          >
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
          <Image
            src={Profile}
            alt="User photo"
            objectFit="scale-down"
            className=" responsive img blobby-div shadow-md"
          />
          {/* <BiUser className=" responsive img blobby-div" /> */}
        </Container>
      </IntroductionContainer>
      <Companies />
    </Container>
  );
};

export default App;
