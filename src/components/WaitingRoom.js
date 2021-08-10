import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Alert, Button, Form, Container } from "react-bootstrap";

const WaitingRoom = () => {
  const [roomNum, setRoomNum] = useState("");
  const history = useHistory();
  const [error, setError] = useState(null);
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Card>
          {/* Join a Group */}
          <Card.Body
            style={{
              backgroundColor: "lightgray",
              boxShadow: "4px 4px 5px darkgray",
              minWidth: "350px",
            }}
          >
            <Form>
              <Form.Group>
                <Form.Label>Enter Room Number:</Form.Label>
                <Form.Control
                  placeholder="1234"
                  value={roomNum}
                  onChange={(e) => {
                    setRoomNum(e.target.value);
                  }}
                ></Form.Control>
                {/* Enter Room # to Join*/}
                <Button
                  onClick={(e) => {
                    console.log(roomNum);
                  }}
                >
                  Join room
                </Button>
              </Form.Group>
            </Form>
            {/* Join random room */}
          </Card.Body>
        </Card>
        <Card>{/* Host a group */}</Card>
        {error && (
          <Card>
            <Card.Body>
              <Alert variant="danger">{error}</Alert>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default WaitingRoom;
