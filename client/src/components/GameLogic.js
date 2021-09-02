import { useState, useEffect } from 'react';

import Source from './Source';
import ScoreWPM from './ScoreWPM';
import ResultsModal from './ResultsModal';
import {ReactComponent as ReloadIcon} from '../assets/reload-icon.svg';
import {GAME_STATE_IDLE, GAME_STATE_RUNNING, GAME_STATE_END} from '../constants';
import './style/GameLogic.css';
import './style/Modal.css';

const convertTypedCharacter = (c) => {
  
  switch(c){
    case 'Enter': return '\n';
    case 'Tab': return '\t';
    default: return c;
  }

}

const forbiddenKeys = [
  'Meta',
  'Shift',
  'CapsLock',
  'Alt',
  'Control',
  'Compose',
  'Escape'
];

const GameLogic = (props) => {

  const [codeState, setCodeState] = useState({
    cursorPosition: 0,
    wrongChars: [],
    startTime: 0,
    endTime: 0,
    pressedTime: 0,
    gameState: GAME_STATE_IDLE
  });

  const resetCodeState = () => {
    setCodeState(
      {
        cursorPosition: 0,
        wrongChars: [],
        startTime: 0,
        endTime: 0,
        pressedTime: 0,
        gameState: GAME_STATE_IDLE
      }
    )
  };

  const restartGame = () => { //fetch new data and restart the codeState
    props.fetchData({onSuccess : () => {
      resetCodeState();
    }});
  } 

  //controls input and updates the codeState 
  useEffect(() => {
   
    const listener = (event) => {

      let pressedKey = convertTypedCharacter(event.key);
      
      if(props.src === null) return;
      if(forbiddenKeys.includes(pressedKey)) return;
      if(pressedKey === '\t') event.preventDefault();
      
      //checks if the key is correct and updates the cursor
      setCodeState(prev => {
        
        //don't do anything if the game is over
        if(prev.gameState === GAME_STATE_END) return prev;
        
        let newCodeState = {...prev};

        //current time
        let currTime = Date.now();

        //starts the timer and the game if it's the first key
        if(prev.cursorPosition === 0){
          //the game just started
          newCodeState.startTime = currTime;
          newCodeState.pressedTime = currTime;
          newCodeState.gameState = GAME_STATE_RUNNING;
        }

        //if the key is correct, updates the cursor and time values
        if(props.src[prev.cursorPosition] === pressedKey){

          newCodeState.pressedTime = currTime;
          newCodeState.cursorPosition = prev.cursorPosition + 1;
          
          //check if the user typed everything
          if(newCodeState.cursorPosition === props.src.length){
            newCodeState.endTime = currTime;
            newCodeState.gameState = GAME_STATE_END;
          }
          
          return newCodeState;
        }

        //beyond that line, the key is incorrect
        let newWrongChars = prev.wrongChars;

        //if user already pressed a wrong key, don't change cursor values
        if(newWrongChars.length > 0 &&
           newWrongChars[newWrongChars.length - 1] === prev.cursorPosition ){
          
          return newCodeState;
        }
        
        //user just typed something wrong, add new entry to the wrong keys array
        newWrongChars.push(prev.cursorPosition);
        newCodeState.wrongChars = newWrongChars;
        
        return newCodeState;
      })
    }

    document.addEventListener("keydown", listener);

    //reset state every time the source code changes
    resetCodeState();

    return () => {
      document.removeEventListener("keydown", listener);
    }
  }, [props.src]) ;


  return (
    <div className='game-container'>
      
      <div className='wpm-and-reload-container'>
        <ScoreWPM
          codeState = {codeState}
        />
        <ReloadIcon 
            className='reload'
            onClick={restartGame}
        />
      </div>
      <Source 
        src = {props.src}
        cursorPosition = {codeState.cursorPosition}
        wrongChars = {codeState.wrongChars}
      />
      <ResultsModal
        codeState = {codeState}
        onClose={restartGame}
      />
    </div>
  )
}

export default GameLogic;
