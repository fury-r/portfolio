import logo from '../img/logo.svg';
import test from '../assets/img/test.jpg'
import React,{useState} from 'react';
import { Row,Col,Card, FloatingLabel } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';
import { Routes } from '../Routes/routes';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { NeuromorphicButton,Label, NeuromorphicCard2, NeuroLabel } from '../context/component';
const Projects=()=> {
  const [style,setStyle]=useState({display:'block'})
    return (
      <div className=" ms-4 justify-center" >
    <Row  className='mb-3' xs={1} sm={1} xl={1}>
      <NeuroLabel className=' emmerse-effect  flex justify-center mt-3'>Projects</NeuroLabel>

    </Row>
      <Row className=' flex justify-center' >

        <NeuromorphicCard2 className='w-64 theme  special NeuromorphicCard2  justify-items-center theme'>
        <div>  
        <div className=' flex justify-content-center mb-3'>
        </div>
        <Card.Img onMouseEnter={()=>{
          setStyle({display:"block"})
        }}
        onMouseLeave={()=>{
          setStyle({display:"none"})

        }} className="NeuromorphicCard2-img rounded-t" src={test}/>     <div className=' flex justify-content-center'> 
 </div>
 </div>
 <hr/>
       
                  <Card.Title className=' mt-3' ><p className='font-bold'> Covid Tracker</p></Card.Title>
          <Card.Body>
          <div className='flex justify-content-end'>
          <NeuromorphicButton className='neuromorphic-button mt-2 mb-1 w-36  ' as={HashLink} to={Routes.covidtracker.path} ><label className='no-underline hover:none '>View Project</label></NeuromorphicButton>

          </div> 
          </Card.Body>
        </NeuromorphicCard2>
      </Row>
      </div>
    );
  

};

export default Projects;
