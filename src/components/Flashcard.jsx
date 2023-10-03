import "./Flashcard.css";

const Flashcard = (props) => {
    const { index, handleToggle, handlePrevious, handleNext, handleMaster, handleShuffle, onCheckAnswer} = props;

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
                    <label>Pokemon:</label>
                    <input type="text" id="guess" placeholder="Name of Pokemon"></input>
                    <button type="submit" onClick={onCheckAnswer} >Check Guess</button>
                </form>
            </div>
        </div>
    );
}

export default Flashcard;