import { Container } from "react-bootstrap";
import styled from "styled-components";
import { TCompany } from "./types";
import Oqton from "../../assets/company/DarkOqton.svg";
import CtrlSaveDark from "../../assets/company/ctrlsave.png";
import CtrlSaveWhite from "../../assets/company/ctrlsave-white.png";

import Image from "next/image";
import Vtech from "../../assets/company/vtech.png";
import { StyledLabel, ThemeContainer } from "../context/component";
import { useAuth } from "../context/Authcontext";

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
`;

export const Companies = () => {
  const { main } = useAuth();
  const companies: TCompany[] = [
    {
      name: "Oqton",
      duration: "Dec 2022 - Present",
      image: Oqton,
      site: "https://oqton.com",
      role: "Software Development Consultant",
    },
    {
      name: "13th June Infotech",
      duration: "Sept 2022 - Nov 2022",
      site: "https://www.linkedin.com/company/13thjune-infotech-private-limited/about/",
      role: "Consultant/Frontend Engineer",
    },
    {
      name: "Ctrl Save Pvt Ltd",
      duration: "Oct 2021 - Sept 2022",
      image: main ? CtrlSaveDark : CtrlSaveWhite,
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
  ];
  return (
    <Container>
      <StyledLabel className="heading-point">Where I’ve Worked</StyledLabel>

      <StyledContainer>
        {companies.map((company) => (
          <ThemeContainer className="flex flex-col items-center h-36 p-2 rounded-[10px] justify-center w-[320px] ">
            {company.image && (
              <Image
                className="img relative top-[-10px] text-slate-950 "
                src={company.image}
                alt={company.name}
                onClick={() => window.open(company.site)}
                objectFit="cover"
              />
            )}
            <StyledLabel className="text-lg whitespace-nowrap font-bold">
              {company.role}
            </StyledLabel>
            <StyledLabel className="italic">{company.duration}</StyledLabel>
          </ThemeContainer>
        ))}
      </StyledContainer>
    </Container>
  );
};
