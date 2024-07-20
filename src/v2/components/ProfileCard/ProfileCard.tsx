import Profile from "../../../assets/profile.jpg";
import { IoIosArrowDown } from "react-icons/io";

import styled from "styled-components";
import { Contacts } from "./components/Contacts";
import { ShadowContainer } from "../Container";
import { useRef, useState } from "react";
import SocialFooter from "../../../components/SocialFooter/SocialFooter";
import { useDataContext } from "../../../context/DataContext/useContext";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import AnimateInView from "../AnimateInView/AnimateInView";

export const StyledShadowContainer = styled(ShadowContainer)`
  border-top: 0;
  border-right: 0;
  border-radius: 0 0 0 var(--rounded);
`;

export const StyledContainer = styled(motion.div)`
  min-height: fit-content;
  width: 100%;
  @media (max-width: 1920px) {
    display: flex;
    flex-direction: column;
  }
  position: relative;

  .conditional-btn {
    display: none;
    @media (max-width: 800px) {
      display: initial;
    }
  }

  .hide-contacts {
    display: initial;
    @media (max-width: 800px) {
      display: none;
    }
  }
`;

export const ProfileCard = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const animateOnLoad = location.pathname.length === 3;
  const [animate, setAnimate] = useState(false); // animation toggle
  const { profile } = useDataContext();
  const isMobile = useMediaQuery("md");

  return (
    <StyledContainer
      className="transition"
      onAnimationStart={() => {
        if (!animate && isMobile && divRef.current) {
          divRef.current!.style.display! = "none";
        } else if (!isMobile && divRef.current) {
          divRef.current!.style.display! = "initial";
        }
      }}
      animate={{
        ...(isMobile
          ? { height: animate ? 400 : 200 }
          : { height: "fit-content" }),
      }}
      onAnimationComplete={() => {
        if (animate && isMobile && divRef.current) {
          divRef.current!.style.display! = "initial";
        }
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="flex flex-row justify-end min-[1250px]:hidden absolute right-0 ">
        <StyledShadowContainer
          className=" p-3 rounded-bl-lg border-none conditional-btn"
          onClick={() => setAnimate((prev) => !prev)}
        >
          <IoIosArrowDown />
        </StyledShadowContainer>
      </div>
      <div className="grid xl:grid-cols-1 gap-4 my-4 items-center max-[1250px]:grid-cols-2 md:p-3  w-full h-[50%] p-2">
        <AnimateInView
          animate={animateOnLoad}
          className=" rounded-md flex flex-col items-center  "
        >
          <img
            width={100}
            className="m-3 rounded-md object-fit"
            src={profile.picture || Profile}
            alt={"Profile picture"}
          />
        </AnimateInView>
        <AnimateInView
          animate={animateOnLoad}
          className="flex flex-col items-center justify-between max-lg:items-start  "
        >
          <div>{profile.name}</div>
          <div
            className=" p-2 rounded-lg my-2 "
            style={{ background: "var(--primary)" }}
          >
            <label className="text-sm font-semibold ">{profile.position}</label>
          </div>
        </AnimateInView>
      </div>
      <div
        id="desktop-contacts "
        ref={divRef}
        className={`h-[50%] ${isMobile && "hide-contacts"} mt-2`}
      >
        <AnimateInView animate={animateOnLoad && !isMobile}>
          <Contacts />
          <div className={` flex flex-row justify-center `}>
            <SocialFooter />
          </div>
        </AnimateInView>
      </div>
    </StyledContainer>
  );
};
