import React, { useEffect, useState } from 'react'
import createBoard from '../Utilities/createBoard'
import revealed from '../Utilities/reveal'
import Cell from './Cell'
import Timer from './Timer'
import Alert from "./Alert"


//sound imports
import clickAudio from '../Sounds/click_audio.wav'
import explosionAudio from '../Sounds/explosion_audio.wav'
import loseAudio from '../Sounds/lose_audio.wav'
import startAudio from '../Sounds/start_audio.wav'
import winAudio from '../Sounds/win_audio.wav'
import flag1 from '../Sounds/flag1.mp3'
import flag2 from '../Sounds/flag2.mp3'


const Board = ({size}) => {

    const [grid,setGrid] = useState([])
    const [nonMineCount,setNonMineCount] = useState(0);
    const [mineLocations,setMineLocations] = useState([])
    const [gameOver, setGameOver] = useState(false);
    const [message , setMessage] = useState('You Lose! Try Again')
    const [flagCount , setFlagCount] = useState(0);

    const playSound = (sound) =>{
        const audio = new Audio(sound);
        audio.play();
    }
    
    useEffect(()=>{
        freshBoard();
        
    },[size])

    function freshBoard(){
        const newBoard = createBoard(size.x,size.y,size.y)
        setMineLocations(newBoard.mineLocation)
        setNonMineCount((size.x*size.y) - size.y);
        setGrid(newBoard.board)
        setGameOver(gameOver)
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        playSound(startAudio)
      };

    const updateFlag = (e ,x ,y) =>{
        e.preventDefault();
        if(grid[x][y].revealed) return;
        let newGrid = JSON.parse(JSON.stringify(grid))
        if(flagCount === mineLocations.length && newGrid[x][y].flagged===false) return;
        if(newGrid[x][y].flagged){
            setFlagCount(flagCount-1);
            newGrid[x][y].flagged = false;
        }
        else {
            setFlagCount(flagCount + 1);
            newGrid[x][y].flagged = true;
        } 
        setGrid(newGrid); 
        if(newGrid[x][y].flagged) playSound(flag1)
        else playSound(flag2)
    }

    const revealCell = (x, y) => {
        if (grid[x][y].revealed || gameOver) {
            return;
        }
        playSound(clickAudio)
        let newGrid = JSON.parse(JSON.stringify(grid));
        if (newGrid[x][y].value === "X") {
            setMessage("You lose ! Try Again")
            playSound(explosionAudio)
          for (let i = 0; i < mineLocations.length; i++) {
            newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
          }
          setGrid(newGrid);
          setGameOver(true);
          playSound(loseAudio)
        } else {
          let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
          setGrid(newRevealedBoard.arr);
          setNonMineCount(newRevealedBoard.newNonMinesCount);
          if (newRevealedBoard.newNonMinesCount === 0) {
            setGameOver(true);
            setMessage("You Won!! Click to play again!")
            playSound(winAudio)
          }
        }
      };


    return (
        <>
        <Timer gameOver={gameOver} size={size} flagCount={size.y - flagCount} />
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}>
          {gameOver && <Alert message = {message} restartGame={restartGame} />}
          {grid.map((singleRow, index1) => {
          return (
            <div style={{ display: "flex" }} key={index1}>
              {singleRow.map((singleBlock, index2) => {
                return (
                  <Cell
                    revealCell={revealCell}
                    details={singleBlock}
                    updateFlag={updateFlag}
                    key={index2}
                  />
                );
              })}
            </div>
          );
        })}
          

        </div>
        </>
      )
    
}

export default Board



