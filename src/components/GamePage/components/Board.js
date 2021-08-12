import React, { useState } from "react";
import Cell from "./Cell";

function Board({ board }) {
  return (
    <div className="flex flexWrap board">
      {board.map((cell) => {
        return <Cell coordinate={cell} />;
      })}
    </div>
  );
}

export default Board;
