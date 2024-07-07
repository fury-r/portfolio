import styled from "styled-components";
import { FormGroup } from "../component/FormGroup";
import { AnimatedButton, StyledLabel } from "../context/component";
import { useThemeContext } from "../context/ThemeContext/useContext";
import { Container } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const StyledContainer = styled(Container)`
  width: 400px;
  @media (max-width: 748px) {
    width: 70%;
  }
`;
const Contact = () => {
  const { theme } = useThemeContext();
  const [captchaVerified, setCaptchaVerified] = useState(true);
  const form = useRef<HTMLFormElement>(null);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_APP_PUBLIC_SERVICE_ID!,
        import.meta.env.VITE_APP_PUBLIC_TEMPLATE_ID!,
        form.current as HTMLFormElement,
        {
          publicKey: import.meta.env.VITE_APP_PUBLIC_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          toast.success("Message has been sent.Thank You 🙂!");
        },
        (error) => {
          console.error(error);
          toast.error("Failed to send.Try again 🙁!");
        }
      );
    form.current?.reset();
  };

  return (
    <div className="flex flex-col items-center">
      <StyledLabel className="heading-point w-fit">Reach out</StyledLabel>
      <StyledContainer
        style={{
          border: `1px solid  ${theme.primary}`,
        }}
        className="p-10  rounded-[10px] shadow-sm md:w-2/3 w-[400px] "
      >
        <form
          ref={form}
          className="grid grid-cols-1 gap-2"
          onSubmit={handleOnSubmit}
        >
          <FormGroup name="user_name" title="Name" value="" />
          <FormGroup name="user_email" title="Email" value="" />
          <FormGroup
            name="user_description"
            title="Description"
            textArea={true}
            value=""
          />
          <div className="flex justify-center m-4 ">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_APP_PUBLIC_SITE_KEY!}
              onChange={(e) => {
                setCaptchaVerified(e === null);
              }}
            />
          </div>
          <Container className="flex justify-center">
            <AnimatedButton
              type="submit"
              className={`w-4/12 rounded-[10px] ${
                captchaVerified ? "disabled" : ""
              }`}
              disabled={captchaVerified}
            >
              Submit
            </AnimatedButton>
          </Container>
        </form>
      </StyledContainer>
    </div>
  );
};
export default Contact;
