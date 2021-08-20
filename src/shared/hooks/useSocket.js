import { useEffect, useState, useRef, useCallback, useContext } from "react";
import socketIOClient from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";

const CHAT_MESSAGE = "chatMessage";
const SEND_GUESS = "sendGuess";
const BOATS_READY = "boatsReady";
const SERVER_URL = "https://react-battle-c7.herokuapp.com/";

const useSocket = (roomNum) => {
  const { username, isHostCon } = useContext(UserContext);
  const {
    checkHit,
    setUserData,
    setUserBoatsReady,
    setOppBoatsReady,
    setIsTurn,
    setOpponentData,
  } = useContext(GameContext);
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

    socketRef.current.on(SEND_GUESS, ({ newGuess, wasHost }) => {
      // newGuess is i (coord)
      // checkHit should be called with i (coord) and user (boolean)
      const wasUserBoard = isHostCon !== wasHost;

      const valid = checkHit(newGuess, wasUserBoard);
      if (valid) {
        if (wasUserBoard) {
          setUserData((curr) => {
            curr[newGuess].hit = true;
            return curr;
          });
        } else {
          setOpponentData((curr) => {
            curr[newGuess].hit = true;
            return curr;
          });
        }
        // checkSinks();
        setIsTurn((curr) => !curr);
      }
    });

    socketRef.current.on(BOATS_READY, ({ boardData, wasHost }) => {
      // wasUser checks to see if the event was sent from the user/socket's player
      // If the event was sent from the host and the user is the host, then it knows it was sent from the user
      // Same if the user isn't the host and the event wasn't sent from the host
      // Otherwise we know the event was sent from the opponent, and the opponents board is set to the boardData.
      // If the event was received and both user and opp boats are ready it calls the startGame function
      const wasUser = isHostCon === wasHost;
      if (wasUser) {
        return;
      } else {
        let newOpp = boardData.map((obj) => {
          obj.user = false;
          return obj;
        });
        setOpponentData(newOpp);
        setOppBoatsReady(true);
      }
    });

    return () => socketRef.current.disconnect();
  }, [roomNum]);
  // function passed to chat/gamePage that sends a message
  const sendChat = useCallback(
    (msg, time) => {
      socketRef.current.emit(CHAT_MESSAGE, {
        msg,
        username,
        color,
        time,
      });
    },
    [color]
  );
  // function passed to game that sends a guess
  const sendGuess = useCallback((newGuess) => {
    socketRef.current.emit(SEND_GUESS, { newGuess, wasHost: isHostCon });
  }, []);
  // function that determines boats are ready
  const sendBoatsReady = useCallback((boardData) => {
    // when function is called, pass in userData as boardData
    setUserBoatsReady(true);
    socketRef.current.emit(BOATS_READY, { boardData, wasHost: isHostCon });
  }, []);

  const joinRoom = useCallback((username) => {
    socketRef.current.emit("joinRoom", { username });
  }, []);

  const disconnect = useCallback((username) => {
    socketRef.current.emit("disconnect", { username });
  }, []);

  const sunkShip = useCallback((boat) => {
    if (!socketRef.current) return;
    socketRef.current.emit("sunkShip", { username, boat });
  });

  return {
    messages,
    sendChat,
    sendGuess,
    sendBoatsReady,
    joinRoom,
    disconnect,
    sunkShip,
  };
};

export default useSocket;
