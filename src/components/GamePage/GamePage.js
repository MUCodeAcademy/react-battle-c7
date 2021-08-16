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
  const {placeBoat, userData, opponentData, resetBoards, boatsReady, startGame, select, gameActive, ready} = useContext(GameContext);
  const { username, isHostCon } = useContext(UserContext);
  const { room } = useParams();
  const { joinRoom, sendChat, messages } = useSocket(room, isHostCon);

  useEffect(() => {
    joinRoom(username);
  }, []);
  console.log(userData)

  return (
    <>
    <button onClick={()=>{placeBoat(0, 2, "h")}}>placeboats</button>
    <button onClick={()=>{boatsReady(); startGame();}}>boatsready</button>
    <button onClick={()=>{select(1,false);select(50,false);}}>hitboats</button>
    <button onClick={()=>{resetBoards()}}>resetboards</button>
    {gameActive && ready && <div>{gameActive, ready}</div>}
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
