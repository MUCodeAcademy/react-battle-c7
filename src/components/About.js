import React from "react";
import { Container, Col, Row, Card, ListGroupItem, ListGroup } from "react-bootstrap"
import Chat from "./GamePage/components/Chat"
import Cell from "./GamePage/components/Cell"

export default function About() {

	return (
		<>
			<Container fluid ="lg" style={{ backgroundColor: "blue", color: "darkblue" }}>


				<Row lg={1}>
					<Col style={{ backgroundColor: "gray" }} ><Card style={{ width: '' }}>
						<Card.Body>
							<Card.Title>Scoreboard:</Card.Title>
							<Card.Text>
								<div>HITS:</div>
								<div>MISS:</div>
							</Card.Text>
						</Card.Body>
						<ListGroup className="list-group-flush">

						</ListGroup>
						<Card.Body>
							Ships: 2 3 4 5
						</Card.Body>
					</Card></Col>

				</Row>
				<Row className="justify-content-md-center" lx={2}>
					<Col md={10} style={{ backgroundColor: "gray" }} ><Card style={{ maxWidth: '260px', minWidth: '260px' }} >
						<Card.Body>
							<Card.Header as="h5">My Board:</Card.Header>
							<Card.Text>
    <div style={{ height: "260px", width: "260px" }}></div>
								
							</Card.Text>
						</Card.Body>

						<Card.Body>

						</Card.Body>
					</Card></Col>



					<Col md={10} style={{ backgroundColor: "gray" }} ><Card style={{ maxWidth: '260px', minWidth: '260px' }}>
						<Card.Body>
							<Card.Header as="h5">Your Board:</Card.Header>

							<Card.Text>
								<div style={{ height: "260px", width: "260px" }}></div>
							</Card.Text>
						</Card.Body>

						<Card.Body>

						</Card.Body>
					</Card></Col>
				</Row>




				<Row lg={1}>
					<Col style={{ backgroundColor: "gray" }} >
						<Card style={{ width: '' }}>
							<Card.Body>
								<Card.Title>CHAT:</Card.Title>
								<Card.Text>
									
								</Card.Text>
							</Card.Body>
<div><Chat/></div>
						</Card></Col>
				</Row>
			</Container>

		</>
	);
}
