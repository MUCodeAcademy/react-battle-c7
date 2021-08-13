import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  Alert,
  Button,
  Form,
  Container,
  Col,
  Row,
} from "react-bootstrap";

const WaitingRoom = () => {
  const [roomNum, setRoomNum] = useState("");
  const history = useHistory();
  const [error, setError] = useState(null);
  function genRoomNum() {
    let randNum = "";
    var chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charsLength = chars.length;
    for (var i = 0; i < 8; i++) {
      randNum += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return randNum;
  }

  return (
    <>
      <Container
        style={{
          // minHeight: "50vh",
          // textAlign: "center",
          backgroundColor: "lightgray",
          boxShadow: "4px 4px 5px darkgray",
          marginTop: "10px",
          maxWidth: "700px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Waiting Room</h2>
        </div>
        <Row>
          <Col>
            <Row>
              <Col sm="6">
                <div style={{ margin: "10px" }}>
                  {/* Join a Group */}
                  <Card.Body
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: "200px", backgroundColor: "lightgray" }}
                  >
                    <Form>
                      <Form.Group>
                        <Row>
                          <Col>
                            <div style={{ margin: "10px" }}>
                              <h2>Join a Room!</h2>
                            </div>
                            <Form.Label>Room Number</Form.Label>
                          </Col>
                        </Row>
                        <Form.Control
                          placeholder="1234"
                          value={roomNum}
                          onChange={(e) => {
                            setRoomNum(e.target.value);
                          }}
                        ></Form.Control>

                        {/* Enter Room # to Join*/}
                        <div
                          className="d-flex justify-content-center"
                          style={{ margin: "10px" }}
                        >
                          <Button
                            onClick={(e) => {
                              // set limits of roomNum
                              if (roomNum.length !== 8) {
                                setError("Room Number must be 8 characters!");
                              } else {
                                setError(null);
                                // TODO figure out how to tell if a room already exists

                                // TODO Only let user join if room exists and if room only has one other user
                                history.push(`/gamepage/${roomNum}`);
                                console.log(
                                  `Directing user to Game Room ${roomNum} NYI`
                                );
                              }
                            }}
                          >
                            Join room
                          </Button>
                        </div>
                      </Form.Group>
                    </Form>

                    {/* Join random room */}
                  </Card.Body>
                </div>
              </Col>
              <Col sm="6">
                <div style={{ margin: "10px" }}>
                  <Card.Body
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      height: "200px",
                      backgroundColor: "lightgray",
                    }}
                  >
                    <Form>
                      <Row>
                        <Col>
                          <h2>Host a Room!</h2>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="d-flex justify-content-center">
                          <Button
                            onClick={(e) => {
                              //generate a random number
                              let room = genRoomNum();
                              //use history to redirect them
                              console.log(
                                `Directing user to Game Room ${room} NYI`
                              );
                              // TODO Only let user
                              history.push(`/gamepage/${room}`);
                            }}
                            // This will need to have on onclick function of generating a random room number and then joining that room.
                          >
                            Host Room
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                  {/* Host a group */}
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col className="d-flex justify-content-center"> */}
            {error && (
              <Alert style={{ margin: "10px" }} variant="danger">
                {error}
              </Alert>
            )}
            {/* </Col>
            </Row> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WaitingRoom;
