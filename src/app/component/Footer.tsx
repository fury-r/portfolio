import React from "react";
import { Container, Row } from "react-bootstrap";

const MainFooter = () => {
  return (
    <>
      <footer className="footer flex  mt-4">
        <Container className="p-5 flex-row justify-content-center items-center justify-center">
          <div className="flex flex-col  justify-center  items-center">
            <label className="footer font-sm w-fit">
              Designed & built by Rajeev Dessai.
            </label>
            <label className="footer font-sm w-fit ">(Under Development)</label>
          </div>
        </Container>
      </footer>
    </>
  );
};
export default MainFooter;
