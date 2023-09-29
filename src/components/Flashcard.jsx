import { useState } from "react";
import "./Flashcard.css";

const Flashcard = (props) => {
    const [index, setIndex] = useState({current: 0, previous: 0});

    const handleToggle = () => {
        const flipCard = document.getElementById("flip-card");
        
        flipCard.classList.toggle("flip");
    }

    const handlePrevious = () => {
        
        const flipCard = document.getElementById("flip-card");
        
        flipCard.classList.remove("flip");

        setTimeout(() => { setIndex({...index, current: index.previous})}, 100);
    }
    const handleNext = () => {
        const randomCard = getRandomInt(props.cardSet.length);
        const flipCard = document.getElementById("flip-card");
        
        flipCard.classList.remove("flip");

        setTimeout(() => {setIndex({...index, previous: index.current, current: randomCard })}, 100);
    }

    const getRandomInt = (max) => {
        let randomValue = Math.floor(Math.random() * max);
        return (randomValue !== max) ? randomValue : getRandomInt(max);
    }

    return (
        <div> 
            <div className='pokedex'>
                <div className="flip-card" id="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <div className={"container " + props.cardSet[index.current].difficulty} onClick ={handleToggle}>
                                <img className="image" src={props.cardSet[index.current].image}></img>
                                <img className="footprint" src={props.cardSet[index.current].footprint}></img>
                                <div className="details">
                                    <div className="height">{props.cardSet[index.current].height}</div>
                                    <div className="weight">{props.cardSet[index.current].weight}</div>
                                </div>
                                <div className="question" id="question">???</div>
                                <div className="entry-description" id="entry-description">{props.cardSet[index.current].description}</div>
                            </div>
                        </div>
                        <div className="flip-card-back">
                            <div className={"container " + props.cardSet[index.current].difficulty} onClick ={handleToggle}>
                                <img className="image" src={props.cardSet[index.current].image}></img>
                                <img className="footprint" src={props.cardSet[index.current].footprint}></img>
                                <div className="details">
                                    <div className="height">{props.cardSet[index.current].height}</div>
                                    <div className="weight">{props.cardSet[index.current].weight}</div>
                                </div>
                                <div className="answer" id="answer">{props.cardSet[index.current].answer}</div>
                                <div className="entry-description" id="entry-description">{props.cardSet[index.current].description}</div>
                            </div>      
                        </div>
                    </div>
                </div>
                <img src='../src/assets/PokeBall_Left.gif' className="previous" onClick={handlePrevious}></img>
                <img src='../src/assets/GreatBall_Right.gif' className="next" onClick={handleNext}></img> 
            </div>
        </div>
    );
}

export default Flashcard;