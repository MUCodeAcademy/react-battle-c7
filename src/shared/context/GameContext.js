import React, { useCallback, useEffect, useState, createContext, useContext } from "react";
import { UserContext } from "./UserContext";

export const GameContext = createContext(null);

export function GameProvider(props) {
  const [gameActive, setGameActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [userData, setUserData] = useState([]);
  const [opponentData, setOpponentData] = useState([]);
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState(false);
  const [userHit, setUserHit] = useState(0);
  const [oppHit, setOppHit] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const {isHostCon} = useContext(UserContext);
  

  useEffect(() => {
    resetBoards();
  }, []);

  useEffect(() => {
    if(isHostCon)
    {
      setTurn(true);
    }
    else
    {
      setTurn(false);
    }
  },[isHostCon])

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
    setReady(true);
    console.log(ready);
  }, []);
  const startGame = useCallback(() => {
    setGameActive(true);
    console.log(gameActive)
  }, []);

  const checkHit = useCallback((coordinate, user) => {
    if (user) {
      userData[coordinate].hit = true;
      if (userData[coordinate].ship === true) setOppHit((curr) => curr++);
    } else {
      opponentData[coordinate].hit = true;
      if (opponentData[coordinate].ship === true) setUserHit((curr) => curr++);
      setTotalGuesses((curr) => curr++);
    }
    checkWin(user);
    setTurn(curr => !curr);
  }, []);

  const select = useCallback((coordinate, user, type, orientation) => {
    if (!gameActive && !ready && user) {
      placeBoat(coordinate, type, orientation);
    }
    if (gameActive && !user) {
      checkHit(coordinate, user);
    }
  }, []);

  const checkWin = useCallback((user) => {
    if (user && oppHit === 14) {
      setWinner("Opponent");
      endGame();
    } else if (!user && userHit === 14) {
      setWinner("User");
      endGame();
    }
  },[]);

  const newGame = useCallback(() => {
    resetBoards();
    setReady(false);
    setOppHit(0);
    setUserHit(0);
    setTotalGuesses(0);
    setWinner("");
    if(isHostCon)
    {
      setTurn(true);
    }
    else
    {
      setTurn(false);
    }
  },[]);

  const endGame = useCallback(() => {
    setGameActive(false);
  },[])

  const resetBoards = useCallback(() => {
    for (let i = 0; i < 100; i++) {
      userData[i] = { player: true, hit: false, ship: false };
      opponentData[i] = { player: false, hit: false, ship: false };
    }
    console.log(userData);
    setUserData((curr) => [...curr]);
    setOpponentData((curr) => [...curr]);
  },[]);

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
        resetBoards
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
