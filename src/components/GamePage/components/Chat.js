import React from "react";
import useSocket from "../../../shared/hooks/useSocket";
import { Card, Form, Button, Container, ListGroup } from "react-bootstrap";

function Chat() {
  // const { sendChat, messages } = useSocket;

  const messages = ["Hi", "Hey", "ga", "gaasdg", "ate", "teatsdt", "asdgadsg"];

  return (
    <Container>
      <Card className="chat">
        {messages.map((msg) => {
          return <Card.Text>{msg}</Card.Text>;
        })}
      </Card>
      <Form.Group id="">
        <Form.Control type="" />
      </Form.Group>
    </Container>
  );
}

export default Chat;
