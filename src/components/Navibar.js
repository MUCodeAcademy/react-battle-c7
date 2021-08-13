import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { UserContext } from "../shared/context/UserContext";

export default function Navibar() {
  const { username, logout } = useContext(UserContext);

  return (
    <>
      {/* <Navbar expand="lg" collapseOnSelect fixed="top" /> */}
      <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <img
              src="./assets/7battle.png"
              alt=""
              color="white"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Lucky 7 Battleship
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {!username && (
                <>
                  <Nav.Link as={Link} to="/login">
                    Log In
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Sign Up
                  </Nav.Link>
                </>
              )}
              {username && (
                <>
                  <Nav.Link as={Link} to="/waitingroom">
                    Waiting Room
                  </Nav.Link>
                  <Nav.Link as={Link} to="/about">
                    About
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      logout();
                    }}
                  >
                    Log Out
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
