import React from "react";
import {
  Select,
  CheckHit,
  gameActive,
} from "../../../shared/context/GameContext";

function Cell({ i, coordinate, boatToPlace, boatOrient }) {
  return (
    <div
      onClick={() => {
        if (coordinate.user) {
          Select(i, coordinate.user, boatToPlace, boatOrient);
        }
        if (!coordinate.user) {
          Select(i, coordinate.user);
          CheckHit(i);
        }
      }}
      className={`cell flex ${
        coordinate.user ? (coordinate.ship ? "bg-grey" : "bg-blue") : "bg-grey"
      }`}
    >
      {coordinate.hit && (
        <div className={`peg ${coordinate.ship ? "bg-red" : "bg-white"}`}></div>
      )}
    </div>
  );
}

export default Cell;
