import React, { useState, useContext, useEffect } from "react";
import { GameContext } from "../../../shared/context/GameContext";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

function BoatCell({ numCells }) {
  const [cells, setCells] = useState([]);
  useEffect(
    () =>
      setCells(() => {
        let num = new Array(numCells);
        num.fill(1);
        return num;
      }),
    [numCells]
  );
  return (
    <>
      {cells.map((v, idx) => (
        <div key={idx} className="ship-cell"></div>
      ))}
    </>
  );
}

function ScoreBoard({ setBoatOrient, boatOrient, sunkShip }) {
  const {
    userHit,
    oppHit,
    totalGuesses,
    gameActive,
    currentShip,
    oppShips,
    setOppShips,
    opponentData,
  } = useContext(GameContext);

  const [isActive, setActive] = useState(false);

  const [shipTwoStatus, setShipTwoStatus] = useState(oppShips.shipTwoSunk);
  const [shipThreeStatus, setShipThreeStatus] = useState(
    oppShips.shipThreeSunk
  );
  const [shipFourStatus, setShipFourStatus] = useState(oppShips.shipFourSunk);
  const [shipFiveStatus, setShipFiveStatus] = useState(oppShips.shipFiveSunk);

  let misses = totalGuesses - userHit;
  const { room } = useParams();

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

    if (!shipTwoStatus && count2 === 2) {
      setShipTwoStatus(true);
      oppShips.shipTwoSunk = true;
      setOppShips({ ...oppShips });
    }
    if (!shipThreeStatus && count3 === 3) {
      setShipThreeStatus(true);
      oppShips.shipThreeSunk = true;
      setOppShips({ ...oppShips });
    }
    if (!shipFourStatus && count4 === 4) {
      setShipFourStatus(true);
      oppShips.shipFourSunk = true;
      setOppShips({ ...oppShips });
    }
    if (!shipFiveStatus && count5 === 5) {
      setShipFiveStatus(true);
      oppShips.shipFiveSunk = true;
      setOppShips({ ...oppShips });
    }
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
      <div class="heading">
        <h6>{`You're Battling in Room: ${room}`}</h6>
      </div>
      {/* conditional render for active play */}

      <div className="d-flex align-items-center justify-content-evenly mb-2">
        <div className="ht-ms">
          <div className="title">Scoreboard</div>
          <div>Hits: {userHit}</div>
          <div>Misses: {misses}</div>
          <div>Opponent Hits: {oppHit}</div>
        </div>
        {currentShip >= 2 && (
          <>
            <div className="shell">
              <div className="flexship align-items-center justify-content-center">
                <div
                  className={`boat-place boat${currentShip}${
                    isActive ? "" : "v"
                  }`}
                >
                  <BoatCell numCells={currentShip} />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <Button
                className="rbtn"
                onClick={() => {
                  if (boatOrient === "v") {
                    setBoatOrient("h");
                  } else {
                    setBoatOrient("v");
                  }
                  setActive((curr) => !curr);
                }}
              >
                Rotate Boat
              </Button>
            </div>
          </>
        )}
        {gameActive && (
          <div className="shipbox">
            <div>
              <img
                className="size5"
                src={`${
                  shipFiveStatus
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
                  shipFourStatus
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
                  shipThreeStatus
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
                  shipTwoStatus ? "/assets/7battleG.png" : "/assets/7battle.png"
                }`}
                alt="ship 2"
              />
              <div className="ship">2</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default ScoreBoard;
