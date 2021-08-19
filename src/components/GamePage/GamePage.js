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
    userBoatsReady,
  } = useContext(GameContext);
  // modal state and cb functions
  const [showModal, setShowModal] = useState(winner);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const { username, isHostCon } = useContext(UserContext);
  const { room } = useParams();
  const { joinRoom, sendChat, messages, sendGuess } = useSocket(
    room,
    isHostCon
  );
  const [boatToPlace, setBoatToPlace] = useState(null);
  const [boatOrient, setBoatOrient] = useState("v");
  const history = useHistory();

  useEffect(() => {
    joinRoom(username);
  }, []);

  useEffect(() => {
    setShowModal(winner);
  }, [winner]);

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          {winner && winner === "user" ? (
            <Modal.Title>Congratulations! You Won!</Modal.Title>
          ) : (
            <Modal.Title>Oh No, You lost! Better luck next time!</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          The game is over now. Play again or return to waiting room. Or don't -
          we're not the boss of you.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => history.push("/waiting")}>
            Go to Waiting Room
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              console.log("new game function nyi");
              newGame();
            }}
          >
            New Game Button NYI
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="bigShell">
        {/* <Card fluid="lg" style={{ backgroundColor: "blue", color: "darkblue" }}> */}
        <Row lg={1}>
          <Col style={{ backgroundColor: "gray" }}>
            <Card>
              <Card.Body>
                <ScoreBoard
                  setOrientation={setBoatOrient}
                  setBoatToPlace={setBoatToPlace}
                  setBoatOrient={setBoatOrient}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* {gameActive === false && userBoatsReady === false && (
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Alert
                    className="text-center"
                    variant="primary"
                    style={{ margin: "0px" }}
                  >
                    Welcome to a completely original game concept... Please
                    place your boats on the user board.
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        {gameActive === false && userBoatsReady === true && (
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Alert
                    className="text-center"
                    variant="primary"
                    style={{ margin: "0px" }}
                  >
                    You're ready to battle! But, we're waiting on Opponent to
                    start the game.
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )} */}
        {
          // gameActive === true &&
          isTurn === true && (
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Alert
                      className="text-center"
                      variant="primary"
                      style={{ margin: "0px" }}
                    >
                      Hey, it's your turn! Make a move please.
                    </Alert>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )
        }
        {
          // gameActive === true &&
          isTurn === false && (
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Alert
                      className="text-center"
                      variant="warning"
                      style={{ margin: "0px" }}
                    >
                      Waiting for Opponent's move.
                    </Alert>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )
        }
        <Row>
          <Col style={{ backgroundColor: "gray" }}>
            <Card>
              <Card.Body>
                <Card.Header as="h5">User Board:</Card.Header>

                <Card.Body>
                  <div>
                    <Board
                      board={userData}
                      boatToPlace={boatToPlace}
                      boatOrient={boatOrient}
                      sendGuess={sendGuess}
                    />
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
                    <Board
                      board={opponentData}
                      boatToPlace={boatToPlace}
                      sendGuess={sendGuess}
                    />
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
                <Chat sendChat={sendChat} messages={messages} />
              </div>
            </Card>
          </Col>
        </Row>
        {/* </Card> */}
      </div>
    </>
  );
}
