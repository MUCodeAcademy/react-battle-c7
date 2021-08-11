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
  return (
    <>
      <Container style={{ minHeight: "100vh", textAlign: "center" }}>
        <h1>Waiting Room</h1>
        <Row>
          <Col>
            <Row>
              <Col md="6">
                <Card style={{ margin: "10px" }}>
                  {/* Join a Group */}
                  <Card.Body
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "lightgray",
                      boxShadow: "4px 4px 5px darkgray",
                      // minWidth: "350px",
                      height: "200px",
                    }}
                  >
                    <Form>
                      <Form.Group>
                        <Row>
                          <Col>
                            <h4>Enter Room Number:</h4>
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
                              console.log(roomNum);
                            }}
                          >
                            Join room
                          </Button>
                        </div>
                      </Form.Group>
                    </Form>

                    {/* Join random room */}
                  </Card.Body>
                </Card>
              </Col>
              <Col md="6">
                <Card style={{ margin: "10px" }}>
                  <Card.Body
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "lightgray",
                      boxShadow: "4px 4px 5px darkgray",
                      // minWidth: "350px",
                      height: "200px",
                    }}
                  >
                    <Form>
                      <Row>
                        <Col>
                          <h4>Host a Room!</h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="d-flex justify-content-center">
                          <Button
                          // This will need to have on onclick function of generating a random room number and then joining that room.
                          >
                            Host Room
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                  {/* Host a group */}
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                {error && <Alert variant="danger">{error}</Alert>}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WaitingRoom;
