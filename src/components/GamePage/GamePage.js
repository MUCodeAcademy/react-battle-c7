import React from "react";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import Chat from "./components/Chat";

function GamePage() {
  return (<> 
  <Board board={[]}/>
  <ScoreBoard/>
  <Chat />
  </>)
}

export default GamePage;
