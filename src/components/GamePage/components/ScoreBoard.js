import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { GameContext } from "../../../shared/context/GameContext";
import { useParams } from "react-router-dom";

function ScoreBoard({ setBoatOrient, boatOrient }) {
  const {
    userHit,
    oppHit,
    totalGuesses,
    setUserBoatsReady,
    gameActive,
    currentShip,
    oppShips
  } = useContext(GameContext);
  const [isActive2, setActive2] = useState(false);
  const [isActive3, setActive3] = useState(false);
  const [isActive4, setActive4] = useState(false);
  const [isActive5, setActive5] = useState(false);
  let misses = totalGuesses - userHit;

  const { room } = useParams();
  const boatToggle = () => {
    setActive5(!isActive5);
    setActive4(!isActive4);
    setActive3(!isActive3);
    setActive2(!isActive2);
  };

  return (
    <>
      {!gameActive && (
        <div>
          <h5 className="title"> Place Boats</h5>
          <h6>
            (Click on the button to change orientation of ships)
            <button
              onClick={() => {
                if (boatOrient === "v") {
                  setBoatOrient("h");
                  boatToggle();
                } else {
                  setBoatOrient("v");
                  boatToggle();
                }
              }}
            >
              Swap Orientation
            </button>
          </h6>

          <div className="shell">
            <div className="flexship">
              <div
                className={`${isActive5 ? "boat5" : "boat5v"} ${
                  currentShip < 5 ? "bg-white" : ""
                }`}
              ></div>

              <div
                className={`${isActive4 ? "boat4" : "boat4v"} ${
                  currentShip < 4 ? "bg-white" : ""
                }`}
              ></div>

              <div
                className={`${isActive3 ? "boat3" : "boat3v"} ${
                  currentShip < 3 ? "bg-white" : ""
                }`}
              ></div>

              <div
                className={`${isActive2 ? "boat2" : "boat2v"} ${
                  currentShip < 2 ? "bg-white" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
      )}
      <div>
        <h6>{`You're Battling in Room: ${room}`}</h6>
      </div>
      {/* conditional render for active play */}

      <h5 className="title">Score Board</h5>

      <div className="shell2">
        <div className="ht-ms">
          <div>Hits: {userHit}</div>
          <div>Misses: {misses}</div>
          <div>Opponent Hits: {oppHit}</div>
        </div>

        <div className="shipbox">
          <div>
            <img className="size5" src={`${oppShips.shipFiveSunk ? "/assets/7battleG.png" : "/assets/7battle.png" }`} alt="ship 5" />
            <div className="ship">5</div>
          </div>
          <div>
            <img className="size4" src={`${oppShips.shipFourSunk ? "/assets/7battleG.png" : "/assets/7battle.png" }`} alt="ship 4" />
            <div className="ship">4</div>
          </div>
          <div>
            <img className="size3" src={`${oppShips.shipThreeSunk ? "/assets/7battleG.png" : "/assets/7battle.png" }`} alt="ship 3" />
            <div className="ship">3</div>
          </div>
          <div>
            <img className="size2" src={`${oppShips.shipTwoSunk ? "/assets/7battleG.png" : "/assets/7battle.png" }`} alt="ship 2" />
            <div className="ship">2</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScoreBoard;
