import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import { UserContext } from "./UserContext";

export const GameContext = createContext(null);

export function GameProvider(props) {
  const [userBoatsReady, setUserBoatsReady] = useState(false);
  const [oppBoatsReady, setOppBoatsReady] = useState(false);
  const [userData, setUserData] = useState([]);
  const [opponentData, setOpponentData] = useState([]);
  const [isTurn, setIsTurn] = useState(false);
  const [oppHit, setOppHit] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const { isHostCon } = useContext(UserContext);
  const [currentShip, setCurrentShip] = useState(5);
  const [shipTwo, setShipTwo] = useState({ coord: [], sunk: false });
  const [shipThree, setShipThree] = useState({ coord: [], sunk: false });
  const [shipFour, setShipFour] = useState({ coord: [], sunk: false });
  const [shipFive, setShipFive] = useState({ coord: [], sunk: false });
  const [oppShips, setOppShips] = useState({
    shipTwoSunk: false,
    shipThreeSunk: false,
    shipFourSunk: false,
    shipFiveSunk: false,
  });
  const userHit = useMemo(() => {
    let hitCount = 0;
    opponentData.forEach(
      (v) => (hitCount = v.ship && v.hit ? hitCount + 1 : hitCount)
    );
    return hitCount;
  });

  useEffect(() => {
    resetBoards();
  }, []);

  useEffect(() => {
    setIsTurn(isHostCon);
  }, [isHostCon]);

  useEffect(() => {
    if (userBoatsReady && oppBoatsReady) {
    }
  }, [userBoatsReady, oppBoatsReady]);

  useEffect(() => {
    setOppShips({ ...oppShips });
  }, [isTurn]);

  function trackBoat(coord, int) {
    switch (int) {
      case 2:
        shipTwo.coord.push(coord);
        break;
      case 3:
        shipThree.coord.push(coord);
        break;
      case 4:
        shipFour.coord.push(coord);
        break;
      case 5:
        shipFive.coord.push(coord);
        break;
      default:
        break;
    }
  }

  const placeBoat = useCallback(
    (coordinate, int, orientation) => {
      let boatCheck = false;
      let newArr = [...userData];
      if (orientation === "h" && 10 - (coordinate % 10) >= int) {
        for (let i = 0; i < int; i++) {
          if (userData[coordinate + i].ship) {
            boatCheck = true;
          }
        }
        if (boatCheck === false) {
          for (let i = 0; i < int; i++) {
            newArr[coordinate + i] = { ...newArr[coordinate + i], ship: int };
            trackBoat(coordinate + i, int);
          }
          setCurrentShip((curr) => curr - 1);
        }
      } else if (orientation === "v" && coordinate + (int - 1) * 10 < 100) {
        for (let i = 0; i < int; i++) {
          if (newArr[coordinate + i * 10].ship) {
            boatCheck = true;
          }
        }
        if (!boatCheck) {
          for (let i = 0; i < int; i++) {
            newArr[coordinate + i * 10].ship = int;
            trackBoat(coordinate + i * 10, int);
          }
          setCurrentShip((curr) => curr - 1);
        }
      }
      setUserData(newArr);
    },
    [userData]
  );

  const boatsReady = useCallback(() => {
    setUserBoatsReady(true);
  }, [userBoatsReady]);

  const checkHit = useCallback(
    (coordinate, user) => {
      let wasValid = false;
      if (user) {
        if (!userData[coordinate].hit) {
          if (userData[coordinate].ship) {
            setOppHit((curr) => curr + 1);
          }
          wasValid = true;
        }
      } else {
        if (!opponentData[coordinate].hit) {
          setTotalGuesses((curr) => curr + 1);
          wasValid = true;
        }
      }
      return wasValid;
    },
    [
      userData,
      opponentData,
      totalGuesses,
      oppHit,
      userHit,
      setOpponentData,
      setUserData,
    ]
  );

  const winner = useMemo(() => {
    if (oppHit === 14) {
      return "Opponent";
    } else if (userHit === 14) {
      return "User";
    } else {
      return null;
    }
  }, [userHit, oppHit]);

  const gameActive = useMemo(() => {
    if (userBoatsReady && oppBoatsReady) {
      if (winner) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }, [userBoatsReady, oppBoatsReady, winner]);

  const resetBoards = useCallback(() => {
    setUserData((curr) => {
      let next = new Array(100);
      for (let i = 0; i < 100; i++) {
        next[i] = { user: true, hit: false, ship: 0 };
      }
      return next;
    });
    setOpponentData((curr) => {
      let next = new Array(100);
      for (let i = 0; i < 100; i++) {
        next[i] = { user: false, hit: false, ship: 0 };
      }
      return next;
    });
  }, [userData, opponentData]);

  const newGame = useCallback(() => {
    resetBoards();
    setUserBoatsReady(false);
    setOppBoatsReady(false);
    setCurrentShip(5);
    setOppHit(0);
    setTotalGuesses(0);
    setIsTurn(isHostCon);
  }, [
    resetBoards,
    userBoatsReady,
    oppHit,
    userHit,
    totalGuesses,
    winner,
    isHostCon,
  ]);

  return (
    <GameContext.Provider
      value={{
        userData,
        opponentData,
        setOpponentData,
        placeBoat,
        boatsReady,
        newGame,
        winner,
        isTurn,
        setIsTurn,
        totalGuesses,
        resetBoards,
        checkHit,
        gameActive,
        oppHit,
        userHit,
        userBoatsReady,
        setUserBoatsReady,
        oppBoatsReady,
        setOppBoatsReady,
        setUserData,
        shipTwo,
        shipThree,
        shipFour,
        shipFive,
        setShipTwo,
        setShipThree,
        setShipFour,
        setShipFive,
        currentShip,
        oppShips,
        setOppShips,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
