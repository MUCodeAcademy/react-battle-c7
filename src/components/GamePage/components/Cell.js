import React, { useContext } from "react";
import { GameContext } from "../../../shared/context/GameContext";

function Cell({ i, coordinate, boatOrient, sendGuess }) {
  const { placeBoat, isTurn, gameActive, userBoatsReady, currentShip } =
    useContext(GameContext);
  return (
    <div
      onClick={() => {
        if (coordinate.user && !userBoatsReady) {
          placeBoat(i, currentShip, boatOrient);
        } else if (
          !coordinate.user &&
          gameActive &&
          isTurn &&
          !coordinate.hit
        ) {
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
