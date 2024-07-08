import { Container } from "react-bootstrap";
import { StyledLabel, AnimatedButton } from "./context/component";
import styled from "styled-components";
import { Companies } from "./component/Company";
import Profile from "../assets/profile.jpg";
import { useNavigate } from "react-router-dom";
const IntroductionContainer = styled(Container)`
  width: 70%;
  .blobby-div {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 350px;
    background-color: var(--primary);
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    /* box-shadow: 15px 15px 50px rgba(0,0,0,0.2); */
    animation: morphing 10s infinite;
    overflow: hidden;

    @media (max-width: 740px) {
      width: 250px;
      height: 150px;
    }
  }

  @keyframes morphing {
    0% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      box-shadow: 15px 15px 50px rgba(0, 0, 0, 0.2);
    }
    25% {
      border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
    }
    50% {
      border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
      box-shadow: -10px -5px 50px rgba(0, 0, 0, 0.2);
    }
    75% {
      border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
    }
    100% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      box-shadow: 15px 15px 50px rgba(0, 0, 0, 0.2);
    }
  }

  .text-blob {
    animation: borderline 10s infinite;
  }

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }
  .img {
    align-items: center;
    @media (max-width: 768px) {
      width: 100%;
    }
    transform: scale(0.9);
    border: 1px solid var(--color);
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
const Home = () => {
  const push = useNavigate();
  return (
    <Container className="flex flex-col  items-center w-full mt-10 ">
      <IntroductionContainer className=" ">
        <div className="flex flex-col justify-end items-start mb-10  align-center-sm-device  ">
          <StyledLabel className="  h-16 flex justify-start items-center  rounded-t-3xl rounded-e-3xl  ">
            <StyledLabel className=" text-[32px]">Hello</StyledLabel>
            <img
              height={30}
              className="m-3"
              src={"../assets/Wave.svg"}
              alt={""}
            />
          </StyledLabel>
          <div className="flex items-center justify-start">
            <StyledLabel className="bg-red flex  bolder underline italic text-[32px] ">
              {"I am Rajeev Dessai"}
            </StyledLabel>
          </div>
          <StyledLabel className="text-[25px] font-bold" fontSize={25}>
            A Software Engineer
          </StyledLabel>
          <StyledLabel className="font-bold" fontSize={20}>
            Based in Goa, India.
          </StyledLabel>
          <AnimatedButton
            className="mt-5 rounded-md"
            color="white"
            onClick={() => push("/contact")}
          >
            Contact me
          </AnimatedButton>
        </div>

        <Container className="flex justify-center">
          <img
            src={Profile}
            alt="User photo"
            className=" responsive img blobby-div shadow-md object-fit"
            loading="lazy"
            width={100}
            height={100}
          />
          {/* <BiUser className=" responsive img blobby-div" /> */}
        </Container>
      </IntroductionContainer>
      <Companies />
    </Container>
  );
};

export default Home;
