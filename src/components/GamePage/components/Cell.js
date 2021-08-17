import React, { useContext } from "react";
import { GameContext } from "../../../shared/context/GameContext";
import {
  Select,
  CheckHit,
  gameActive,
} from "../../../shared/context/GameContext";

function Cell({ i, coordinate, boatToPlace, boatOrient }) {
  const { select } = useContext(GameContext);
  return (
    <div
      onClick={() => {
        console.log(i, coordinate.player);
        select(i, coordinate.player);
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
