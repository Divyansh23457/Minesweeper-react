import React, { useState } from 'react'
import Board from './components/Board'

const App = () => {

  const [size,setSize] = useState({
    x : 10,
    y : 10
  });

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if(value === '20'){
      setSize({
        x : 10,
        y : 20
      })
    }
    else setSize({
      x : Number(value),
      y : Number(value)
    })
  };

  return (
    <div>
      <h1 style={{display:"inline",marginRight : "18px"}}>Minesweeper</h1>
      <label htmlFor="size"><p style={{display:"inline"}}>Difficulty:</p></label>
      <select id="size" value={setSize.y} onChange={handleSelectChange} style={{margin:"5px"}}>
        <option value="10" defaultValue>Medium</option>
        <option value="8">Easy</option>
        <option value="20">Difficult</option>
      </select>
      <br />
      <Board size={size} />
    </div>
  )
}

export default App
