import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";

const CHAT_MESSAGE = "chatMessage";
const SEND_GUESS = "sendGuess";
const SERVER_URL = "http://localhost:8080";

const useSocket = (roomNum, username) => {
  const [color, setColor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currGuess, setCurrGuess] = useState(null);
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = socketIOClient(SERVER_URL, {
      query: { roomNum },
    });

    socketRef.current.on(CHAT_MESSAGE, (chatMsg) => {
      setMessages((curr) => [...curr, chatMsg]);
    });

    socketRef.current.on("userColor", ({ color }) => {
      setColor(color);
    });

    socketRef.current.on(SEND_GUESS, (newGuess) => {
      // set current move? Do something...
      setCurrGuess(newGuess);
    });

    return () => socketRef.current.disconnect();
  }, [roomNum]);

  const sendChat = (msg) => {
    socketRef.current.emit(CHAT_MESSAGE, {
      msg,
      username,
      color,
    });
  };

  const sendGuess = (newGuess) => {
    socketRef.current.emit("sendGuess", { ...newGuess, username });
  };

  return { messages, sendChat, sendGuess };
};

export default useSocket;
