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
  const { username, isHostCon } = useContext(UserContext);
  const {
    startGame,
    checkHit,
    setOpponentData,
    userBoatsReady,
    setUserBoatsReady,
    oppBoatsReady,
    setOppBoatsReady,
    oppShips,
    setOppShips
  } = useContext(GameContext);
  const [color, setColor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currGuess, setCurrGuess] = useState(null);
  const [isHostSoc] = useState(isHostCon);
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

    socketRef.current.on("sunkShip", ({ boat }) => {
      switch (boat) {
        case 2:
          setOppShips({...oppShips, shipSunk: true});
          break;
        case 3:
          setOppShips({...oppShips, shipThreeSunk: true});
          break;
        case 4:
          setOppShips({...oppShips, shipFourSunk: true});
          break;
        case 5:
          setOppShips({...oppShips, shipFiveSunk: true});
          break;
        default:
          break;
      }
    });

    socketRef.current.on(SEND_GUESS, ({ newGuess, wasHost }) => {
      // newGuess is i (coord)
      // checkHit should be called with i (coord) and user (boolean)
      const wasPlayer = isHostSoc === wasHost;
      checkHit(newGuess, wasPlayer);
      console.log(`Received sendGuess from backend successfuly`);
      // console.log(newGuess);
    });

    socketRef.current.on(BOATS_READY, (boardData) => {
      console.log(boardData);
      setOpponentData(boardData);
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
    // for newGuess, line 76 pass newguessa nd ishostcon
    // checkHit(newGuess, false);
    socketRef.current.emit(SEND_GUESS, { newGuess, wasHost: isHostSoc });
  }, []);
  // function that determines boats are ready
  const sendBoatsReady = useCallback((boardData) => {
    // when function is called, pass in userData as boardData
    socketRef.current.emit(BOATS_READY, { ...boardData });
    if (userBoatsReady && oppBoatsReady) {
      startGame();
    }
  }, []);

  const joinRoom = useCallback((username) => {
    socketRef.current.emit("joinRoom", { username });
  }, []);

  const sunkShip = useCallback((boat) => {
    socketRef.current.emit("sunkShip", { boat });
  });

  return { messages, sendChat, sendGuess, sendBoatsReady, joinRoom, isHostSoc };
};

export default useSocket;
