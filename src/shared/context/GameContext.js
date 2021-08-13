import React from "react";

export const GameContext = createContext(null);


export function GameProvider(props) {
    const userDate= [{}];
    const opponentData = [{}];
    let ready = false;
    let turn = false;
    let userHit = 0;
    let opponentHit = 0;
    let totalGuesses = 0;


    const placeBoat = ((int)=>{

    })
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