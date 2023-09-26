import PokemonDict from "./pokemonDict";
import Flashcard from './components/Flashcard.jsx'; 
import './App.css';

function App() {



  return (
    <div className="App">
      <h1>Guess That Pokemon</h1>
      <p className="description">Can You Guess and "Catch" Them All?</p>
      <p className="cardCount">Number of Cards: {PokemonDict.length}</p>
      <Flashcard cardSet={PokemonDict} />
    
    </div>
  )
}

export default App
