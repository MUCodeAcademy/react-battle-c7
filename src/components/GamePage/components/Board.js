import React, { useState } from "react";
import Cell from "./Cell";
import { CreateBoards } from "../../../shared/context/GameContext";

function Board({ board, boatToPlace, boatOrient }) {
  return (
    <div className="flex flexWrap board">
      {board.map((cell, i) => {
        return (
          <Cell
            key={i}
            i={i}
            coordinate={cell}
            boatToPlace={boatToPlace}
            boatOrient={boatOrient}
          />
        );
      })}
    </div>
  );
}

export default Board;
