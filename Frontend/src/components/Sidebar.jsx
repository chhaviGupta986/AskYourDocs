import React from 'react';
import { Offcanvas, Nav ,Button} from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';  // Using react-icons for a close (X) icon
import './ChatInput.css'
function Sidebar({ show, handleClose }) {
  return (
    <Offcanvas show={show} onHide={handleClose} 
    // className="bg-black"
    style={{backgroundColor:'#20525B', width: '250px', height: '250px', borderRadius: '10px', marginTop: '10px', marginLeft: '5px' }}
    >
      {/* <Offcanvas.Header closeButton> */}
      <Offcanvas.Header>
        <Offcanvas.Title className="text-white fw-bold">History</Offcanvas.Title>
        <Button className="close-button-custom"  onClick={handleClose}
        style={{backgroundColor:'#20525B',borderWidth:'0px'}}
        >
          <FaTimes/>
        </Button>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column text-white fs-6">
          <Nav className='mb-2'>Home</Nav>
          <Nav className='mb-2'>Settings</Nav>
          <Nav className='mb-2'>Profile</Nav>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;