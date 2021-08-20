import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { GameContext } from "../../../shared/context/GameContext";
import { UserContext, userContext } from "../../../shared/context/UserContext";
import { useParams } from "react-router-dom";
function ScoreBoard({ setBoatOrient, boatOrient, sunkShip }) {
  const {
    userHit,
    oppHit,
    totalGuesses,
    gameActive,
    currentShip,
    oppShips,
    opponentData,
  } = useContext(GameContext);
  const { username } = useContext(UserContext);
  const [isActive2, setActive2] = useState(false);
  const [isActive3, setActive3] = useState(false);
  const [isActive4, setActive4] = useState(false);
  const [isActive5, setActive5] = useState(false);
  const [shipTwoStatus, setShipTwoStatus] = useState(false);
  const [shipThreeStatus, setShipThreeStatus] = useState(false);
  const [shipFourStatus, setShipFourStatus] = useState(false);
  const [shipFiveStatus, setShipFiveStatus] = useState(false);

  let misses = totalGuesses - userHit;
  const { room } = useParams();
  const boatToggle = () => {
    setActive5(!isActive5);
    setActive4(!isActive4);
    setActive3(!isActive3);
    setActive2(!isActive2);
  };

  useEffect(() => {
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    let count5 = 0;

    opponentData.map((cell) => {
      if (!shipTwoStatus && cell.ship === 2 && cell.hit) {
        count2++;
      }
      if (!shipThreeStatus && cell.ship === 3 && cell.hit) {
        count3++;
      }
      if (!shipFourStatus && cell.ship === 4 && cell.hit) {
        count4++;
      }
      if (!shipFiveStatus && cell.ship === 5 && cell.hit) {
        count5++;
      }
    });

    !shipTwoStatus && count2 === 2
      ? setShipTwoStatus(true)
      : setShipTwoStatus(false);
    !shipThreeStatus && count3 === 3
      ? setShipThreeStatus(true)
      : setShipThreeStatus(false);
    !shipFourStatus && count4 === 4
      ? setShipFourStatus(true)
      : setShipFourStatus(false);
    !shipFiveStatus && count5 === 5
      ? setShipFiveStatus(true)
      : setShipFiveStatus(false);
  }, [opponentData, oppShips]);

  useEffect(() => {
    if (shipTwoStatus) {
      sunkShip(2);
    }
  }, [shipTwoStatus]);

  useEffect(() => {
    if (shipThreeStatus) {
      sunkShip(3);
    }
  }, [shipThreeStatus]);

  useEffect(() => {
    if (shipFourStatus) {
      sunkShip(4);
    }
  }, [shipFourStatus]);

  useEffect(() => {
    if (shipFiveStatus) {
      sunkShip(5);
    }
  }, [shipFiveStatus]);

  return (
    <>
      <div>
        <h6>{`You're Battling in Room: ${room}`}</h6>
      </div>
      {/* conditional render for active play */}

      <div className="shell2">
        <div className="ht-ms">
          <div className="title">Score Board</div>
          <div>Hits: {userHit}</div>
          <div>Misses: {misses}</div>
          <div>Opponent Hits: {oppHit}</div>
        </div>
        {!gameActive && (
          <>
            <Button
              className="rbtn"
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
            </Button>
            <div className="shell">
              <div className="flexship">
                {currentShip === 5 && (
                  <div
                    className={`${isActive5 ? "boat5" : "boat5v"} ${
                      currentShip < 5 ? "bg-white" : ""
                    }`}
                  ></div>
                )}
                {currentShip === 4 && (
                  <div
                    className={`${isActive4 ? "boat4" : "boat4v"} ${
                      currentShip < 4 ? "bg-white" : ""
                    }`}
                  ></div>
                )}
                {currentShip === 3 && (
                  <div
                    className={`${isActive3 ? "boat3" : "boat3v"} ${
                      currentShip < 3 ? "bg-white" : ""
                    }`}
                  ></div>
                )}
                {currentShip === 2 && (
                  <div
                    className={`${isActive2 ? "boat2" : "boat2v"} ${
                      currentShip < 2 ? "bg-white" : ""
                    }`}
                  ></div>
                )}
              </div>
            </div>
          </>
        )}
        <div className="shipbox">
          <div>
            <img
              className="size5"
              src={`${
                shipFiveStatus ? "/assets/7battleG.png" : "/assets/7battle.png"
              }`}
              alt="ship 5"
            />
            <div className="ship">5</div>
          </div>
          <div>
            <img
              className="size4"
              src={`${
                shipFourStatus ? "/assets/7battleG.png" : "/assets/7battle.png"
              }`}
              alt="ship 4"
            />
            <div className="ship">4</div>
          </div>
          <div>
            <img
              className="size3"
              src={`${
                shipThreeStatus ? "/assets/7battleG.png" : "/assets/7battle.png"
              }`}
              alt="ship 3"
            />
            <div className="ship">3</div>
          </div>
          <div>
            <img
              className="size2"
              src={`${
                shipTwoStatus ? "/assets/7battleG.png" : "/assets/7battle.png"
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
