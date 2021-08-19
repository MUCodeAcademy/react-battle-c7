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
    isTurn,
    setIsTurn,
    oppShips,
    setOppShips,
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
          setOppShips({ ...oppShips, shipSunk: true });
          break;
        case 3:
          setOppShips({ ...oppShips, shipThreeSunk: true });
          break;
        case 4:
          setOppShips({ ...oppShips, shipFourSunk: true });
          break;
        case 5:
          setOppShips({ ...oppShips, shipFiveSunk: true });
          break;
        default:
          break;
      }
    });

    socketRef.current.on(SEND_GUESS, ({ newGuess, wasHost }) => {
      // newGuess is i (coord)
      // checkHit should be called with i (coord) and user (boolean)
      const wasUser = isHostSoc === wasHost;
      console.log("wasUser:", wasUser);
      if (wasUser === true) {
        setIsTurn(false);
      }
      if (wasUser === false) {
        setIsTurn(true);
        checkHit(newGuess, true);
      }
      console.log(`Received sendGuess from backend successfuly`);
      // console.log(newGuess);
    });

    socketRef.current.on(BOATS_READY, ({ boardData, wasHost }) => {
      console.log(`Received boatsReady from backend successfuly`);
      // wasUser checks to see if the event was sent from the user/socket's player
      // If the event was sent from the host and the user is the host, then it knows it was sent from the user
      // Same if the user isn't the host and the event wasn't sent from the host
      // Otherwise we know the event was sent from the opponent, and the opponents board is set to the boardData.
      // If the event was received and both user and opp boats are ready it calls the startGame function
      const wasUser = isHostSoc === wasHost;
      if (wasUser) {
        return;
      } else {
        console.log("boatsReady event sent by opponent");
        boardData.map((obj) => {
          obj.user = false;
        });
        setOpponentData(boardData);
        setOppBoatsReady(true);
      }
      if (userBoatsReady) {
        console.log("firing start game");
        startGame();
      }
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
    socketRef.current.emit(SEND_GUESS, { newGuess, wasHost: isHostSoc });
  }, []);
  // function that determines boats are ready
  const sendBoatsReady = useCallback((boardData) => {
    // when function is called, pass in userData as boardData
    setUserBoatsReady(true);
    console.log("boardData:", boardData);
    if (oppBoatsReady) {
      startGame();
    }
    socketRef.current.emit(BOATS_READY, { boardData, wasHost: isHostSoc });
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
