"use client";
import styled from "styled-components";
import { FormGroup } from "../component/FormGroup";
import { StyledButton, StyledLabel } from "../context/component";
import { useThemeContext } from "../context/ThemeContext/useContext";
import { Container } from "react-bootstrap";

const StyledContainer = styled(Container)`
  width: 400px;
  @media (max-width: 748px) {
    width: 70%;
  }
`;
const Contact = () => {
  const { theme } = useThemeContext();
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col items-center">
      <StyledLabel className="heading-point w-fit">Reach out</StyledLabel>
      <StyledContainer
        style={{
          backgroundColor: theme.shade,
        }}
        className="p-9 rounded-[10px] shadow-md md:w-2/3 w-[400px]"
      >
        <form className="grid grid-cols-1 gap-2" onSubmit={handleOnSubmit}>
          <FormGroup name="name" title="Name" value="" />
          <FormGroup name="email" title="Email" value="" />
          <FormGroup
            name="description"
            title="Description"
            textArea={true}
            value=""
          />
          <Container className="flex justify-center">
            <StyledButton
              type="submit"
              className="w-4/12 rounded-[10px] "
              disabled
            >
              Submit
            </StyledButton>
          </Container>
        </form>
      </StyledContainer>
    </div>
  );
};
export default Contact;
