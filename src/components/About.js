import React from "react";
import { Container, Col, Row, Card, ListGroupItem, ListGroup } from "react-bootstrap"
import Chat from "./GamePage/components/Chat"

export default function About() {

	return (
		<>
			<Container style={{ backgroundColor: "blue", color: "darkblue" }}>


				<Row lg={1}>
					<Col style={{ backgroundColor: "gray" }} sm={10}><Card style={{ width: '18rem' }}>
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
							Ships: 2   3  4 5
						</Card.Body>
					</Card></Col>

				</Row>
				<Row md={2}>
					<Col style={{ backgroundColor: "gray" }} sm={5}><Card style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Header as="h5">My Board:</Card.Header>
							<Card.Text>
								<div className="Grid"></div>
								<div></div>
							</Card.Text>
						</Card.Body>

						<Card.Body>

						</Card.Body>
					</Card></Col>



					<Col style={{ backgroundColor: "gray" }} sm={5}><Card style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Header as="h5">Your Board:</Card.Header>

							<Card.Text>
								<div className="Grid"></div>
								<div></div>
							</Card.Text>
						</Card.Body>

						<Card.Body>

						</Card.Body>
					</Card></Col>
				</Row>




				<Row lg={1}>
					<Col style={{ backgroundColor: "gray" }} sm={10}>
						<Card style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>CHAT:</Card.Title>
								<Card.Text>
									<div>Me:</div>
									<div>You:</div>
									<div>You:</div>
								</Card.Text>
							</Card.Body>{Chat}
						</Card></Col>
				</Row>
			</Container>

		</>
	);
}
