import React from "react";
import { Container } from "react-bootstrap";
import Chat from "./GamePage/components/Chat";

export default function About() {
  return (
    <div
      className="bgAbout"
      style={{
        backgroundImage: "url(./assets/7battleA.png)",
        height: "100vh",
        zIndex: "-1",
        textShadow: "1px 1px 0px #darkblue",
      }}
    >
<div className="aboutHead"></div>

      <Container>
<div className="aboutBody">        
            Welcome to Lucky 7 Water Wars! Created by the 7th cohort of Midland
            Code Academy. <br/>Sign up and Login or if you’re already signed up, log
            in. Select start game to retrieve a play code or join game to enter
            a code from the host. Select the ship you want to place on your grid
            and do this for all four ships varying in length from 2 to 5.
            Confirm/Ready (button) to start game. Play moves back and forth
            between players, as they click on the opponent’s grid to select a
            hit or miss. White peg is a miss. Red peg is a hit. A total of 14
            hits wins the game. Keep watch on the Scoreboard for your stats. Do
            you feel lucky?


<div style={{marginTop: "2em"}}></div>
Signed, <br/>
The Lucky 7, a.k.a.<br/>

<a href="https://github.com/MUCodeAcademy/react-battle-c7">Cohort 7</a>

<div className="about7">
<a href="https://github.com/trevorrjacobson" target="_blank" rel="noreferrer noopener">Trevor Jacobson</a><br/>
<a href="https://github.com/DarcyJorgensen" target="_blank" rel="noreferrer noopener">Darcy Jorgensen</a>  <br/>
<a href="https://github.com/Zachary-Roland" target="_blank" rel="noreferrer noopener">Zachary Roland</a>  <br/>
<a href="https://github.com/miketruax" target="_blank" rel="noreferrer noopener">Mike Truax </a> (Instructor)<br/>
<a href="https://github.com/Sunflair0" target="_blank" rel="noreferrer noopener">Rhonda Warner</a>  <br/>
<a href="https://github.com/keithawess" target="_blank" rel="noreferrer noopener">Keith Wess </a><br/>
<a href="https://github.com/MichaelAZimmerman" target="_blank" rel="noreferrer noopener">Michael Arron Zimmerman</a><br/>
</div>



         </div>
      </Container>
    </div>
  );
}
