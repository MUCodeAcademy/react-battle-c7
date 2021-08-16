import React, { useState } from "react";
import Cell from "./Cell";
import { CreateBoards } from "../../../shared/context/GameContext";

function Board({ board, boatToPlace }) {
  return (
    <div className="flex flexWrap board">
      {board.map((cell) => {
        return <Cell coordinate={cell} boatToPlace={boatToPlace} />;
      })}
    </div>
  );
}

export default Board;
