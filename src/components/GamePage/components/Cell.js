import React from "react";
import { Select, CheckHit } from "../../../shared/context/GameContext";

function Cell({ coordinate }) {
  return (
    <div
      onClick={() => {
        Select(coordinate.coordinate);
        CheckHit(coordinate.coordinate);
        // cellSelected(coordinate.coordinate);
      }}
      className={`cell flex ${
        coordinate.player
          ? coordinate.ship
            ? "bg-grey"
            : "bg-blue"
          : "bg-grey"
      }`}
    >
      {coordinate.hit && (
        <div className={`peg ${coordinate.ship ? "bg-red" : "bg-white"}`}></div>
      )}
    </div>
  );
}

export default Cell;
