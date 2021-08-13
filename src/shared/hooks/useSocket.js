import { useEffect, useState, useRef, useCallback } from "react";
import socketIOClient from "socket.io-client";

const CHAT_MESSAGE = "chatMessage";
const SERVER_URL = "http://localhost:8080";

const useSocket = (roomNum, username) => {
  const [color, setColor] = useState(null);
  const [messages, setMessages] = useState([{msg: "Hi", username: "Bob", color: "red"}]);
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = socketIOClient(SERVER_URL, {
      query: { roomNum },
    });

    socketRef.current.on(CHAT_MESSAGE, (chatMsg) => {
      setMessages((curr) => [ chatMsg, ...curr]);
    });

    socketRef.current.on("userColor", ({ color }) => {
      setColor(color);
    });

    return () => socketRef.current.disconnect();
  }, [roomNum]);

  const sendChat = useCallback((msg) => {
    socketRef.current.emit(CHAT_MESSAGE, {
      msg,
      username,
      color,
    });
  });
  return { messages, sendChat };
};

export default useSocket;
