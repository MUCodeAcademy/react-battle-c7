import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Card, Modal, Button, CloseButton } from "react-bootstrap";
import Chat from "./components/Chat";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import useSocket from "../../shared/hooks/useSocket";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../../shared/context/UserContext";
import { GameContext } from "../../shared/context/GameContext";

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
  const { winner, NewGame } = useContext(GameContext);
  // modal state and cb functions
  const [showModal, setShowModal] = useState(true);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const { username } = useContext(UserContext);
  const { room } = useParams();
  const { joinRoom, sendChat, messages } = useSocket(room, true);
  const [boatToPlace, setBoatToPlace] = useState(null);
  const [boatOrient, setBoatOrient] = useState("v");
  const history = useHistory();

  useEffect(() => {
    joinRoom(username);
  }, []);
  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          {winner ? (
            <Modal.Title>Congratulations! You Won!</Modal.Title>
          ) : (
            <Modal.Title>Oh No, You lost! Better luck next time!</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          The game is over now. Play again or return to waiting room. Or don't,
          it's up to you.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => history.push("/waiting")}>
            Go to Waiting Room
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              NewGame();
            }}
          >
            New Game Button NYI
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="bigShell">
        <Card fluid="lg" style={{ backgroundColor: "blue", color: "darkblue" }}>
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

          <Row>
            <Col style={{ backgroundColor: "gray" }}>
              <Card>
                <Card.Body>
                  <Card.Header as="h5">User Board:</Card.Header>

                  <Card.Body>
                    <div>
                      <Board
                        board={arr}
                        boatToPlace={boatToPlace}
                        boatOrient={boatOrient}
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
                      <Board board={arr1} boatToPlace={boatToPlace} />
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
        </Card>
      </div>
    </>
  );
}
