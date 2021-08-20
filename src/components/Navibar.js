import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { UserContext } from "../shared/context/UserContext";

export default function Navibar() {
  const { username, logout } = useContext(UserContext);

  return (
    <>
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
                  <Nav.Link as={NavLink} to="/login" activeClassName="current">
                    Log In
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/signup" activeClassName="current">
                    Sign Up
                  </Nav.Link>
                </>
              )}
              {username && (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/waiting"
                    activeClassName="current"
                  >
                    Waiting Room
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/about" activeClassName="current">
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
