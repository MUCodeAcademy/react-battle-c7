import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Row,
  Card,
  Modal,
  Button,
  Container,
  Alert,
} from "react-bootstrap";
import Chat from "./components/Chat";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import useSocket from "../../shared/hooks/useSocket";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../../shared/context/UserContext";
import { GameContext } from "../../shared/context/GameContext";

export default function GamePage() {
  const {
    placeBoat,
    userData,
    opponentData,
    winner,
    newGame,
    isTurn,
    gameActive,
    currentShip,
    userBoatsReady,
  } = useContext(GameContext);
  // modal state and cb functions
  const [showModal, setShowModal] = useState(winner);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const { username, isHostCon, setIsHostCon } = useContext(UserContext);
  const { room } = useParams();
  const { joinRoom, sendChat, messages, sendGuess, sendBoatsReady, sunkShip } =
    useSocket(room, isHostCon);
  const [boatToPlace, setBoatToPlace] = useState(null);
  const [boatOrient, setBoatOrient] = useState("v");
  const history = useHistory();

  useEffect(() => {
    joinRoom(username);
  }, []);

  useEffect(() => {
    setShowModal(winner);
  }, [winner]);

  useEffect(() => {
    if (currentShip < 2) {
      sendBoatsReady(userData);
    }
  }, [currentShip]);

  return (
    <Container fluid>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        closeButton
      >
        <Modal.Header>
          {winner && winner === "User" ? (
            <Modal.Title>Congratulations! You Won!</Modal.Title>
          ) : (
            <Modal.Title>Oh No, You lost! Better luck next time!</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          The game is over now. Please return to the waiting room. Or don't -
          we're not the boss of you.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => history.push("/waiting")}>
            Go to Waiting Room
          </Button>
          {/* <Button
            variant="secondary"
            onClick={() => {
              newGame();
              function genRoomNum() {
                let randNum = "";
                var chars =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                var charsLength = chars.length;
                for (var i = 0; i < 8; i++) {
                  randNum += chars.charAt(
                    Math.floor(Math.random() * charsLength)
                  );
                }
                return randNum;
              }
              // join new room, send msg to other player
              let room = genRoomNum();
              // send msg to previous room with room num
              sendChat(`${username} requested a rematch in room: ${room}`);
              setIsHostCon(true);
              //use history to redirect them

              history.push(`/gamepage/${room}`);
              newGame();
              setIsHostCon(true);
            }}
          >
            New Game
          </Button> */}
        </Modal.Footer>
      </Modal>
      <div className="bigShell">
        {/* <Card fluid="lg" style={{ backgroundColor: "blue", color: "darkblue" }}> */}
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <ScoreBoard
                  setOrientation={setBoatOrient}
                  setBoatToPlace={setBoatToPlace}
                  setBoatOrient={setBoatOrient}
                  boatOrient={boatOrient}
                  sunkShip={sunkShip}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {gameActive === false && userBoatsReady === false && (
          <Row>
            <Col>
              <Alert
                className="text-center"
                variant="primary"
                style={{ margin: "0px" }}
              >
                Welcome to a completely original game concept... Please place
                your boats on the user board.
              </Alert>
            </Col>
          </Row>
        )}
        {gameActive === false && userBoatsReady === true && (
          <Row>
            <Col>
              <Alert
                className="text-center"
                variant="warning"
                style={{ margin: "0px" }}
              >
                You're ready to battle! But, we're waiting on Opponent to start
                the game.
              </Alert>
            </Col>
          </Row>
        )}
        {gameActive === true && isTurn === true && (
          <Row>
            <Col>
              <Alert
                className="text-center"
                variant="primary"
                style={{ margin: "0px" }}
              >
                Hey, it's your turn! Make a move please.
              </Alert>
            </Col>
          </Row>
        )}
        {gameActive === true && isTurn === false && (
          <Row>
            <Col>
              <Alert
                className="text-center"
                variant="warning"
                style={{ margin: "0px" }}
              >
                Waiting for Opponent's move.
              </Alert>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <h2 className="heading">User Board:</h2>
            <div>
              <Board
                board={userData}
                boatToPlace={boatToPlace}
                boatOrient={boatOrient}
                sendGuess={sendGuess}
              />
            </div>
          </Col>

          <Col>
            <h2 className="heading">Opponent Board:</h2>
            <div>
              <Board
                board={opponentData}
                boatToPlace={boatToPlace}
                sendGuess={sendGuess}
              />
            </div>
          </Col>
          <Col lg={4}>
            <div>
              <h2 className="heading">Chat:</h2>
              <div>
                <Chat sendChat={sendChat} messages={messages} />
              </div>
            </div>
          </Col>
        </Row>

        <Row></Row>
        {/* </Card> */}
      </div>
    </Container>
  );
}
