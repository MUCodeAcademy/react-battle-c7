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
  const [gameActive, setGameActive] = useState(false);
  const [userBoatsReady, setUserBoatsReady] = useState(false);
  const [oppBoatsReady, setOppBoatsReady] = useState(false);
  const [userData, setUserData] = useState([]);
  const [opponentData, setOpponentData] = useState([]);
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState(false);
  const [userHit, setUserHit] = useState(0);
  const [oppHit, setOppHit] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const { isHostCon } = useContext(UserContext);
  const [currentShip, setCurrentShip] = useState(5);
  const [shipTwo, setShipTwo] = useState({ coord: [], sunk: false });
  const [shipThree, setShipThree] = useState({ coord: [], sunk: false });
  const [shipFour, setShipFour] = useState({ coord: [], sunk: false });
  const [shipFive, setShipFive] = useState({ coord: [], sunk: false });

  useEffect(() => {
    resetBoards();
  }, []);

  useEffect(() => {
    if (isHostCon) {
      setTurn(true);
    } else {
      setTurn(false);
    }
  }, [isHostCon]);

  useEffect(() => {
    if (currentShip < 2) {
      setUserBoatsReady(true);
    }
  }, [currentShip]);

  useEffect(() => {
    if (userData.length > 0 && gameActive) {
      if (shipTwo.sunk === false) {
        let count = 0;
        for (let i = 0; i < 2; i++) {
          if (userData[shipTwo.coord[i]].hit) {
            count++;
          }
        }
        if (count === 2) {
          setShipTwo({ ...shipTwo, sunk: true });
        }
      }
      if (shipThree.sunk === false) {
        let count = 0;
        for (let i = 0; i < 2; i++) {
          if (userData[shipThree.coord[i]].hit) {
            count++;
          }
        }
        if (count === 2) {
          setShipThree({ ...shipThree, sunk: true });
        }
      }
      if (shipFour.sunk === false) {
        let count = 0;
        for (let i = 0; i < 2; i++) {
          if (userData[shipFour.coord[i]].hit) {
            count++;
          }
        }
        if (count === 2) {
          setShipFour({ ...shipFour, sunk: true });
        }
      }
      if (shipFive.sunk === false) {
        let count = 0;
        for (let i = 0; i < 2; i++) {
          if (userData[shipFive.coord[i]].hit) {
            count++;
          }
        }
        if (count === 2) {
          setShipFive({ ...shipFive, sunk: true });
        }
      }
    }
  }, [userData, opponentData, shipTwo, shipThree, shipFour, shipFive]);

  const placeBoat = useCallback((coordinate, int, orientation) => {
    let boatCheck = false;
    if (orientation === "h" && 10 - (coordinate % 10) >= int) {
      for (let i = 0; i < int; i++) {
        if (userData[coordinate + i].ship === true) {
          boatCheck = true;
        }
      }
      if (boatCheck === false) {
        for (let i = 0; i < int; i++) {
          userData[coordinate + i].ship = true;
          opponentData[coordinate + i].ship = true;
          //   trackBoat(coordinate + i, int);
        }
        setCurrentShip((curr) => curr - 1);
      }
    } else if (orientation === "v" && coordinate + (int - 1) * 10 < 100) {
      for (let i = 0; i < int; i++) {
        if (userData[coordinate + i * 10].ship === true) {
          boatCheck = true;
        }
      }
      if (boatCheck === false) {
        for (let i = 0; i < int; i++) {
          userData[coordinate + i * 10].ship = true;
          opponentData[coordinate + i * 10].ship = true;
          //   trackBoat(coordinate + i * 10, int);
        }
        setCurrentShip((curr) => curr - 1);
      }
    }
    setUserData((curr) => [...curr]);
  }, []);

  function trackBoat(coordinate, type) {
    switch (type) {
      case 2:
        shipTwo.coord.push(coordinate);
        setShipTwo(...shipTwo);
        break;
      case 3:
        shipThree.coord.push(coordinate);
        setShipThree(...shipThree);
        break;
      case 4:
        shipFour.coord.push(coordinate);
        setShipFour(...shipFour);
        break;
      case 5:
        shipFive.coord.push(coordinate);
        setShipFive(...shipFive);
        break;
      default:
        console.log("Switch broke.");
        break;
    }
  }

  const boatsReady = useCallback(() => {
    setUserBoatsReady(true);
    console.log(userBoatsReady);
  }, [userBoatsReady]);
  const startGame = useCallback(() => {
    setGameActive(true);
    console.log(gameActive);
  }, [gameActive]);

  const checkHit = useCallback(
    async (coordinate, user) => {
      if (!user) {
        console.log(coordinate);
        console.log(userData);
        userData[coordinate].hit = true;
        setUserData((curr) => [...curr]);
        if (userData[coordinate].ship === true)
          await setOppHit((curr) => curr + 1);
      } else {
        opponentData[coordinate].hit = true;
        setOpponentData((curr) => [...curr]);
        if (opponentData[coordinate].ship === true)
          await setUserHit((curr) => curr + 1);
        setTotalGuesses((curr) => curr + 1);
      }
      console.log(userHit, oppHit, totalGuesses);
      checkWin(user);
      setTurn(!turn);
    },
    [userData, opponentData, totalGuesses, turn, oppHit, userHit]
  );

  const checkWin = useCallback(
    (user) => {
      if (user && oppHit === 14) {
        setWinner("Opponent");
        endGame();
        console.log("Win");
      } else if (!user && userHit === 14) {
        setWinner("User");
        endGame();
        console.log("Win");
      }
    },
    [winner, oppHit, userHit, checkHit]
  );

  const select = useCallback(
    (coordinate, user, orientation) => {
      if (!gameActive && !userBoatsReady && user) {
        placeBoat(coordinate, currentShip, orientation);
      }
      if (gameActive && !user && turn) {
        checkHit(coordinate, user);
      }
    },
    [gameActive, userBoatsReady, placeBoat, checkHit]
  );

  const endGame = useCallback(() => {
    setGameActive(false);
  }, [gameActive, checkWin, winner]);

  const checkWinner = useMemo(() => {
    if (userHit === 1) {
      setWinner("User");
      endGame();
      console.log("Win");
    } else if (oppHit === 1) {
      setWinner("Opponent");
      endGame();
      console.log("Winner");
    }
  }, [userHit, oppHit]);

  const resetBoards = useCallback(() => {
    for (let i = 0; i < 100; i++) {
      userData[i] = { user: true, hit: false, ship: false };
      opponentData[i] = { user: false, hit: false, ship: false };
    }
    console.log(userData);
    setUserData((curr) => [...curr]);
    setOpponentData((curr) => [...curr]);
  }, [userData, opponentData]);

  const newGame = useCallback(() => {
    resetBoards();
    setUserBoatsReady(false);
    setOppHit(0);
    setUserHit(0);
    setTotalGuesses(0);
    setWinner("");
    if (isHostCon) {
      setTurn(true);
    } else {
      setTurn(false);
    }
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
        select,
        boatsReady,
        startGame,
        newGame,
        winner,
        turn,
        totalGuesses,
        resetBoards,
        userBoatsReady,
        setUserBoatsReady,
        checkHit,
        gameActive,
        oppHit,
        userHit,
        userBoatsReady,
        setUserBoatsReady,
        oppBoatsReady,
        setOppBoatsReady,
        shipTwo,
        shipThree,
        shipFour,
        shipFive,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
