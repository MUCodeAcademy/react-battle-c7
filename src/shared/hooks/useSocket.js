import { useEffect, useState, useRef, useCallback, useContext } from "react";
import socketIOClient from "socket.io-client";
import { UserContext } from "../context/UserContext";

const CHAT_MESSAGE = "chatMessage";
const SEND_GUESS = "sendGuess";
const BOATS_READY = "boatsReady";
// const GAME_END = "gameEnd";
const SERVER_URL = "http://localhost:8080";

const useSocket = (roomNum, isHost) => {
  const { username } = useContext(UserContext);
  const [color, setColor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currGuess, setCurrGuess] = useState(null);
  const [isHostSoc] = useState(isHost);
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
      console.log(`Received sendGuess from backend successfuly`);
      // console.log(newGuess);
    });

    socketRef.current.on(BOATS_READY, () => {
      // Do something...
      // set state to ready?
      console.log(`Received boatsReady from backend successfuly`);
    });

    return () => socketRef.current.disconnect();
  }, [roomNum]);
  // function passed to chat/gamePage that sends a message
  const sendChat = useCallback((msg) => {
    socketRef.current.emit(CHAT_MESSAGE, {
      msg,
      username,
      color,
    });
  }, []);
  // function passed to game that sends a guess
  const sendGuess = useCallback((newGuess) => {
    console.log(newGuess);
    socketRef.current.emit(SEND_GUESS, { ...newGuess });
  }, []);
  // function that determines boats are ready
  const sendBoatsReady = useCallback((ready) => {
    console.log(ready);
    socketRef.current.emit(BOATS_READY, { ...ready });
  }, []);

  const joinRoom = useCallback((username) => {
    socketRef.current.emit("joinRoom", { ...username });
  }, []);

  return { messages, sendChat, sendGuess, sendBoatsReady, joinRoom, isHost };
};

export default useSocket;
