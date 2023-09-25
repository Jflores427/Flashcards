import { useState } from "react";
import "./Flashcard.css";

const Flashcard = (props) => {

    const [index, setIndex] = useState({current: 0, previous: 0});

    const handleToggle = () => {
        const question = document.getElementById("question");
        const answer = document.getElementById("answer");

        question.classList.toggle("hidden");
        answer.classList.toggle("hidden");
    }

    const handlePrevious = () => {
        setIndex({...index, current: index.previous});
    }

    const handleNext = () => {
        const randomCard = getRandomInt(props.cardSet.length - 1);
        setIndex({...index, previous: index.current, current: randomCard });
    }

    const getRandomInt = (max) => {
        let randomValue = Math.floor(Math.random() * max);
        return (randomValue !== max) ? randomValue : getRandomInt(max);
    }

    return (
        <>
        <div className="container" onClick ={handleToggle}>
            <div className="question" id="question">{props.cardSet[index.current].question}</div>
            <div className="answer hidden" id="answer">{props.cardSet[index.current].answer}</div>
        </div>

        <button className="previous" onClick={handlePrevious}> &#x2190; </button>
        <button className="next" onClick={handleNext}> &#x2192;</button>
        </>
    )
}

export default Flashcard;