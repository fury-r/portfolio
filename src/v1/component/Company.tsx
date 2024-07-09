import { Container } from "react-bootstrap";
import styled from "styled-components";
import { TCompany } from "./types";

import {
  StyledAccentLabel,
  StyledLabel,
  ThemeBorderContainer,
} from "../context/component";
import { useMemo } from "react";
import { useThemeContext } from "../context/ThemeContext/useContext";
import { getCompany } from "../../data/company";

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
  const companies: TCompany[] = useMemo(() => getCompany(main), [main]);
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
              <img
                className="img relative top-[-10px] text-slate-950  object-fit"
                src={company.image}
                alt={company.name}
                onClick={() => window.open(company.site)}
              />
            ) : (
              <StyledAccentLabel className="font-bold text-2xl">
                {company.name}
              </StyledAccentLabel>
            )}
            <StyledAccentLabel className="text-lg whitespace-nowrap font-bold">
              {company.title}
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
