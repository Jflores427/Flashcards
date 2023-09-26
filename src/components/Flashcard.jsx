import { useState } from "react";
import "./Flashcard.css";

const Flashcard = (props) => {

    const [index, setIndex] = useState({current: 0, previous: 0});

    const handleToggle = () => {
        const question = document.getElementById("question");
        const answer = document.getElementById("answer");

        question.classList.toggle("hidden");
        answer.classList.toggle("hidden");
        // image.classList.toggle("hidden");
    }

    const handlePrevious = () => {
        setIndex({...index, current: index.previous});
    }

    const handleNext = () => {
        const randomCard = getRandomInt(props.cardSet.length);
        setIndex({...index, previous: index.current, current: randomCard });
        
        const question = document.getElementById("question");
        const answer = document.getElementById("answer");

        question.classList.remove("hidden");
        answer.classList.add("hidden");
    }

    const getRandomInt = (max) => {
        let randomValue = Math.floor(Math.random() * max);
        return (randomValue !== max) ? randomValue : getRandomInt(max);
    }

    return (
        <>
        <div className={"container " + props.cardSet[index.current].difficulty} onClick ={handleToggle}>
            <img className="image" id="image" src={props.cardSet[index.current].image}></img>
            <img src={props.cardSet[index.current].footprint} className="footprint"></img>
            
            <div className="details">
                <div className="height">{props.cardSet[index.current].height}</div>
                <div className="weight">{props.cardSet[index.current].weight}</div>
            </div>
            <div className="question" id="question">???</div>
            <div className="answer hidden" id="answer">{props.cardSet[index.current].answer}</div>
            
           
         

            <div className="entry-description" id="entry-description">{props.cardSet[index.current].description}</div>
        </div>

        <img src='../src/assets/PokeBall_Left.gif' className="previous" onClick={handlePrevious}></img>
        <img src='../src/assets/GreatBall_Right.gif' className="next" onClick={handleNext}></img> 
        </>
    )
}

export default Flashcard;