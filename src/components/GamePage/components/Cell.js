import React, { useContext } from "react";
import { GameContext } from "../../../shared/context/GameContext";
import {
  Select,
  CheckHit,
  gameActive,
} from "../../../shared/context/GameContext";

function Cell({ i, coordinate, boatToPlace, boatOrient, sendGuess}) {
  const { select } = useContext(GameContext);
  return (
    <div
      onClick={() => {
        if(coordinate.user === true)
        {
          select(i, coordinate.user, boatOrient);
        }
        else
        {
          select(i, coordinate.user);
          sendGuess(i);
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
