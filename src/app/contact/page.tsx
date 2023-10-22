"use client";
import { Container, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { FormGroup } from "../component/FormGroup";
import { StyledButton, StyledLabel } from "../context/component";
import {
  DetailedHTMLProps,
  FormEvent,
  FormEventHandler,
  FormHTMLAttributes,
} from "react";

const Contact = () => {
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
  };
  return (
    <div className="flex flex-col items-center">
      <StyledLabel className="heading-point w-fit">Reach out</StyledLabel>

      <form className="grid grid-cols-1" onSubmit={handleOnSubmit}>
        <FormGroup name="name" title="Name" value="" />
        <FormGroup name="email" title="Email" value="" />
        <FormGroup
          name="description"
          title="Description"
          textArea={true}
          value=""
        />
        <Container className="flex justify-center">
          <StyledButton type="submit" className="w-4/12 ">
            Submit
          </StyledButton>
        </Container>
      </form>
    </div>
  );
};
export default Contact;
