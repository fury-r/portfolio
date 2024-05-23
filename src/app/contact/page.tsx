"use client";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { FormGroup } from "../component/FormGroup";
import { StyledButton, StyledLabel } from "../context/component";
import { useThemeContext } from "../context/ThemeContext/useContext";

const _StyledContainer = styled(Container)`
  width: 25%;
  @media (max-width: 748px) {
    width: 90%;
  }
`;
const Contact = () => {
  const { theme } = useThemeContext();
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
  };
  return (
    <div className="flex flex-col items-center">
      <StyledLabel className="heading-point w-fit">Reach out</StyledLabel>
      <Container
        style={{
          backgroundColor: theme.shade,
          width: "400px",
        }}
        className="p-9 rounded-[10px] shadow-md"
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
            <StyledButton type="submit" className="w-4/12 rounded-[10px] ">
              Submit
            </StyledButton>
          </Container>
        </form>
      </Container>
    </div>
  );
};
export default Contact;
