import React from "react";
import { Container } from "react-bootstrap";
import {
  StyledAccentLabel,
  StyledLabel,
  ThemeBorderContainer,
} from "../context/component";

import { Skills } from "../skills/skills";
import { useTheme } from "styled-components";
const About = () => {
  const theme = useTheme();
  return (
    <Container className="flex flex-col ">
      <div className="w-full flex  justify-center">
        <StyledLabel className="heading-point">About Me</StyledLabel>
      </div>
      <div className="flex flex-col items-start justify-between h-4/5">
        <Container className="flex flex-row justify-between h-fit"></Container>
        <ThemeBorderContainer className=" mt-2 p-4  rounded-[10px] flex flex-col items-center">
          <StyledAccentLabel className="  line leading-8 tracking-wide  grid-cols-1  m-3">
            <p className="text-center font[1.6rem]">
              I am a skilled and experienced software engineer with a
              demonstrated track record of success in full-stack web
              development. With over Three years of experience, I possess a
              strong foundation in various programming languages and
              technologies, including React, Node.js, Python, and Firebase. I am
              proficient in both front-end and back-end development, showcasing
              my versatility and adaptability in the ever-evolving tech
              landscape. My expertise extends beyond coding, as I exhibit
              excellent problem-solving abilities, consistently finding
              solutions to complex bugs and optimizing existing code for
              efficiency.
            </p>
          </StyledAccentLabel>
        </ThemeBorderContainer>
        <div
          //@ts-ignore
          style={{ backgroundColor: theme.color }}
          className=" w-5/12 h-[0.7px] mt-6 self-center"
        ></div>
      </div>
      <Skills />
    </Container>
  );
};
export default About;
