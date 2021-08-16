import React from "react";
import { Select, CheckHit, gameActive,PlaceBoats } from "../../../shared/context/GameContext";

function Cell({ coordinate, boatsToPlace }) {
  return (
    <div
      onClick={() => {
        if (coordinate.player) {
          Select(coordinate.coordinate);
          CheckHit(coordinate.coordinate);
        } else if (!gameActive) {
          PlaceBoats(boatsToPlace);
        }
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
