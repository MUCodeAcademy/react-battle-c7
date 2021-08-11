import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
export default function Navibar() {
	return (
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">
					Login
				</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNavDropdown">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="#">
								Home
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								Features
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								Pricing
							</a>
						</li>
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdownMenuLink"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Dropdown link
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		// <>
		//    <Navbar bg="dark" expands="lg">
		//                <Navbar.Collapse id="basic-navbar-nav">
		//                            <Nav>
		//                                        < NavLink className="d-inline p-2 bg-dark text-white justify-content-center" to="/">Log In</NavLink>
		//                                        < NavLink className="d-inline p-2 bg-dark text-white" to="/waitingroom">Waiting Room</NavLink>
		//                            </Nav>
		//                </Navbar.Collapse>
		//    </Navbar>
		// </>
	);
}















