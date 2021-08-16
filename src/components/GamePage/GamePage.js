import React, { useContext, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import Chat from "./components/Chat";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import { GameContext } from "../../shared/context/GameContext";
import useSocket from "../../shared/hooks/useSocket";
import { useParams } from "react-router-dom";
import { UserContext } from "../../shared/context/UserContext";

export default function GamePage() {
  const {placeBoat, userData, opponentData} = useContext(GameContext);
  const { username } = useContext(UserContext);
  const { room } = useParams();
  const { joinRoom, sendChat, messages } = useSocket(room, true);

  useEffect(() => {
    joinRoom(username);
  }, []);
  console.log(userData)
  
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

                  <Card.Body>
                    <div>
                      <Board board={userData} />
                    </div>
                  </Card.Body>
                </Card.Body>

                <Card.Body></Card.Body>
              </Card>
            </Col>

            <Col style={{ backgroundColor: "gray" }}>
              <Card>
                <Card.Body>
                  <Card.Header as="h5">Opponent Board:</Card.Header>

                  <Card.Body>
                    <div>
                      <Board board={opponentData} />
                    </div>
                  </Card.Body>
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
