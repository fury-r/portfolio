import { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Loader } from "../../components/Loader";
import { ThemeNavbar } from "./ThemeNavbar";
import { ProfileCard } from "./ProfileCard/ProfileCard";
import { Container, SideBar } from "./Container";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import AnimateInView from "./AnimateInView/AnimateInView";

const StyledContainer = styled(motion.div)`
  .layout {
    display: flex;
    justify-content: center;
    align-items: stretch;
    margin-inline: auto;
    min-width: 100%;
    gap: 25px;
    padding: var(--padding);

    @media (max-width: 800px) {
      display: grid;
      grid-column: 1;
    }
  }
  .bottom-nav {
    display: none;
    @media (max-width: 800px) {
      display: initial;
      position: fixed;
      bottom: 0px;
      width: 100%;
      left: 0px;
      right: 0px;
    }
  }
  .top-nav {
    position: sticky;
    z-index: 10;
    @media (max-width: 800px) {
      display: none;
    }
  }

  .section-1 {
    width: 22%;
    height: 100%;
    @media (max-width: 800px) {
      width: 100%;
    }
  }
  .section-2 {
    width: 60%;
    margin-top: 45px;
    @media (max-width: 800px) {
      width: 100%;
      margin-top: 0;
    }
  }
`;

export const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = location.pathname;
  const [splash, setSplash] = useState(pathname.length > 1);
  const isMobile = useMediaQuery("md");
  const [isAnimationFinished, setIsAnimationFinished] = useState(true);

  useEffect(() => {
    let interval;
    if (!splash) {
      interval = setTimeout(() => {
        console.log("true");
        setSplash(true);
      }, 1000);
    }
    if (splash && interval) {
      clearInterval(interval);
    }
  }, [setSplash, splash]);

  return !splash ? (
    <Loader />
  ) : (
    <StyledContainer>
      <motion.div
        onAnimationComplete={() => setIsAnimationFinished(true)}
        transition={{ ease: "easeIn", duration: 1.5 }}
        className="h-full w-full gap-5 layout transition"
        {...(!isAnimationFinished
          ? {
              initial: { [isMobile ? "x" : "y"]: [isMobile ? 500 : -500] },
              animate: { [isMobile ? "x" : "y"]: 0 },
            }
          : {})}
      >
        <SideBar
          id="side-view"
          className="flex z-20 h-fit  rounded-md   transit  col-span-1 section-1"
        >
          <ProfileCard />
        </SideBar>
        <Container
          id="view"
          className="flex-col w-fit  md:min-h-[80%] h-fit rounded-md   mb-32 col-span-1 section-2"
        >
          {isAnimationFinished && (
            <>
              <div className="w-full flex flex-row justify-end top-nav ">
                <AnimateInView className="absolute right-0 h-fit  w-[60%]  ">
                  <ThemeNavbar />
                </AnimateInView>
              </div>
              <div className="h-[90%]  p-3">{children}</div>
            </>
          )}
        </Container>
      </motion.div>
      <div className="bottom-nav p-0">
        <ThemeNavbar />
      </div>
    </StyledContainer>
  );
};
