import React, { useState } from "react";
import Cell from "./Cell";

function Board({ board, boatToPlace, boatOrient, sendGuess }) {
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
            sendGuess={sendGuess}
          />
        );
      })}
    </div>
  );
}

export default Board;
