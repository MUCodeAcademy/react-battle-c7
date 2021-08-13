import React, { useState, useContext } from "react";
import useSocket from "../../../shared/hooks/useSocket";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../../shared/context/UserContext";

function Chat() {
  const [message, setMessage] = useState("");
  const { username } = useContext(UserContext);
  const { messages, sendChat } = useSocket(12345678, username);
  return (
    <Container fluid>
      <Card className="chat bg-black">
        {messages.map((msg) => {
          return <Card.Text style={{color: msg.color}}>{`${msg.username}: ${msg.msg}`}</Card.Text>;
        })}
      </Card>
      <Row className="flex flexSpaceBetween">
        <Form.Group className="flex75 flexGrow" id="">
          <Form.Control
            onKeyPress={(e) => {
              if (e.key === "Enter" && message.length > 0) {
                sendChat(message);
                setMessage("");
              } 
            }}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
        </Form.Group>
        <Button
          onClick={() => {
            if (message.length > 1) {
              sendChat(message);
              setMessage("");
            }
          }}
          className="flex25 p-0"
        >
          Submit
        </Button>
      </Row>
    </Container>
  );
}

export default Chat;
