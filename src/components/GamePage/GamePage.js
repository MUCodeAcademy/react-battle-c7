import React, { useContext, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import Chat from "./components/Chat";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import useSocket from "../../shared/hooks/useSocket";
import { useParams } from "react-router-dom";
import { UserContext } from "../../shared/context/UserContext";

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

const arr1 = [
  { player: true, hit: false, ship: true, coordinate: "" },
  { player: true, hit: true, ship: true, coordinate: "" },
  { player: true, hit: false, ship: true, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: true, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: true, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: false, ship: false, coordinate: "" },
  { player: true, hit: true, ship: true, coordinate: "" },
  { player: true, hit: true, ship: true, coordinate: "" },
  { player: true, hit: true, ship: true, coordinate: "" },
  { player: true, hit: true, ship: true, coordinate: "" },
  { player: true, hit: true, ship: true, coordinate: "" },
];

export default function GamePage() {
  const { username } = useContext(UserContext);
  const { room } = useParams();
  const { joinRoom, sendChat, messages } = useSocket(room, true);

  useEffect(() => {
    joinRoom(username);
  }, []);
  return (
    <>
      <div className="bigShell">
        <Card fluid="lg" style={{ backgroundColor: "blue", color: "darkblue" }}>
          <Row lg={1}>
            <Col style={{ backgroundColor: "gray" }}>
              <Card>
                <Card.Body>
                  <ScoreBoard />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col style={{ backgroundColor: "gray" }}>
              <Card>
                <Card.Body>
                  <Card.Header as="h5">Player Board:</Card.Header>

                  <Card.Text>
                    <div>
                      <Board board={arr1} />
                    </div>
                  </Card.Text>
                </Card.Body>

                <Card.Body></Card.Body>
              </Card>
            </Col>

            <Col style={{ backgroundColor: "gray" }}>
              <Card>
                <Card.Body>
                  <Card.Header as="h5">Opponent Board:</Card.Header>

                  <Card.Text>
                    <div>
                      <Board board={arr} />
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
                  <Chat sendChat={sendChat} messages={messages}/>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}
