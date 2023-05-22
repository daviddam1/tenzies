import React from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid"
import Confetti from "react-confetti";

export default function App(){

  const [Dice,setDice]=React.useState(allNewDice())
  
  const [tenzies,setTenzies] = React.useState(false)
  
  React.useEffect(()=>{
    const allHeld = Dice.every(die => die.isHeld)
    const firstValue = Dice[0].value
    const allSameValue= Dice.every(die =>die.value===firstValue)
    if(allHeld&&allSameValue)
    {
      setTenzies(true)
      console.log("You won!")
    }
    
  },[Dice])

  function allNewDice(){
    const dice = []
    for(let i=0;i<10;i++){
      dice.push(generateNewDie())
    }
    return dice
  }

  const diceElements = 
    Dice.map((die) => 
    <Die
     key= {die.id}
     value= {die.value}
     isHeld={die.isHeld}
     holdDice={() => holdDice(die.id)}
    />
  )

  function generateNewDie(){
    return{
      value: Math.floor(Math.random()*6)+1,
      isHeld: false,
      id: nanoid(),
    }
  }

  function RollDice(){
    if(!tenzies){
    setDice(oldDice => oldDice.map(die=>{
      return die.isHeld?
      die:
      generateNewDie()
    }))
    }else{
      setTenzies(false)
      setDice(allNewDice())
    } 
  }
  
  
  function holdDice(id){
    setDice(oldDice =>oldDice.map(die => {
      return die.id===id ? 
      {...die, isHeld:!die.isHeld}:
      die
    }))
  }
  return(
    <main>
      <div className="app">
        {tenzies && <Confetti/>}
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
        {diceElements}
        </div>
        <button onClick={RollDice}>{tenzies?"New game":"Roll"}</button>        
      </div>
    </main>
  )
}