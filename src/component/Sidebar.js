import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React from "react";
import { Row, Col, Card, Accordion, useAccordionButton } from "react-bootstrap";

const Sidebar = () => {
  const Toggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey)

    return (
      <button
        type="button"
        className="neuromorphic-button d-flex justify-content-between align-items-center"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  };

  return (
    <>
      <div className='w-32 '>
        <Row className="theme">
          <Accordion  className="theme  ">
            <Card className="theme">
              <Card.Header>
                <Toggle eventKey="0">
                  <FontAwesomeIcon icon={faHashtag} />
                </Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {" "}
                  <Button className="neuromorphic-button mt-3">Linkdin</Button><br/>
                  <Button className="neuromorphic-button mt-3">Github</Button><br/>
                  <Button className="neuromorphic-button mt-3">Instagram</Button>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Row>
      </div>
    </>
  );
};
export default Sidebar;
