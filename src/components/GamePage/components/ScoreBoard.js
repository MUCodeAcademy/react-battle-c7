import React, { useState } from "react";
import {
  userHits,
  oppHits,
  totalGuesses,
  Ready,
} from "../../../shared/context/GameContext";
import { useParams } from "react-router-dom";

function ScoreBoard({ setBoatToPlace, setBoatOrient }) {
  const [isActive2, setActive2] = useState("false");
  const [isActive3, setActive3] = useState("false");
  const [isActive4, setActive4] = useState("false");
  const [isActive5, setActive5] = useState("false");
  let misses = totalGuesses - userHits;

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

  let boatsReady = true;

  return (
    <>
      {boatsToggle && (
        <div>
          <h5 className="title"> Place Boats</h5>

          <div className="shell">
            <div className="flexship">
              <div className={isActive2 ? "boat2" : "boat2v"}>
                <button
                  onClick={() => {
                    setBoatToPlace(2);
                    if (isActive2) {
                      setBoatOrient("h");
                    } else {
                      setBoatOrient("v");
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
                      setBoatOrient("h");
                    } else {
                      setBoatOrient("v");
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
                      setBoatOrient("h");
                    } else {
                      setBoatOrient("v");
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
                      setBoatOrient("h");
                    } else {
                      setBoatOrient("v");
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
        <button
          className="readybtn"
          onClick={() => {
            Ready();
          }}
        ></button>
        <h6>{`You're Battling in Room: ${room}`}</h6>
      </div>
      {/* conditional render for active play */}

      <h5 className="title">Score Board</h5>

      <div className="shell2">
        <div className="ht-ms">
          <div>Hits: {userHits}</div>
          <div>Misses: {misses}</div>
          <div>Opponent Hits: {oppHits}</div>
        </div>

        <div className="shipbox">
          <div>
            <img className="size2" src="/assets/7battle.png" alt="ship 2" />
            <div className="ship-2">2</div>
          </div>
          <div>
            <img className="size3" src="/assets/7battle.png" alt="ship 3" />
            <div className="ship-3">3</div>
          </div>
          <div>
            <img className="size4" src="/assets/7battle.png" alt="ship 4" />
            <div className="ship-4">4</div>
          </div>
          <div>
            <img className="size5" src="/assets/7battle.png" alt="ship 5" />
            <div className="ship-4">5</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScoreBoard;
