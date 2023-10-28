import React from "react";
import { Container, Row } from "react-bootstrap";

const MainFooter = () => {
  return (
    <>
      <footer className="footer flex  mt-4">
        <Container className="p-5 flex justify-content-center">
          <Row xs={1} xl={1}>
            <label className="footer ">
              Designed & built by Rajeev Dessai.
            </label>
          </Row>
        </Container>
      </footer>
    </>
  );
};
export default MainFooter;
