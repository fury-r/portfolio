import Profile from "../../../assets/profile.jpg";
import { IoIosArrowDown } from "react-icons/io";

import styled from "styled-components";
import { Contacts } from "./components/Contacts";
import { ShadowContainer } from "../Container";
import { useState } from "react";
import SocialFooter from "../../../components/SocialFooter/SocialFooter";
import { useDataContext } from "../../../context/DataContext/useContext";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

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
  const [show, setShow] = useState(false);
  const { profile } = useDataContext();
  const isMobile = useMediaQuery("md");

  return (
    <StyledContainer
      className="transition"
      animate={{
        ...(isMobile ? { height: show ? 400 : 200 } : {}),
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="flex flex-row justify-end min-[1250px]:hidden absolute right-0 ">
        <StyledShadowContainer
          className=" p-3 rounded-bl-lg border-none conditional-btn"
          onClick={() => setShow((prev) => !prev)}
        >
          <IoIosArrowDown />
        </StyledShadowContainer>
      </div>
      <div className="grid xl:grid-cols-1 gap-4 my-4 items-center max-[1250px]:grid-cols-2 md:p-3  w-full h-[50%] p-2">
        <div className=" rounded-md flex flex-col items-center  ">
          <img
            width={100}
            className="m-3 rounded-md object-fit"
            src={profile.picture || Profile}
            alt={"Profile picture"}
          />
        </div>
        <div className="flex flex-col items-center justify-between max-lg:items-start  ">
          <div>{profile.name}</div>
          <div
            className=" p-2 rounded-lg my-2 "
            style={{ background: "var(--primary)" }}
          >
            <label className="text-sm font-semibold ">{profile.position}</label>
          </div>
        </div>
      </div>
      <div
        id="desktop-contacts "
        className={`h-[50%] ${!show && "hide-contacts"} mt-2`}
      >
        <Contacts />
        <div className={` flex flex-row justify-center `}>
          <SocialFooter />
        </div>
      </div>
    </StyledContainer>
  );
};
