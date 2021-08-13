import React from "react";
import { Col, Row, Card  } from "react-bootstrap";
import Chat from "./GamePage/components/Chat";
import Cell from "./GamePage/components/Cell";
import ScoreBoard from "./GamePage/components/ScoreBoard";
import Board from "./GamePage/components/Board";


const arr = [
  { player: false, hit: false, ship: true, coordinate: "" },
  { player: false, hit: true, ship: true, coordinate: "" },
  { player: false, hit: false, ship: true, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: true, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: true, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: false, ship: false, coordinate: "" },
  { player: false, hit: true, ship: true, coordinate: "" },
  { player: false, hit: true, ship: true, coordinate: "" },
  { player: false, hit: true, ship: true, coordinate: "" },
  { player: false, hit: true, ship: true, coordinate: "" },
  { player: false, hit: true, ship: true, coordinate: "" },
];



export default function About() {

	return (
		<>
<div className="bigShell">
			<Card fluid="lg" style={{ backgroundColor: "blue", color: "darkblue" }}>


				<Row lg={1}>
					<Col style={{ backgroundColor: "gray" }} ><Card>
						<Card.Body>
							<ScoreBoard />
						</Card.Body>
					</Card></Col>

				</Row>
				<Row  >
					<Col style={{ backgroundColor: "gray" }} ><Card style={{ maxWidth: '260px', minWidth: '260px' }} >
						<Card.Body>
							<Card.Header as="h5">My Board:</Card.Header>
							<Card.Text>
								<div style={{ height: "260px", width: "260px" }}><app/></div>

							</Card.Text>
						</Card.Body>

						<Card.Body>

						</Card.Body>
					</Card></Col>



					<Col style={{ backgroundColor: "gray" }} ><Card style={{ maxWidth: '260px', minWidth: '260px' }}>
						<Card.Body>
							<Card.Header as="h5">Opponent Board:</Card.Header>

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
						<Card >
							<Card.Body>
								<Card.Title>CHAT:</Card.Title>
								<Card.Text>

								</Card.Text>
							</Card.Body>
							<div><Chat /></div>
						</Card></Col>
				</Row>
			</Card>
</div>

		</>
	);
}
