import React from "react";

import {
  Col,
  Row,
  Container,
  Card,
} from "react-bootstrap";
import Countup from "react-countup";

export const Cards = ({
  data: { activeCases, recovered, deceased, lastUpdatedAtApify },
}) => {
  if (!activeCases) {
    return "Loading...";
  }

  return (
    <>
      <Container fluid className="mt-3 ">
        <Row>
          <Col className="displaycard ">
          <Card style={{"background-color ":"#bd4f6c",
"background-image": "linear-gradient(326deg, #bd4f6c 0%, #d7816a 74%)"
}} className="neuromorphic-border w-100 theme  h-64 xl:h-64  ">
              <Card.Title className=' flex justify-content-center mt-2' >Infected</Card.Title>

            <Card.Body >
            <hr />

            <p style={{ fontSize: 30, fontWeight: "bold" }} className="mb-0">
                <Countup
                  start={0}
                  variant='alert'
                  className='countup'
                  end={activeCases}
                  duration={2.75}
                  separator=","
                />
              </p>

              <p style={{ fontSize: 18 }}>
                {new Date(lastUpdatedAtApify).toDateString()}
              </p>

              <p style={{ fontSize: 18, fontWeight: "bold" }} className='mb-4 w-80' >
                Number of Infected cases of COVID-19
              </p>
            </Card.Body>
            </Card>
          </Col>

          <Col className="displaycard  ">
          <Card style={{"background-color": "#20bf55","background-image":"linear-gradient(315deg, #20bf55 0%, #01baef 74%)"}} className="neuromorphic-border w-100 theme xl:h-64 ">
              <Card.Title className=' flex justify-content-center mt-2' >Recovered</Card.Title>

            <Card.Body>
            <hr className='mt-3' />

              <p style={{ fontSize: 30, fontWeight: "bold" }} className="mb-0">
                <Countup
                  start={0}
                  className='countup'

                  end={recovered}
                  duration={2.75}
                  separator=","
                />
              </p>

              <p style={{ fontSize: 18 }}>
                {new Date(lastUpdatedAtApify).toDateString()}
              </p>

              <p style={{ fontSize: 18, fontWeight: "bold" }}>
                Number of Recovered people of COVID-19
              </p>
              </Card.Body>
            </Card>          </Col>

          <Col className="displaycard">
          <Card style={{"background-color":" #5de6de",
"background-image": "linear-gradient(315deg, #5de6de 0%, #b58ecc 74%)"}} className="neuromorphic-border w-100 theme xl:h-64 ">
              <Card.Title className=' flex justify-content-center mt-2' >Deceased</Card.Title>

            <Card.Body>
            <hr className='mt-3' />

              <p style={{ fontSize: 30, fontWeight: "bold" }} className="mb-0">
                <Countup
                    className='countup'

                  start={0}
                  end={deceased}
                  duration={2.75}
                  separator=","
                />
              </p>

              <p style={{ fontSize: 18 }}>
                {new Date(lastUpdatedAtApify).toDateString()}
              </p>

              <p style={{ fontSize: 18, fontWeight: "bold" }}>
                Number of Deceased of COVID-19
              </p>
              </Card.Body>
            </Card>
            </Col>
        </Row>


  
      </Container>
    </>
  );
};
