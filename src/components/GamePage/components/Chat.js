import React, { useRef, useEffect, useState } from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";

function Chat({ messages, sendChat }) {
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);

  useEffect(() => {
    try {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    } catch (err) {}
  }, [messages]);

  return (
    <Container fluid>
      <Card className="chat bg-black" ref={messageRef}>
        {messages &&
          messages.map((msg, i) => {
            return (
              <Card.Text
                key={i}
                style={{ color: msg.color }}
                className="chatMargin"
              >{`${msg.username} ${msg.time}: ${msg.msg}`}</Card.Text>
            );
          })}
      </Card>
      <Row className="flex flexSpaceBetween" spacing={0}>
        <Col sm={9}>
          <Form.Group id="">
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
        </Col>

        <Button
          onClick={() => {
            if (message.length > 0) {
              sendChat(message);
              setMessage("");
            }
          }}
          className="flex25 p-0"
        >
          Send
        </Button>
      </Row>
    </Container>
  );
}

export default Chat;
