import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import ReactBootStrap from "react-bootstrap"

export default function Navibar() {

	return (
		<>
		<ReactBootStrap.Navbar colapseOnSelect expand="lg"></ReactBootStrap.Navbar>
		<ReactBootStrap.Navbar.Brand href="#loginpage"></ReactBootStrap.Navbar.Brand>
		<ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-"></ReactBootStrap.Navbar.Toggle>
		<ReactBootStrap.Navbar.Collapse id="responsive-navbar-"></ReactBootStrap.Navbar.Collapse>
	<ReactBootStrap.Nav className="mr-auto"></ReactBootStrap.Nav>
<ReactBootStrap.Nav.Link href="#loginpage">Login</ReactBootStrap.Nav.Link>


			<Navbar bg="dark" expands="lg">
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						< NavLink className="d-inline p-2 bg-dark text-white justify-content-center" to="/">Log In</NavLink>
						< NavLink className="d-inline p-2 bg-dark text-white" to="/waitingroom">Waiting Room</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}

