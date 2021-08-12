import React from "react";

function Cell({ coordinate }) {
  return (
    <div
      onClick={() => {
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
