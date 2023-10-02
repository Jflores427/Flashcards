import { useState } from "react";
import "./Flashcard.css";

const Flashcard = (props) => {
    const [index, setIndex] = useState({ current: 0, previous: 0});

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
            curr = props.cardSet.length - 1;
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

        setTimeout(() => {setIndex({...index, previous: index.current, current: (index.current + 1) % props.cardSet.length })}, 100);
    }

    const getRandomInt = (max) => {
        let randomValue = Math.floor(Math.random() * max);
        return (randomValue !== max) ? randomValue : getRandomInt(max);
    }

    const handleMaster = () => {

    };

    const handleShuffle = () => {
        const flipCard = document.getElementById('flip-card');
        const input = document.getElementById('guess');

        if (flipCard.classList.contains('flip')) {
             flipCard.classList.toggle('flip');
        }

        input.classList.remove('wrong');
        input.classList.remove('correct');

        for(let i = 0; i < 10; i++) {
            const random1 = getRandomInt(props.cardSet.length);
            const random2 = getRandomInt(props.cardSet.length);
            
            const temp = props.cardSet[random1];
            props.cardSet[random1] = props.cardSet[random2];
            props.cardSet[random2] = temp;
        }

        setTimeout(() => { setIndex({...index, current: 0, previous: props.cardSet.length - 1}) }, 0);
    }

    const onCheckAnswer = (e) => {
        e.preventDefault();
        
        const input = document.getElementById('guess');
        let errors = 0;

        const correctAnswer = props.cardSet[index.current].answer;
        const guessedAnswer = input.value.trim();

        if(Math.abs(guessedAnswer.length - correctAnswer.length) > 1) {
            input.classList.remove('correct');
            input.classList.add('wrong');
            props.streakUpdate();
            return;
        }

        for (let i = 0; i < Math.min(correctAnswer.length, guessedAnswer.length); i++) {
            if(errors > 1) {
                input.classList.remove('correct');
                input.classList.add('wrong');
                props.streakUpdate();
                return;
            }

            if (guessedAnswer.charAt(i) !== correctAnswer.charAt(i)) {
                errors++;
                continue;
            }
        }
            
        input.classList.remove('wrong');
        input.classList.add("correct");
        props.streakUpdate();
    }

    return (
        <div> 
            <div className='pokedex'>
                <img src='../src/assets/SpinningPokeBall.gif' className="shuffle" onClick={handleShuffle}></img> 
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
                                

                <img src="../src/assets/MasterBall.gif" className="master" onClick={handleMaster}></img>

                <div className="button-container">
                    <img src='../src/assets/PokeBall_Left.gif' className="previous" onClick={handlePrevious}></img>
                    <img src='../src/assets/GreatBall_Right.gif' className="next" onClick={handleNext}></img> 
                </div>
                
                <form className="form-container" id="pokemon-form">
                    <label for='guess'>Pokemon:</label>
                    <input type="text" id="guess" placeholder="Name of Pokemon"></input>
                    <button type="submit" onClick={(event) => { onCheckAnswer(event); streakUpdate(event); }} >Check Guess</button>
                </form>

            </div>
        </div>
    );
}

export default Flashcard;