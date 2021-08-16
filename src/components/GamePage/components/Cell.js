import React, {useContext} from "react";
import { GameContext } from "../../../shared/context/GameContext";

function Cell({ coordinate, i }) {
  const {select} = useContext(GameContext);
  return (
    <div
      onClick={() => {
        console.log(i, coordinate.player)
        select(i, coordinate.player);
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
