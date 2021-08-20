import React from "react";
import { Container } from "react-bootstrap";

export default function About() {
  return (
    <div
      className="bgAbout"
      style={{
        backgroundImage: "url(./assets/7battleA.png)",
        height: "140vh",
        zIndex: "-1",
        textShadow: "1px 1px 0px #darkblue",
      }}
    >
<div className="aboutHead"></div>

      <Container>
<div className="aboutBody">        
           <h4>Welcome to Lucky 7 Water Wars, created by the 7th cohort of Midland Code Academy. </h4><div className="space2"></div>
<p>Sign up with a username and password between 5 and 20 characters on the sign up page if you don't already have an account. When the “Sign Up” button is selected you will be automatically logged in to the game. </p>
<p> If you have already created a username & password, Login.</p>
<p> Select Host Room to retrieve a play code, or enter the eight-digit code from the host and join room to play. The play code will need to be shared outside of this app. </p>
<p> To begin, click the User Board (blue grid) to place a boat. The largest boat will be placed first and then the next largest; and so on until all four boats are placed. To rotate the boat from vertical to horizontal click on “Rotate Boat”. </p>
<p> Once the host and opponent are ready, the host starts first. The host will click on the Opponent Board to make a guess of where a boat is placed. After a guess is made, a white peg is displayed for a miss and a red peg for a hit. </p>
<p>The play moves back and forth between players. When a player reaches a total of 14 hits, they win the game!</p>
<p>Keep watch on the Scoreboard for your stats. While you’re waiting, chat with your opponent. Are you ready to play? Enter the game if you feel lucky.</p>



<div style={{marginTop: "1em"}}></div>
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
