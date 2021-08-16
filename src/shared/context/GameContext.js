import React, { useCallback, useEffect, useState, createContext } from "react";

export const GameContext = createContext(null);

export function GameProvider(props) {
  const [gameActive, setGameActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [userData, setUserData] = useState([]);
  const [opponentData, setOpponentData] = useState([]);

  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      userData[i] = { player: true, hit: false, ship: false };
      opponentData[i] = { player: false, hit: false, ship: false };
    }
    console.log(userData);
    setUserData((curr) => [...curr]);
    setOpponentData((curr) => [...curr]);
  }, []);

  const placeBoat = useCallback((coordinate, int, orientation) => {
    let boatCheck = false;
    if (orientation === "h" && 10 - ((coordinate) % 10) >= int) {
      for(let i = 0; i < int; i++){
        if(userData[coordinate + i].ship === true)
        {
          boatCheck = true;
        }
      }
      if (boatCheck === false)
      {
        for (let i = 0; i < int; i++) {
          userData[coordinate + i].ship = true;
        }
      }
    } else if (orientation === "v" && coordinate + ((int - 1) * 10) < 100) {
      for(let i = 0; i < int; i++){
        if(userData[coordinate + i * 10].ship === true)
        {
          boatCheck = true;
        }
      }
      if(boatCheck === false)
      {
        for (let i = 0; i < int; i++) {
          userData[coordinate + i * 10].ship = true;
        }
      }
    }
    setUserData(curr => [...curr]);
  });

  //  const ready = (()=>{

  //   })
  // const startGame = (()=>{
  //     if(user.ready && opponent.ready){

  //     }

  // })
  // const endGame = (()=>{

  // })
  const select = useCallback((coordinate, player) => {
    if (!gameActive && !ready && player) {
      console.log(coordinate, 3, "v");
      placeBoat(coordinate, 3, "v");
    }
  });
  // const checkHit = ((coordinates)=>{

  // })
  // const checkWin = ((userHit)=>{

  // })
  // const newGame = (()=>{

  // })

  return (
    <GameContext.Provider value={{ userData, opponentData, placeBoat, select }}>
      {props.children}
    </GameContext.Provider>
  );
}
