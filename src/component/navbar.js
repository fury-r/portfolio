import React, { useState } from "react";

import {Container, Nav, Navbar,NavDropdown, Button,Accordion,Card,useAccordionButton} from "react-bootstrap"
import { Link,Navlin } from "react-router-dom";
import { FloatingActionButton } from '@progress/kendo-react-buttons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCaretDown, faCaretSquareDown,faHashtag, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import { Routes } from "../Routes/routes";
import { NueromorphicNavLink, Toggle,NueromorphicNavItem,NeuroNavbar,ToggleMode } from "../context/component";
import {HashLink} from 'react-router-hash-link';
import { func } from "prop-types";
const MainNavbar=({toggletheme})=>{
    const [selected,setselected]=useState()
    const [check,setcheck]=useState(false)
    const handleChange=()=>{
        setcheck(!check)
        
    } 
  

      

    return(
        <>
                <NeuroNavbar collapseOnSelect color='faded' fixed='top' expand='sm' variant='white' className='justify-content-start    sticky-top '>
            <Container >

            <Navbar.Toggle aria-controls='responsive-navbar-nav ' ><FontAwesomeIcon className="nav-toggle" icon={faCaretDown}/></Navbar.Toggle>
                <Navbar.Collapse id='responsive-navbar-nav' >
                    <Nav  className="justify-content-end" style={{ width: "100%" }} defaultactiveKey={Routes.home.path}>
                    <NueromorphicNavItem  > 
                    <NueromorphicNavLink   as={HashLink}     to={Routes.home.path}>
                    
                    <label className='btn-outline-none' >Home</label>
                    </NueromorphicNavLink>
                </NueromorphicNavItem>
    
{/*         
                <NueromorphicNavItem >
                    <NueromorphicNavLink as={HashLink} eventkey='link-3' className=' nav-text  active '}>
                    <label >CV</label>
                    </NueromorphicNavLink>
                </NueromorphicNavItem> */}
                <NueromorphicNavItem >
                    <NueromorphicNavLink  as={HashLink}   eventkey='link-4' className=' nav-text active' to={Routes.project.path}>
                    <label >Projects</label>
                    </NueromorphicNavLink>
                </NueromorphicNavItem>
                <NueromorphicNavItem>
                         </NueromorphicNavItem>
                    </Nav>
                    {/* <NueromorphicNavItem >
                    <NueromorphicNavLink   as={HashLink} eventkey='link-2' className='nav-text active  '  to={Routes.about.path}>
                    <label >Contact</label>
                    </NueromorphicNavLink>
                </NueromorphicNavItem> */}
                
                </Navbar.Collapse>
                <Toggle Toggler={toggletheme} />
            </Container>


        </NeuroNavbar>
        <Navbar fixed='bottom'>
        </Navbar>
  
        </>
    );
  
}
MainNavbar.propTypes={
    toggletheme:func.isRequired
}
export default MainNavbar;