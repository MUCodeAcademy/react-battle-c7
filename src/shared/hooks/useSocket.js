import { useEffect, useState, useRef, useCallback, useContext } from "react";
import socketIOClient from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";

const CHAT_MESSAGE = "chatMessage";
const SEND_GUESS = "sendGuess";
const BOATS_READY = "boatsReady";
const GAME_END = "gameEnd";
const SERVER_URL = "http://localhost:8080";

const useSocket = (roomNum, isHost) => {
  const { username } = useContext(UserContext);
  const { startGame, checkHit, setOppData } = useContext(GameContext);
  const [color, setColor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currGuess, setCurrGuess] = useState(null);
  const [userBoatsReady, setUserBoatsReady] = useState(null);
  const [oppBoatsReady, setOppBoatsReady] = useState(null);
  const [isHostSoc] = useState(isHost);
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = socketIOClient(SERVER_URL, {
      query: { roomNum },
    });

    socketRef.current.on(CHAT_MESSAGE, (chatMsg) => {
      setMessages((curr) => [chatMsg, ...curr]);
    });

    socketRef.current.on("userColor", ({ color }) => {
      setColor(color);
    });

    socketRef.current.on(SEND_GUESS, (newGuess) => {
      // newGuess is i (coord)
      // checkHit should be called with i (coord) and user (boolean)
      checkHit(newGuess, true);
      console.log(`Received sendGuess from backend successfuly`);
      // console.log(newGuess);
    });

    socketRef.current.on(BOATS_READY, (boardData) => {
      setOppData(boardData);
      setOppBoatsReady(true);
      if (userBoatsReady && oppBoatsReady) {
        startGame();
      }
      console.log(`Received boatsReady from backend successfuly`);
    });

    return () => socketRef.current.disconnect();
  }, [roomNum]);
  // function passed to chat/gamePage that sends a message
  const sendChat = useCallback(
    (msg) => {
      socketRef.current.emit(CHAT_MESSAGE, {
        msg,
        username,
        color,
      });
    },
    [color]
  );
  // function passed to game that sends a guess
  const sendGuess = useCallback((newGuess) => {
    checkHit(newGuess, false);
    socketRef.current.emit(SEND_GUESS, { newGuess });
  }, []);
  // function that determines boats are ready
  const sendBoatsReady = useCallback((boardData) => {
    // when function is called, pass in userData as boardData
    setUserBoatsReady(true);
    socketRef.current.emit(BOATS_READY, { ...boardData });
    if (userBoatsReady && oppBoatsReady) {
      startGame();
    }
  }, []);

  const joinRoom = useCallback((username) => {
    socketRef.current.emit("joinRoom", { username });
  }, []);

  return { messages, sendChat, sendGuess, sendBoatsReady, joinRoom, isHost };
};

export default useSocket;
