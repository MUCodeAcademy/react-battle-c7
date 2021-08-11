import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function Navibar() {

	return (


		<>
			<Navbar bg="dark" expands="lg">
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						< NavLink className="d-inline p-2 bg-dark text-white" to="/">Log In</NavLink>
						< NavLink className="d-inline p-2 bg-dark text-white" to="/waitingroom">Waiting Room</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}

