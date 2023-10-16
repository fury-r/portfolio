import React from "react";
import { Container } from "react-bootstrap";
import { StyledLabel } from "../context/component";
const About = () => {
  return ( 
    <Container className="flex flex-row h-[80vh]  items-center w-[70rem] ">
      <div className="flex flex-col items-start justify-between h-4/5">
      <Container className="flex flex-row justify-between h-1/2">
        <div className="flex justify-between items-end h-14 w-full ">
          <StyledLabel className="flex text-lg">This is it.</StyledLabel>

          <div className="bg-black w-11/12 h-[0.7px] mb-2 "></div>
        </div>
      </Container>
      <Container className="bg-white mt-2 p-4 shadow-md rounded-lg flex flex-col items-center">
      <StyledLabel className=" text-black line leading-8 tracking-wide ">
        <ul   >
  
        <li>
        I am a skilled and experienced software engineer with a demonstrated
        track record of success in full-stack web development. With over two
        years of experience, I possess a strong foundation in various
        programming languages and technologies, including React, Node.js,
        Python, and Firebase. I am proficient in both front-end and back-end
        development, showcasing my versatility and adaptability in the
        ever-evolving tech landscape.
        </li>
        <li>
        My expertise extends beyond coding, as I
        exhibit excellent problem-solving abilities, consistently finding
        solutions to complex bugs and optimizing existing code for efficiency. I
        am a team player, effectively collaborating with colleagues to deliver
        high-quality products on time. My eagerness to learn new technologies
        and embrace new challenges highlights my commitment to continuous growth
        and professional development. Currently, I am employed as a Software
        Development Consultant at Oqton, where I manage front-end development
        using React, Redux, and CSS, while also handling middleware tasks with
        Node.js. My previous experience includes roles as a Consultant Engineer
        at 13th June Infotech Private Limited and a Full Stack Developer at Ctrl
        Save Pvt Ltd. 
        </li>
        <li>
        In summary, I am a highly accomplished software engineer
        with a passion for technology and a proven ability to deliver results.
        My expertise, adaptability, and continuous learning mindset make me an
        asset to any team or organization.
        </li>
        </ul>
      </StyledLabel>
      </Container>
     <div className="bg-black w-5/12 h-[0.7px] mt-6 self-center"></div>
        </div>
    </Container>
  );
};
export default About;
