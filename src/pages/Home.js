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
import AOS from 'aos';
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import {  NeuromorphicButton,NeuromorphicCard,NeuromorphicImage,Label } from "../context/component";
const Home = () => {
  
  const [Popup,setPopup]=useState(false)
  const FetchInfo=()=>{
    setPopup(true)
  }
  const [open,setOpen]=useState(false)
  AOS.init()
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
            <div className="jumbotron ">
              <div class="profile-text animate-fade-in-top">
                <label className='opacity-60 ' >Hello!</label>
                
              </div>
            </div>
            {/* <label className='opacity-40 ms-2 mt-1 text-light animate-fade-in'><b>Welcome to my  Website.</b></label> */}

          </Col>
    
          <Col className="mt-4 ms-2bg-image hover-zoom  ">
            <Tilty    class=' md:w-25 lg:w-12' style={{ transformStyle: "preserve-3d" }} className="p-2  ">
              <NeuromorphicImage
                src={Pic}
                fluid
                alt="User Photo"
                width="140"
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
          I am  a Full Stack Developer.I can working in Back-end and  Front-end Development of an Application.I just Completed my Bachelor's Degree in Software Development and now I am doing Msc in IT.
         </p>

        </Card.Body>
      
          </NeuromorphicCard>
        </Row>
      </div>
  

      <div id="Skills" className=" ms-3 mt-4  ext-lg " >
      <Row  className='flex justify-content-center mt-3 ms-2  w-40 '>
          <Label className='items-center  flex p-3  mt-4'>Skills</Label>
      </Row>
        <Row  className='animate-fade-in mt-1' >
          <Col className='mt-2'>
            <label className='font-semibold text-lg  border-b-2  border-red-50 mb-2'> Tools & Technologies Known</label>
           
            <Row xs={3} xl={3} sm={3} className='mt-4'   >
              <Col >
                {" "}
                <NeuromorphicButton className=" transform hover:scale-110 motion-reduce:transform-none  btn-outline-secondary w-100" onClick={FetchInfo}>Python</NeuromorphicButton>
              </Col>
              <Col>
                {" "}
                <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100">Java</NeuromorphicButton>
              </Col>
              <Col>
                {" "}
                <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100">Javascript</NeuromorphicButton>
              </Col>
            </Row>

            <Row xs={3} xl={3} sm={3}  className='mt-4' >
              <Col>
                {" "}
                <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100">PHP</NeuromorphicButton>
              </Col>
              <Col>
                {" "}
                <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100">CSS</NeuromorphicButton>
              </Col>
              <Col>
                {" "}
                <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100">Database</NeuromorphicButton>
              </Col>
            </Row>


            <Row xs={3} xl={3} sm={3}  className='mt-4 ' >
              <Col>
                {" "}
                <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100"> SQL</NeuromorphicButton>
              </Col>
              <Col>
                {" "}
                <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100">ReactJs</NeuromorphicButton>
              </Col>
              <Col>
                <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100">Nodejs</NeuromorphicButton>
              </Col>
            </Row>

            <Row xs={3} xl={3} sm={3} sm={3}  className='mt-4' >
              <Col>
                {" "}
                <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100">Laravel</NeuromorphicButton>
              </Col>
              <Col >
                {" "}
                <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100">Firebase</NeuromorphicButton>
              </Col>
              <Col >
                {" "}
                <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100">Adobe Lightroom</NeuromorphicButton>
              </Col>
            </Row>

            <Row xs={3} xl={3} sm={3}  className='mt-4' >
              <Col xs={6}>
                <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100"  >Adobe Photoshop</NeuromorphicButton>
              </Col>
              <Col>
                <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100">WordPress</NeuromorphicButton>
              </Col>
            </Row>
          </Col>
        
        </Row>
     
        <label className="mt-4 font-semibold  border-b-2  border-red-50">Industry Knowledge</label>

            <Row xs={3} xl={2} sm={3} className="mt-4 animate-fade-in" >

            <Col xs={6}>

            <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100">
                Software Development
              </NeuromorphicButton>
              </Col>
              <Col>
              <NeuromorphicButton className="transform hover:scale-110 motion-reduce:transform-none neuromorphic-NeuromorphicButton btn-outline-secondary w-100">Photography</NeuromorphicButton>
            </Col>
  
      
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
