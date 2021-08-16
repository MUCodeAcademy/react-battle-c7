import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ScoreBoard() {
  const [boatsToggle, setBoatsToggle] = useState(false);
  const [isActive2, setActive2] = useState("false");
  const [isActive3, setActive3] = useState("false");
  const [isActive4, setActive4] = useState("false");
  const [isActive5, setActive5] = useState("false");
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
                <button onClick={boat2Toggle}></button>
              </div>

              <div className={isActive3 ? "boat3" : "boat3v"}>
                <button onClick={boat3Toggle}></button>
              </div>

              <div className={isActive4 ? "boat4" : "boat4v"}>
                <button onClick={boat4Toggle}></button>
              </div>

              <div className={isActive5 ? "boat5" : "boat5v"}>
                <button onClick={boat5Toggle}></button>
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
            setBoatsToggle(!boatsToggle);
          }}
        ></button>
        <h6>{`You're Battling in Room: ${room}`}</h6>
      </div>
      {/* conditional render for active play */}

      <h5 className="title">Score Board</h5>

      <div className="shell2">
        <div className="ht-ms">
          <div>Hits:</div>
          <div>Miss:</div>
        </div>

        <div className="shipbox">
          <div>
            
            <div className="ship-2">2</div>
          </div>
          <div>
            <div className="ship-3">3</div>
          </div>
          <div>
            <div className="ship-4">4</div>
          </div>
          <div>
            <div className="ship-4">5</div>
           {boatsToggle && 
      
        

        <div className="shell">
          <div className="flexship">
            <div className={isActive2 ? "boat2" : "boat2v"}>
              <button onClick={boat2Toggle}></button>
            </div>

            <div className={isActive3 ? "boat3" : "boat3v"}>
              <button onClick={boat3Toggle}></button>
            </div>

            <div className={isActive4 ? "boat4" : "boat4v"}>
              <button onClick={boat4Toggle}></button>
            </div>

            <div className={isActive5 ? "boat5" : "boat5v"}>
              <button onClick={boat5Toggle}></button>
            </div>
          </div> </div>
       
      



       
} </div> </div> </div>
    </>
  );
}

export default ScoreBoard;
