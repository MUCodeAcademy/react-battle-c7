import React, { useState } from "react";
import Cell from "./Cell";
import { CreateBoards } from "../../../shared/context/GameContext";

function Board({ board, boatToPlace }) {
  return (
    <div className="flex flexWrap board">
      {board.map((cell, i) => {
        return <Cell key={i} coordinate={cell} />;
      })}
    </div>
  );
}

export default Board;
