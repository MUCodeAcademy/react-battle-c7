import React, { useRef, useEffect, useState } from "react";
import { Card, Form, Button, Container, Row } from "react-bootstrap";

function Chat({ messages, sendChat }) {
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <Container fluid>
      <Card className="chat bg-black" ref={messageRef}>
        {messages &&
          messages.map((msg, i) => {
            return (
              <Card.Text
                key={i}
                style={{ color: msg.color }}
              >{`${msg.username}: ${msg.msg}`}</Card.Text>
            );
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
            if (message.length > 0) {
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
