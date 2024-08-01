import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Menu } from 'react-feather';
// import Logo from "../assets/godrej_logo.png"
import Logo from "./logo.png"

function NavBar({ toggleSidebar }) {
  return (
    <Navbar expand="lg" fixed="top" 
    // className='bg-dark'
    // style={{backgroundColor:"#0A1930"}} //UNCOMMENT FOR DARK BLUE AS TOLD BY UDITI
    >
      <Container fluid>
        <Button variant="outline-dark" onClick={toggleSidebar}
        style={{color:'#5276AA'}}>
          <Menu size={20} />
        </Button>
        {/* style={{color:"rgba(193,41,110,255)"}} */}
        <Navbar.Brand className="ms-3 fw-medium text-white" style={{color:'#5276AA'}} >
        AskYourDocs
        <img
            src={Logo}
            // width="60"
            height="50"
            className="d-inline-block ms-3"
            alt="Logo"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavBar;
