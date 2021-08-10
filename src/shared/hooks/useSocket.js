import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";

const CHAT_MESSAGE = "chatMessage";
const SERVER_URL = "http://localhost:8080";

const useSocket = (roomNum, username) => {
  const [color, setColor] = useState(null);
  const [messages, setMessages] = useState([]);
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

    return () => socketRef.current.disconnect();
  }, [roomNum]);

  const sendChat = (msg) => {
    socketRef.current.emit(CHAT_MESSAGE, {
      msg,
      username,
      color,
    });
  };
  return { messages, sendChat };
};

export default useSocket;
