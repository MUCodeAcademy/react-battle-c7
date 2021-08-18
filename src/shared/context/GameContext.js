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
  const [isTurn, setIsTurn] = useState(false);
  const [userHit, setUserHit] = useState(0);
  const [oppHit, setOppHit] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const { isHostCon } = useContext(UserContext);

  useEffect(() => {
    resetBoards();
  }, []);

  useEffect(() => {
    if (isHostCon) {
      setIsTurn(true);
    } else {
      setIsTurn(false);
    }
  }, [isHostCon]);

  const placeBoat = useCallback((coordinate, int, orientation) => {
    let boatCheck = false;
    if (orientation === "h" && 10 - (coordinate % 10) >= int) {
      for (let i = 0; i < int; i++) {
        if (userData[coordinate + i].ship === true) {
          boatCheck = true;
        }
      }
      if (boatCheck === false) {
        for (let i = 0; i < int; i++) {
          userData[coordinate + i].ship = true;
        }
      }
    } else if (orientation === "v" && coordinate + (int - 1) * 10 < 100) {
      for (let i = 0; i < int; i++) {
        if (userData[coordinate + i * 10].ship === true) {
          boatCheck = true;
        }
      }
      if (boatCheck === false) {
        for (let i = 0; i < int; i++) {
          userData[coordinate + i * 10].ship = true;
        }
      }
    }
    setUserData((curr) => [...curr]);
  }, []);

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
    },
    [userData, opponentData, totalGuesses, isTurn, oppHit, userHit]
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
      }
      if (gameActive && !user && isTurn) {
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
    for (let i = 0; i < 100; i++) {
      userData[i] = { user: true, hit: false, ship: false };
      opponentData[i] = { user: false, hit: false, ship: false };
    }
    console.log("userData:", userData);
    console.log("opponentData:", opponentData);
    setUserData((curr) => [...curr]);
    setOpponentData((curr) => [...curr]);
  }, [userData, opponentData]);

  const newGame = useCallback(() => {
    resetBoards();
    setUserBoatsReady(false);
    setOppHit(0);
    setUserHit(0);
    setTotalGuesses(0);
    setWinner("");
    if (isHostCon) {
      setIsTurn(true);
    } else {
      setIsTurn(false);
    }
  }, [
    resetBoards,
    userBoatsReady,
    oppHit,
    userHit,
    totalGuesses,
    winner,
    isHostCon,
  ]);

  return (
    <GameContext.Provider
      value={{
        userData,
        opponentData,
        setOpponentData,
        placeBoat,
        select,
        boatsReady,
        startGame,
        newGame,
        winner,
        isTurn,
        setIsTurn,
        totalGuesses,
        resetBoards,
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
