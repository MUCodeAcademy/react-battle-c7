import React from "react";
export default function Navibar() {
	return (
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<div class="container-fluid">
				<a class="navbar-brand">
					Lucky 7   Battleship
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
							<a class="nav-link active" aria-current="page" href="/loginpage">
								Login
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/waitingroom">
								Waiting Room
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/about">
								About
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















