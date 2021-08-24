import Source from './Source'
import { useState, useEffect } from 'react';

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
]

const GAME_STATE_IDLE    = 'GAME_STATE_IDLE';
const GAME_STATE_RUNNING = 'GAME_STATE_RUNNING';
const GAME_STATE_END   = 'GAME_STATE_END';

const GameLogic = (props) => {

  const [codeState, setCodeState] = useState({
    cursorPosition: 0,
    wrongChars: [],
    startTime: 0,
    endTime: 0,
    pressedTime: 0,
    gameState: GAME_STATE_IDLE
  });

  //controls input and updates the codeState 
  useEffect(() => {
   
    const listener = (event) => {

      let pressedKey = convertTypedCharacter(event.key);
      
      if(props.src === null) return;
      if(forbiddenKeys.includes(pressedKey)) return;
      if(pressedKey === '\t') event.preventDefault();
      
      //checks if the key is correct and updates the cursor
      setCodeState(prev => {

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
        //user already pressed wrong, don't change cursor values
        let newWrongChars = prev.wrongChars;
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

    return () => {
      document.removeEventListener("keydown", listener);
    }
  }, [props.src]) ;

  //Show game statistics
  switch (codeState.gameState){
    case GAME_STATE_IDLE:
      console.log("start typing");
      break;
    case GAME_STATE_END:
      console.log("finished!");
      /* falls through */     
    default:
      
      let charPerSec = 0
      let wpm = 0;
      if(codeState.pressedTime - codeState.startTime !== 0){
        charPerSec = codeState.cursorPosition*1000/(codeState.pressedTime - codeState.startTime);
      }
      
      //words per minute is characters per second divided by the average amount of
      //characters of an english word
      wpm = (charPerSec*60)/5.1;

      console.log("characters per second: ", charPerSec);
      console.log("words per minute: ", wpm);
  }
    

  // console.log(codeState);
  // console.log(props.src.length);
  // console.log(timer);
  return (
    <Source 
      src = {props.src}
      cursorPosition = {codeState.cursorPosition}
      wrongChars = {codeState.wrongChars}
    />
  )
}

export default GameLogic;
