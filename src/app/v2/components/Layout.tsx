import React, { ReactNode } from "react";

import { ThemeNavbar } from "./ThemeNavbar";
import { ProfileCard } from "./ProfileCard/ProfileCard";
import { Container, SideBar } from "./Container";
import styled from "styled-components";

const StyledContainer = styled.div`
  @media (min-width: 1250px) {
    display: flex;
    justify-content: center;
    align-items: stretch;
    margin-inline: auto;
    min-width: 100%;
    gap: 25px;
  }
`;

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <StyledContainer className="h-full  max-md:grid max-md:grid-cols-1 max-md:gap-5 md:mt-[60px] ">
      <SideBar
        id="side-view"
        className=" flex z-20 h-fit md:min-h-[76.5%] rounded-md "
      >
        <ProfileCard />
      </SideBar>
      <Container
        id="view"
        className="flex-col md:min-h-[80%] md:min-w-[50%] md:max-w-[50%] h-fit rounded-md md:col-span-8  relative  overflow-hidden"
      >
        <div className=" flex flex-row justify-end max-md:hidden absolute right-0 w-full h-fit">
          <ThemeNavbar />
        </div>
        <div className="h-[90%]  p-3">{children}</div>
      </Container>
      <div className="md:hidden w-full h-[100px]">
        <ThemeNavbar />
      </div>
    </StyledContainer>
  );
};
