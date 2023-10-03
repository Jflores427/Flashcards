import PokemonDict from "./pokemonDict";
import Flashcard from './components/Flashcard.jsx'; 
import { useState } from "react";
import './App.css';

function App() {
  const [index, setIndex] = useState({ current: 0, previous: 0});
  const [streak, setStreak] = useState({current: 0, longest: 0});
  const [mastered, setMastered] = useState([]);

  const cardSet = PokemonDict;

  const handleToggle = () => {
    const flipCard = document.getElementById("flip-card");
    const input = document.getElementById('guess');

    if (input.classList.contains('correct') || input.classList.contains('wrong')) {
        flipCard.classList.toggle("flip");
    }

}

const handlePrevious = () => {
    let prev = index.current;
    let curr = index.current - 1;
    
    if (curr < 0) {
        curr = cardSet.length - 1;
    } 

    const flipCard = document.getElementById("flip-card");
    const input = document.getElementById('guess');

    flipCard.classList.remove("flip");
    input.classList.remove('wrong');
    input.classList.remove('correct');

    setTimeout(() => { setIndex({...index, current: curr, previous: prev})}, 100);
}

const handleNext = () => {
    const flipCard = document.getElementById("flip-card");
    const input = document.getElementById('guess');

    flipCard.classList.remove("flip");
    input.classList.remove('wrong');
    input.classList.remove('correct');

    setTimeout(() => {setIndex({...index, previous: index.current, current: (index.current + 1) % cardSet.length })}, 100);
}

const getRandomInt = (max) => {
    let randomValue = Math.floor(Math.random() * max);
    return (randomValue !== max) ? randomValue : getRandomInt(max);
}

const handleMaster = () => {

  if (cardSet.length == 1) {

    if (mastered.length === 9) {
      const input = cardSet[index.current];
      mastered.push(input);
      setMastered(mastered);
    }

    cardSet.push({
      image: "../src/assets/CompletedPokedex.png", 
      answer: "Pokemon Master", 
      difficulty: "easy", 
      description: "Congrats! You are an Official Pokemon Master!!!!!!!!!!!",
      footprint: "../src/assets/Masterball.png",
      height: "WIN",
      weight: "NER",
    });
    
    cardSet.shift();

    handleNext();
    return;
  }

  const input = cardSet[index.current];
  mastered.push(input);
  setMastered(mastered);

  let temp = cardSet[cardSet.length - 1];
  cardSet[cardSet.length - 1]= cardSet[index.current];
  cardSet[index.current] = temp;

  cardSet.pop();
  handleNext();

};

const handleShuffle = () => {
    console.log("hello");
    const flipCard = document.getElementById('flip-card');
    const input = document.getElementById('guess');

    if (flipCard.classList.contains('flip')) {
         flipCard.classList.toggle('flip');
    }

    input.classList.remove('wrong');
    input.classList.remove('correct');

    for(let i = 0; i < 10; i++) {
        const random1 = getRandomInt(cardSet.length);
        const random2 = getRandomInt(cardSet.length);
        
        const temp = cardSet[random1];
        cardSet[random1] = cardSet[random2];
        cardSet[random2] = temp;
    }

    setTimeout(() => { setIndex({...index, current: 0, previous: cardSet.length - 1}) }, 0);
}

const onCheckAnswer = (e) => {
    e.preventDefault();
    
    const input = document.getElementById('guess');
    let errors = 0;

    const correctAnswer = cardSet[index.current].answer;
    const guessedAnswer = input.value.trim();

    if(Math.abs(guessedAnswer.length - correctAnswer.length) > 1) {
        input.classList.remove('correct');
        input.classList.add('wrong');
        streakClear();
        return;
    }

    for (let i = 0; i < Math.min(correctAnswer.length, guessedAnswer.length); i++) {
        if(errors > 1) {
            input.classList.remove('correct');
            input.classList.add('wrong');
            streakClear();
            return;
        }

        if (guessedAnswer.charAt(i).toUpperCase() !== correctAnswer.charAt(i).toUpperCase()) {
            errors++;
            continue;
        }
    }
        
    input.classList.remove('wrong');
    input.classList.add("correct");
    streakIncrement();
}

  const streakIncrement = () => { 
    setStreak({...streak, longest: (streak.current + 1 > streak.longest) ? streak.current + 1 : streak.longest, current: streak.current + 1});
  }

  const streakClear = () => {
    setStreak({...streak, current: 0});
  }

  return (
    <div className="App">
      <h1>Guess That Pokemon</h1>
      <p className="description">Can You Guess and "Catch" Them All?</p>
      <p className="card-count">Uncaught Pokemon: {PokemonDict.length}, Caught Pokemon: {mastered.length}</p>
      <p className="current-streak"> Current Streak: {streak.current}, Longest Streak: {streak.longest} </p>
      <Flashcard 
      cardSet={cardSet} 
      streakIncrement={streakIncrement} 
      streakClear={streakClear} 
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      handleMaster={handleMaster}
      handleShuffle={handleShuffle}
      handleToggle={handleToggle}
      onCheckAnswer={onCheckAnswer}
      getRandomInt={getRandomInt}
      index={index}
      />
    </div>
  )
}

export default App;
