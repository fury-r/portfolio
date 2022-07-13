import React from "react";
import { Container,FormLabel,Row,Col } from "react-bootstrap";

export default class MainFooter extends React.Component{
    constructor(props){
        super (props);
    }
    render(){
        return(
            <>
                <footer className='footer flex  mt-4'>
                <Container className='p-5 flex justify-content-center'>
                    <Row xs={1} xl={1}  >
                    <label className='footer '> Designed & built  by Rajeev Dessai.</label>

                    </Row>
                    </Container>
                </footer>
            </>
        )
    }
} 