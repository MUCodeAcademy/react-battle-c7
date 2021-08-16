import React, { useState } from "react";
import Cell from "./Cell";

function Board({ board }) {
  return (
    <div className="flex flexWrap board">
      {board.map((cell,i) => {
        return <Cell key={i} i={i} coordinate={cell} />;
      })}
    </div>
  );
}

export default Board;
