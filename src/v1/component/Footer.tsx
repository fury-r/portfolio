import React from "react";
import { Container } from "react-bootstrap";

const MainFooter = () => {
  return (
    <>
      <footer className="footer flex  w-full justify-center mt-4">
        <Container className="p-5 flex-row justify-content-center items-center justify-center">
          <div className="flex flex-col  justify-center  items-center">
            <label className="footer font-sm w-fit text-center">
              Designed & built by Rajeev Dessai.
            </label>
            <label className="footer font-sm w-fit ">(v1.0.0)</label>
          </div>
        </Container>
      </footer>
    </>
  );
};
export default MainFooter;
