import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { GameContext } from "../../../shared/context/GameContext";
import { useParams } from "react-router-dom";

function ScoreBoard({
  setBoatToPlace,
  setBoatOrient,
  sendBoatsReady,
  boatOrient,
}) {
  const {
    userHit,
    oppHit,
    totalGuesses,
    setUserBoatsReady,
    gameActive,
    userData,
    currentShip,
    oppShips,
  } = useContext(GameContext);
  const [isActive2, setActive2] = useState(false);
  const [isActive3, setActive3] = useState(false);
  const [isActive4, setActive4] = useState(false);
  const [isActive5, setActive5] = useState(false);
  let misses = totalGuesses - userHit;

  const { room } = useParams();
  const boat2Toggle = () => {
    setActive2(!isActive2);
  };
  const boat3Toggle = () => {
    setActive3(!isActive3);
  };
  const boat4Toggle = () => {
    setActive4(!isActive4);
  };
  const boat5Toggle = () => {
    setActive5(!isActive5);
  };

  let userBoatsReady = true;

  return (
    <>
      {!gameActive && (
        <div>
          <h5 className="title"> Place Boats</h5>

          <div className="shell">
            <div className="flexship">
              <div className={isActive2 ? "boat2" : "boat2v"}>
                <button
                  onClick={() => {
                    setBoatToPlace(2);
                    if (isActive2) {
                      setBoatOrient("v");
                    } else {
                      setBoatOrient("h");
                    }
                    boat2Toggle();
                  }}
                ></button>
              </div>

              <div className={isActive3 ? "boat3" : "boat3v"}>
                <button
                  onClick={() => {
                    setBoatToPlace(3);
                    if (isActive3) {
                      setBoatOrient("v");
                    } else {
                      setBoatOrient("h");
                    }
                    boat3Toggle();
                  }}
                ></button>
              </div>

              <div className={isActive4 ? "boat4" : "boat4v"}>
                <button
                  onClick={() => {
                    setBoatToPlace(4);
                    if (isActive4) {
                      setBoatOrient("v");
                    } else {
                      setBoatOrient("h");
                    }
                    boat4Toggle();
                  }}
                ></button>
              </div>

              <div className={isActive5 ? "boat5" : "boat5v"}>
                <button
                  onClick={() => {
                    setBoatToPlace(5);
                    if (isActive5) {
                      setBoatOrient("v");
                    } else {
                      setBoatOrient("h");
                    }
                    boat5Toggle();
                  }}
                ></button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="rbtn"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Button
          // className="readybtn"
          onClick={() => {
            setUserBoatsReady(true);
            sendBoatsReady(userData);
          }}
        >
          Ready
        </Button>
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
            <img
              className="size5"
              src={`${
                oppShips.shipFiveSunk
                  ? "/assets/7battleG.png"
                  : "/assets/7battle.png"
              }`}
              alt="ship 5"
            />
            <div className="ship">5</div>
          </div>
          <div>
            <img
              className="size4"
              src={`${
                oppShips.shipFourSunk
                  ? "/assets/7battleG.png"
                  : "/assets/7battle.png"
              }`}
              alt="ship 4"
            />
            <div className="ship">4</div>
          </div>
          <div>
            <img
              className="size3"
              src={`${
                oppShips.shipThreeSunk
                  ? "/assets/7battleG.png"
                  : "/assets/7battle.png"
              }`}
              alt="ship 3"
            />
            <div className="ship">3</div>
          </div>
          <div>
            <img
              className="size2"
              src={`${
                oppShips.shipTwoSunk
                  ? "/assets/7battleG.png"
                  : "/assets/7battle.png"
              }`}
              alt="ship 2"
            />
            <div className="ship">2</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScoreBoard;
