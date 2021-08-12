import React from "react";
import Cell from "./Cell";

function Board() {
  return <div>This is the Board!
    <Cell coordinate={{hit: true, ship: false, coordinate: "A1", player: false}}/>
  </div>;
}

export default Board;
