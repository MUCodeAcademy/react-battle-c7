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
  }, [ready]);
  const startGame = useCallback(() => {
    setGameActive(true);
    console.log(gameActive)
  }, [gameActive]);

  const checkHit = useCallback((coordinate, user) => {
    if (user) {
      userData[coordinate].hit = true;
      setUserData(curr => [...curr])
      if (userData[coordinate].ship === true) setOppHit((curr) => curr + 1);
    } else {
      opponentData[coordinate].hit = true;
      setOpponentData(curr => [...curr]);
      if (opponentData[coordinate].ship === true) setUserHit((curr) => curr + 1);
      setTotalGuesses((curr) => curr + 1);
    }
    console.log(userHit, oppHit, totalGuesses)
    checkWin(user);
    setTurn( !turn);
  }, [userData, opponentData, totalGuesses, turn, oppHit, userHit]);
  
  const select = useCallback((coordinate, user, type, orientation) => {
    if (!gameActive && !ready && user) {
      placeBoat(coordinate, type, orientation);
    }
    if (gameActive && !user && turn) {
      checkHit(coordinate, user);
      
    }
  }, [gameActive, ready, placeBoat, checkHit]);



  const checkWin = useCallback((user) => {
    if (user && oppHit === 1) {
      setWinner("Opponent");
      endGame();
      console.log("Win")
    } else if (!user && userHit === 1) {
      setWinner("User");
      endGame();
      console.log("Win")
    }
  },[winner,checkHit, oppHit, userHit]);

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
  },[gameActive, checkWin, winner])

  const resetBoards = useCallback(() => {
    for (let i = 0; i < 100; i++) {
      userData[i] = { player: true, hit: false, ship: false };
      opponentData[i] = { player: false, hit: false, ship: false };
    }
    console.log(userData);
    setUserData((curr) => [...curr]);
    setOpponentData((curr) => [...curr]);
  },[userData, opponentData]);

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
        ready,
        checkHit,
        gameActive
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
