import React, { useState } from "react";
import {
  Nav,
  Button,
  Card,
  Row,
  Col,
  Carousel,
  Container,
  Image,
  Modal,
  
} from "react-bootstrap";


import { NavLink } from "react-router-dom";
import { Routes } from "../Routes/routes";
import { useFunc } from "../context/Authcontext";
import { FloatingAction} from "@progress/kendo-react-buttons";
import Pic from "../assets/img/pic.png";
import Tilty from "react-tilty";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import {  NeuromorphicButton,NeuromorphicCard,NeuromorphicImage,Label } from "../context/component";
const Home = () => {
  
  const [Popup,setPopup]=useState(false)

  return (
    <>
    <div className='font-semibold'>
   <div id="Home" >
      <br/>
      <br/>
        <Row
          xs={2}
          sm={3}
          lg={5}
          md={3}
          className=" ms-1  mt-4 justify-content-between"
        >
          <Col className="align-items-end ">
    
            {/* <label className='opacity-40 ms-2 mt-1 text-light animate-fade-in'><b>Welcome to my  Website.</b></label> */}

          </Col>
    
          <Col className="mt-4 ms-2bg-image hover-zoom  ">
            <Tilty    class=' md:w-25 lg:w-12' style={{ transformStyle: "preserve-3d" }} className="p-2  ">
              <Image
                src={Pic}
                fluid
                alt="User Photo"
                width="200"
                className="neuromorphic-border-animation responsive "
                roundedCircle
                style={{ transform: "translateZ(30px)", objectFit: "cover" }}
              />
            </Tilty>
          </Col>
        </Row>{" "}
        <br />

        <br/>
        <Row xs={1} sm={3} className="ms-2 ">
        <NeuromorphicCard  className="   hover:shadow-md   animate-fade-in p-2  h-auto d-inline-block Oswald font-weight-light ">
        <Card.Body >
        <p  >
           
           My Name is Rajeev Dessai. I am a Software Developer.
           <br />
         </p>
        </Card.Body>
      
          </NeuromorphicCard>

        </Row>
      </div>
      <div id="About" className='mt-4'>
      
        <Row xs={3} xl={3} className=" ms-2 justify-content dark:bg-black">      
          <NeuromorphicCard className="hover:shadow-md animate-fade-in p-2  h-auto d-inline-block Oswald font-weight-light  ">
        <Card.Title className='ms-2 '><b>About Me</b></Card.Title>
        <Card.Body>
        <p >
          I am  a Full Stack Developer.I can work in Back-end and  Front-end Development of an Application.I just Completed my Bachelor's Degree in Software Development and now I am doing Msc in IT.
         </p>

        </Card.Body>
      
          </NeuromorphicCard>
        </Row>
      </div>
  
 
      <Modal className='theme' show={Popup} onHide={()=>setPopup(false)}>
    
        <Modal.Body>
        <Card className="sm shadow">
          <Card.Body>
            <p>hey</p>
          </Card.Body>
        </Card>
        </Modal.Body>
        </Modal>
   </div>
   <div>
    

    
   </div>
  
    </>
  );
};

export default Home;
