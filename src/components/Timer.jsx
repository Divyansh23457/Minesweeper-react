import React, { useState, useEffect } from "react";
let timeIntervalId;
export default function Timer({ gameOver, flagCount ,size }) {
  let [timer, setTimer] = useState(0);

  useEffect(() => {
    let intervalId;

    if (!gameOver) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
      setTimer(0);
    };
  }, [gameOver,size]);


  return (
    <div style={{ color: "white", fontSize: 20, background: "maroon",display:"flex",justifyContent:"space-around",marginTop:"10px",padding:"5px" }}>
      <div>
      <span role="img" aria-label="clock" >
        ⏱️
      </span>
      {timer}</div>  
     <div>
     <span role="img" aria-label="clock" >
        🚩
      </span>
      {flagCount}
     </div>
    </div>
  );
}