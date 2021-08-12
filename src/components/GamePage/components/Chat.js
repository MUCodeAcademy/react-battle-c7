import React, { useState } from "react";
import useSocket from "../../../shared/hooks/useSocket";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(["hi"]);
  // const { sendChat, messages } = useSocket;
  function sendChat(message) {
    setMessages((curr) => [message, ...curr]);
  }
  return (
    <Container fluid>
      <Card className="chat">
        {messages.map((msg) => {
          return <Card.Text>{msg}</Card.Text>;
        })}
      </Card>
      <Row className="flex flexSpaceBetween">
        <Form.Group className="flex75 flexGrow" id="">
          <Form.Control
            onKeyPress={(e) => {
              if (e.key === "Enter" && message.length > 1) {
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
