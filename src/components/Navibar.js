import React, {useState} from "react";
import { Link } from "react-router-dom";
import {Navbar, Container, Nav} from "react-bootstrap"



export default function Navibar() {

	return (
	<>
<br />
<Navbar fixed="top" />
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>
        <img
          src="./assets/7battle.png"
          alt=""
        color="white"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
     Lucky 7 Battleship
      </Navbar.Brand>
<Nav className="me-auto">
      <Nav.Link href="/login">Log In</Nav.Link>
      <Nav.Link href="/signuppage">Sign Up</Nav.Link>
      <Nav.Link href="#waitingroom">Waiting Room</Nav.Link>
      <Nav.Link href="#logout">Log Out</Nav.Link>
      </Nav>
       </Container>
  </Navbar>
</>

		);
}















