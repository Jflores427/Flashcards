import PokemonDict from "./pokemonDict";
import Flashcard from './components/Flashcard.jsx'; 
import { useState } from "react";
import './App.css';

function App() {
  const [streak, setStreak] = useState({current: 0, longest: 0});

  function streakUpdate(e) {

    console.log("hello");
    const input = document.getElementById('input');
    if (input.classList.contains('correct')) {
      setStreak({...streak, longest: (streak.current + 1 > streak.longest) ? streak.current : streak.longest, current: streak.current + 1})
      return;
    }
    
    if (input.classList.contains('wrong')) {
      setStreak({...streak, current: 0})
    } 
  }

  return (
    <div className="App">
      <h1>Guess That Pokemon</h1>
      <p className="description">Can You Guess and "Catch" Them All?</p>
      <p className="card-count">Number of Cards: {PokemonDict.length}</p>
      <p className="current-streak"> Current Streak: {streak.current} Longest Streak: {streak.longest} </p>
      <Flashcard cardSet={PokemonDict} streakUpdate={streakUpdate} />

    </div>
  )
}

export default App;
