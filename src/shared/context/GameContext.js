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
  const [isTurn, setIsTurn] = useState(false);
  const [userHit, setUserHit] = useState(0);
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

  useEffect(() => {
    resetBoards();
  }, []);

  useEffect(() => {
    setIsTurn(isHostCon);
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
        if (count === 3) {
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
        if (count === 4) {
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
        if (count === 5) {
          setShipFive({ ...shipFive, sunk: true });
        }
      }
    }
  }, [isHostCon]);

  const placeBoat = useCallback(
    (coordinate, int, orientation) => {
      let boatCheck = false;
      let newArr = [...userData];
      if (orientation === "h" && 10 - (coordinate % 10) >= int) {
        for (let i = 0; i < int; i++) {
          if (userData[coordinate + i].ship === true) {
            boatCheck = true;
          }
        }
        if (boatCheck === false) {
          for (let i = 0; i < int; i++) {
            newArr[coordinate + i] = { ...newArr[coordinate + i], ship: true };
            opponentData[coordinate + i].ship = true;
            //   trackBoat(coordinate + i, int);
          }
          setCurrentShip((curr) => curr - 1);
        }
      } else if (orientation === "v" && coordinate + (int - 1) * 10 < 100) {
        for (let i = 0; i < int; i++) {
          if (newArr[coordinate + i * 10].ship === true) {
            boatCheck = true;
          }
        }
        if (!boatCheck) {
          for (let i = 0; i < int; i++) {
            newArr[coordinate + i * 10] = {
              ...newArr[coordinate + i * 10],
              ship: true,
            };
            opponentData[coordinate + i * 10].ship = true;
          }
        }
        setCurrentShip((curr) => curr - 1);
      }
      setUserData(() => newArr);
    },
    [userData]
  );

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
    },
    [userData, opponentData, totalGuesses, isTurn, oppHit, userHit]
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
    (coordinate, user, type, orientation) => {
      if (!gameActive && !userBoatsReady && user) {
        placeBoat(coordinate, currentShip, orientation);
        console.log(coordinate, orientation);
      }
      if (gameActive && !user && isTurn) {
        checkHit(coordinate, user);
      }
    },
    [gameActive, userBoatsReady, placeBoat, checkHit]
  );

  const endGame = useCallback(() => {
    setGameActive(false);
  }, [gameActive, checkWin, winner]);

  const checkWinner = useMemo(() => {
    if (userHit === 14) {
      setWinner("User");
      endGame();
      console.log("Win");
    } else if (oppHit === 14) {
      setWinner("Opponent");
      endGame();
      console.log("Winner");
    }
  }, [userHit, oppHit]);

  const resetBoards = useCallback(() => {
    setUserData((curr) => {
      let next = new Array(100);
      for (let i = 0; i < 100; i++) {
        next[i] = { user: true, hit: false, ship: false };
      }
      return next;
    });
    setOpponentData((curr) => {
      let next = new Array(100);
      for (let i = 0; i < 100; i++) {
        next[i] = { user: false, hit: false, ship: false };
      }
      return next;
    });
  }, [userData, opponentData]);

  const newGame = useCallback(() => {
    resetBoards();
    setGameActive(false);
    setUserBoatsReady(false);
    setCurrentShip(5);
    setOppHit(0);
    setUserHit(0);
    setTotalGuesses(0);
    setWinner("");
    if (isHostCon) {
      setIsTurn(true);
    } else {
      setIsTurn(false);
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
        placeBoat,
        select,
        boatsReady,
        startGame,
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
        shipTwo,
        shipThree,
        shipFour,
        shipFive,
        currentShip,
        oppShips,
        setOppShips,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
