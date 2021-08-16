import React, { useEffect, useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
import Chat from "./components/Chat";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import { Ready, StartGame, NewGame } from "../../shared/context/GameContext";

let arr = [];
let arr1 = [];
export default function GamePage() {
  const [boatToPlace, setBoatToPlace] = useState(null);
  useEffect(() => {
    StartGame();
  }, [Ready]);
  return (
    <>
      <div className="bigShell">
        <Card fluid="lg" style={{ backgroundColor: "blue", color: "darkblue" }}>
          <Row lg={1}>
            <Col style={{ backgroundColor: "gray" }}>
              <Card>
                <Card.Body>
                  <ScoreBoard setBoatToPlace={setBoatToPlace} />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col style={{ backgroundColor: "gray" }}>
              <Card style={{ maxWidth: "300px", minWidth: "300px" }}>
                <Card.Body>
                  <Card.Header as="h5">Player Board:</Card.Header>

                  <Card.Text>
                    <div>
                      <Board board={arr1} boatToPlace={boatToPlace} />
                    </div>
                  </Card.Text>
                </Card.Body>

                <Card.Body></Card.Body>
              </Card>
            </Col>

            <Col style={{ backgroundColor: "gray" }}>
              <Card style={{ maxWidth: "300px", minWidth: "300px" }}>
                <Card.Body>
                  <Card.Header as="h5">Opponent Board:</Card.Header>

                  <Card.Text>
                    <div>
                      <Board board={arr} boatToPlace={boatToPlace} />
                    </div>
                  </Card.Text>
                </Card.Body>

                <Card.Body></Card.Body>
              </Card>
            </Col>
          </Row>

          <Row lg={1}>
            <Col style={{ backgroundColor: "gray" }}>
              <Card>
                <Card.Body>
                  <Card.Title>CHAT:</Card.Title>
                  <Card.Text></Card.Text>
                </Card.Body>
                <div>
                  <Chat />
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}
