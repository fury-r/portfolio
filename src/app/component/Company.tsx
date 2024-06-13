import { Container } from "react-bootstrap";
import styled from "styled-components";
import { TCompany } from "./types";
import DarkOqton from "../../assets/company/DarkOqton.svg";
import LightOqton from "../../assets/company/LightOqton.svg";

import CtrlSaveDark from "../../assets/company/ctrlsave.png";
import CtrlSaveWhite from "../../assets/company/ctrlsave-white.png";

import Image from "next/image";
import Vtech from "../../assets/company/vtech.png";
import {
  StyledAccentLabel,
  StyledLabel,
  ThemeBorderContainer,
} from "../context/component";
import { useMemo } from "react";
import { useThemeContext } from "../context/ThemeContext/useContext";

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1224px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  @media (max-width: 730px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .img {
    width: 40%;
    height: 40px;
    filter: grayscale(80%) contrast(1) brightness(90%);
  }
  .pointer {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const Companies = () => {
  const { main } = useThemeContext();
  const companies: TCompany[] = useMemo(
    () => [
      {
        name: "Oqton",
        duration: "Dec 2022 - Present",
        image: main === "DARK" ? LightOqton : DarkOqton,
        site: "https://oqton.com",
        role: "Software Development Consultant",
      },
      {
        name: "13th June Infotech Pvt Ltd",
        duration: "Sept 2022 - Nov 2022",
        site: "https://www.linkedin.com/company/13thjune-infotech-private-limited/about/",
        role: "Consultant/Frontend Engineer",
      },
      {
        name: "Ctrl Save Pvt Ltd",
        duration: "Oct 2021 - Sept 2022",
        image: main === "DARK" ? CtrlSaveWhite : CtrlSaveDark,
        site: "https://www.ctrlsave.in/",
        role: "Full Stack Developer",
      },
      {
        name: "VTech",
        duration: "May 2019 - June 2019",
        image: Vtech,
        site: "https://vtechgoa.com/",
        role: "Web Developer",
      },
    ],
    [main]
  );
  return (
    <Container>
      <div className="w-full flex  justify-center">
        <StyledLabel className="heading-point">Work Experience</StyledLabel>
      </div>
      <StyledContainer>
        {companies.map((company, index) => (
          <ThemeBorderContainer
            key={index.toString()}
            className="flex flex-col items-center h-36 p-2 rounded-[10px] justify-center w-[320px] pointer "
          >
            {company.image ? (
              <Image
                className="img relative top-[-10px] text-slate-950 "
                src={company.image}
                alt={company.name}
                onClick={() => window.open(company.site)}
                objectFit="cover"
              />
            ) : (
              <StyledAccentLabel className="font-bold text-2xl">
                {company.name}
              </StyledAccentLabel>
            )}
            <StyledAccentLabel className="text-lg whitespace-nowrap font-bold">
              {company.role}
            </StyledAccentLabel>
            <StyledAccentLabel className="italic">
              {company.duration}
            </StyledAccentLabel>
          </ThemeBorderContainer>
        ))}
      </StyledContainer>
    </Container>
  );
};
