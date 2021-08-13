import React from "react";
import { Container } from "react-bootstrap";
import Chat from "./GamePage/components/Chat";

export default function About() {
  return (
    <div className="bgAbout" style={{ backgroundImage: "url(./assets/7battle.png)" }}>
<Container>    
<p>
        <strong>
          Welcome to Lucky 7 Battleship! Created by the 7th cohort of Midland
          Code Academy. Sign up and Login or if you’re already signed up, log
          in. Select start game to retrieve a play code or join game to enter a
          code from the host. Select the ship you want to place on your grid and
          do this for all four ships varying in length from 2 to 5.
          Confirm/Ready (button) to start game. Play moves back and forth
          between players, as they click on the opponent’s grid to select a hit
          or miss. White peg is a miss. Red peg is a hit. A total of 14 hits
          wins the game. Keep watch on the Scoreboard for your stats. Do you
          feel lucky?
        </strong>
      </p></Container>  </div>
  );
}
    
