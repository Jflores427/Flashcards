
import './App.css';
import Flashcard from './components/Flashcard.jsx'; 

function App() {

  const dict = [
    {question: "Hello There?", answer: "There" },
    {Question: "", Answer: "" },
    {Question: "", Answer: "" },
    {Question: "", Answer: "" },
    {Question: "", Answer: "" },
    {Question: "", Answer: "" },
    {Question: "", Answer: "" },
    {Question: "", Answer: "" },
    {Question: "", Answer: "" },
    {Question: "", Answer: "" }
  ];

  return (
    <div className="App">
      <h1>title</h1>
      <p className="description">dsdf</p>
      <p className="cardCount">Number of cards: {dict.length}</p>
      <Flashcard cardSet={dict} />
    
    </div>
  )
}

export default App
