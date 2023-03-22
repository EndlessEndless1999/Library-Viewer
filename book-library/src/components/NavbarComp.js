import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

/*Navbar with some css styles - font color and hover effect*/

export default class NavbarComp extends Component {
  render() {
    return (
      <div>
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
      <img src={require('../images/bookworm-removebg-preview.png')} alt="logo" className="logo"/>
        <Navbar.Brand className="logo-text" href="#home" style={{color: "white"}}>BookWorms</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#feature" style={{color: "white"}} onMouseOver={e => e.target.style.color = 'grey'}
                onMouseOut={e => e.target.style.color = 'white'} >Home</Nav.Link>
            <Nav.Link href="#pricing" style={{color: "white"}} onMouseOver={e => e.target.style.color = 'grey'}
                onMouseOut={e => e.target.style.color = 'white'}>Favorites</Nav.Link>
            <Nav.Link href="#pricing" style={{color: "white"}} onMouseOver={e => e.target.style.color = 'grey'}
                onMouseOut={e => e.target.style.color = 'white'}>Search</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="profile" href="#deets" style={{color: "white"}} onMouseOver={e => e.target.style.color = 'grey'}
                onMouseOut={e => e.target.style.color = 'white'}>Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
    )
  }
}

