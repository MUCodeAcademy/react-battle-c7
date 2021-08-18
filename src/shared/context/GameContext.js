import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import { UserContext } from "./UserContext";

export const GameContext = createContext(null);

export function GameProvider(props) {
  const [gameActive, setGameActive] = useState(false);
  const [userBoatsReady, setUserBoatsReady] = useState(false);
  const [oppBoatsReady, setOppBoatsReady] = useState(false);
  const [userData, setUserData] = useState([]);
  const [opponentData, setOpponentData] = useState([]);
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState(false);
  const [userHit, setUserHit] = useState(0);
  const [oppHit, setOppHit] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const { isHostCon } = useContext(UserContext);

  useEffect(() => {
    resetBoards();
  }, []);

  useEffect(() => {
    setTurn(isHostCon);
  }, [isHostCon]);

  const placeBoat = useCallback(
    (coordinate, int, orientation) => {
      let boatCheck = false;
      let newArr = [...userData];
      if (orientation === "h" && 10 - (coordinate % 10) >= int) {
        for (let i = 0; i < int; i++) {
          if (newArr[coordinate + i].ship === true) {
            boatCheck = true;
          }
        }
        if (!boatCheck) {
          for (let i = 0; i < int; i++) {
            newArr[coordinate + i] = { ...newArr[coordinate + i], ship: true };
          }
        }
      } else if (orientation === "v" && coordinate + (int - 1) * 10 < 100) {
        for (let i = 0; i < int; i++) {
          if (newArr[coordinate + i * 10].ship === true) {
            boatCheck = true;
          }
        }
        if (!boatCheck) {
          for (let i = 0; i < int; i++) {
            newArr[coordinate + i * 10] = {
              ...newArr[coordinate + i * 10],
              ship: true,
            };
          }
        }
      }
      setUserData(() => newArr);
    },
    [userData]
  );

  const boatsReady = useCallback(() => {
    setUserBoatsReady(true);
    console.log(userBoatsReady);
  }, [userBoatsReady]);
  const startGame = useCallback(() => {
    setGameActive(true);
    console.log(gameActive);
  }, [gameActive]);

  const checkHit = useCallback(
    async (coordinate, user) => {
      if (!user) {
        console.log(coordinate);
        console.log(userData);
        userData[coordinate].hit = true;
        setUserData((curr) => [...curr]);
        if (userData[coordinate].ship === true)
          await setOppHit((curr) => curr + 1);
      } else {
        opponentData[coordinate].hit = true;
        setOpponentData((curr) => [...curr]);
        if (opponentData[coordinate].ship === true)
          await setUserHit((curr) => curr + 1);
        setTotalGuesses((curr) => curr + 1);
      }
      console.log(userHit, oppHit, totalGuesses);
      checkWin(user);
      setTurn(!turn);
    },
    [userData, opponentData, totalGuesses, turn, oppHit, userHit]
  );

  const checkWin = useCallback(
    (user) => {
      if (user && oppHit === 14) {
        setWinner("Opponent");
        endGame();
        console.log("Win");
      } else if (!user && userHit === 14) {
        setWinner("User");
        endGame();
        console.log("Win");
      }
    },
    [winner, oppHit, userHit, checkHit]
  );

  const select = useCallback(
    (coordinate, user, type, orientation) => {
      if (!gameActive && !userBoatsReady && user) {
        placeBoat(coordinate, type, orientation);
        console.log(coordinate, type, orientation);
      }
      if (gameActive && !user && turn) {
        checkHit(coordinate, user);
      }
    },
    [gameActive, userBoatsReady, placeBoat, checkHit]
  );

  const endGame = useCallback(() => {
    setGameActive(false);
  }, [gameActive, checkWin, winner]);

  const checkWinner = useMemo(() => {
    if (userHit === 1) {
      setWinner("User");
      endGame();
      console.log("Win");
    } else if (oppHit === 1) {
      setWinner("Opponent");
      endGame();
      console.log("Winner");
    }
  }, [userHit, oppHit]);

  const resetBoards = useCallback(() => {
    setUserData((curr) => {
      let next = new Array(100);
      next.fill({ user: true, hit: false, ship: false });
      return next;
    });
    setOpponentData((curr) => {
      let next = new Array(100);
      next.fill({ user: false, hit: false, ship: false });
      return next;
    });
  }, [userData, opponentData]);

  const newGame = useCallback(() => {
    resetBoards();
    setGameActive(false);
    setUserBoatsReady(false);
    setOppHit(0);
    setUserHit(0);
    setTotalGuesses(0);
    setWinner("");
    if (isHostCon) {
      setTurn(true);
    } else {
      setTurn(false);
    }
  }, [
    resetBoards,
    userBoatsReady,
    oppHit,
    userHit,
    totalGuesses,
    winner,
    isHostCon,
    gameActive,
  ]);

  return (
    <GameContext.Provider
      value={{
        userData,
        opponentData,
        placeBoat,
        select,
        boatsReady,
        startGame,
        newGame,
        winner,
        turn,
        totalGuesses,
        resetBoards,
        userBoatsReady,
        setUserBoatsReady,
        checkHit,
        gameActive,
        oppHit,
        userHit,
        userBoatsReady,
        setUserBoatsReady,
        oppBoatsReady,
        setOppBoatsReady,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
