import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { SignOut } from '../App';

/*Navbar with some css styles - font color and hover effect*/

export default class NavbarComp extends Component {
  render(props) {
    return (
      <div>
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
      <img src={require('../images/bookworm-removebg-preview.png')} alt="logo" className="logo"/>
        <Navbar.Brand className="logo-text" href="#home" style={{color: "white"}}>BookWorms</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" style={{color: "white"}} onMouseOver={e => e.target.style.color = 'grey'}
                onMouseOut={e => e.target.style.color = 'white'} >Home</Nav.Link>
            <Nav.Link href="#library" style={{color: "white"}} onMouseOver={e => e.target.style.color = 'grey'}
                onMouseOut={e => e.target.style.color = 'white'}>Favorites</Nav.Link>
            <Nav.Link href="#search" style={{color: "white"}} onMouseOver={e => e.target.style.color = 'grey'}
                onMouseOut={e => e.target.style.color = 'white'}>Search</Nav.Link>
            <Nav.Link href="#review" style={{color: "white"}} onMouseOver={e => e.target.style.color = 'grey'}
                onMouseOut={e => e.target.style.color = 'white'}>Reviews</Nav.Link>
            <Nav.Link href="#friend-section" style={{color: "white"}} onMouseOver={e => e.target.style.color = 'grey'}
                onMouseOut={e => e.target.style.color = 'white'}>Friends</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="profile" href="#deets" style={{color: "white"}} onMouseOver={e => e.target.style.color = 'grey'}
                onMouseOut={e => e.target.style.color = 'white'}><SignOut className='sign-out'/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
    )
  }
}

