import React from 'react';
import './App.css';
import Die from './component/Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {
  const [dice , setDice] = React.useState(getDice())
  const [tenzies,setTenzies] = React.useState(false)
  const [userWin, setUserWin] = React.useState(false)
  const [numRoll, setNumRoll] = React.useState(0)
  const [bestRoll, setBestRoll] = React.useState(0)

  React.useEffect(function(){
    const allDiceHold = dice.every(die=> die.isHeld)
    const firstValue = dice[0].value
    const checkIfWins = dice.every(die => die.value === firstValue)
    if(allDiceHold && checkIfWins)
    {
      setUserWin(true)
      setTenzies(true)
    }else if(allDiceHold && !checkIfWins)
    {
      setTenzies(true)
    }

  },[rollDice])

  function getDice(){
    const diceArray = []
    for(let i = 0 ; i < 10 ; i++)
    {
      diceArray.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
       })
    }
    
    return diceArray
  }

  function rollDice(){

    if(!tenzies)
    {
      setDice(prevDice => prevDice.map(die => { 
        return die.isHeld ? die : {
          value: Math.floor(Math.random() * 6) + 1,
          isHeld: false,
          id: nanoid()}
         })
      )
      setNumRoll(role => role + 1)
    }else{
      setUserWin(false)
      setDice(getDice)
      setTenzies(false)
      setBestRoll(prevRole => {
       return prevRole === 0 ? prevRole = numRoll : prevRole > numRoll 
                            ? prevRole = numRoll : prevRole
      })
      setNumRoll(0)
    }
    
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))

  }

  const diceElements = dice.map(die=>{
    return <Die 
    key={die.id} 
    value={die.value} 
    isHeld={die.isHeld} 
    id={die.id}
    holdDice={holdDice}/>
  })

  
const message = userWin ? "Congratulations, User Wins" : "User failed, Try Again!!"

      return (
        <main>
            {userWin && <Confetti width={1400} />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">"Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls."</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <p className="instructions">{!tenzies ? "" : message }</p>
            <div className='role-container'>
                 <p className="instructions"> Number of Rolls: <strong>{numRoll}</strong></p>
                 <p className="instructions"> Number of Best Roll: <strong>{bestRoll}</strong></p>
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
              {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}

export default App;
