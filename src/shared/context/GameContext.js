import React, {useCallback, useEffect, useState} from "react";

export const GameContext = createContext(null);


export function GameProvider(props) {
    const [userData, setUserData] = useState([]);
    const [opponentData, setOpponentData] = useState([]);
    let ready = false;
    let turn = false;
    let userHit = 0;
    let opponentHit = 0;
    let totalGuesses = 0;

    useEffect(()=>{
      userData.fill({player: true, hit: false, ship: false}, 0, 99);
      opponentData.fill({player: false, hit: false, ship: false}, 0, 99);
      setUserData(curr => [...curr]);
      setOpponentData(curr => [...curr]);
    },[])


    const placeBoat = useCallback( (coordinates, int, orientation) => {
      for(let i = 0; i < int; i++)
      {
        if(orientation === 'h')
        {
          userData[coordinates + i].ship = true;
        }
        else
        {
          userData[coordinates + (i * 10)].ship = true;
        }
      }
    });


   const ready = (()=>{
        
    })
    const startGame = (()=>{
        if(user.ready && opponent.ready){

        }

    })
    const endGame = (()=>{
        
    })
    const selectCoords = ((coordinates)=>{
        
    })
    const checkHit = ((coordinates)=>{
        
    })
    const checkWin = ((userHit)=>{
        
    })
    const newGame = (()=>{
        
    })





    return (
        <GameContext.Provider value={{ placeBoat, ready, startGame, endGame, selectCoords, checkHit, checkWin, newGame }}>
          {props.children}
        </GameContext.Provider>
      );
}