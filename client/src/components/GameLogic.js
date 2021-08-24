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

const GameLogic = (props) => {

  const [codeState, setCodeState] = useState({
    cursorPosition: 0,
    wrongChars: [],
    startTime: 0,
    endTime: 0,
    pressedTime: 0,
    timeFromPrevious: 0
  });

  // const [gameTimer, setGameTimer] = useState({
    // start: 0,
    // end: 0
  // })


  //constrols input and updates the codeState 
  useEffect(() => {
   
    const listener = (event) => {

      let pressedKey = convertTypedCharacter(event.key);
      
      
      if(props.src === null) return;
      if(forbiddenKeys.includes(pressedKey)) return;
      if(pressedKey === '\t') event.preventDefault();
      
      //checks if the key is correct and updates the cursor

      setCodeState(prev => {

        let newTime = {
                        startTime: prev.startTime,
                        endTime: prev.endTime,
                        pressedTime: prev.pressedTime,
                        timeFromPrevious: prev.timeFromPrevious
                      };


        //current time
        let currTime = Date.now();

        //starts the timer if it's the first key
        if(prev.cursorPosition === 0){
          //the game just started
          newTime.startTime = currTime;
          newTime.pressedTime = currTime;
          newTime.timeFromPrevious = 0;
        }

        //calculates the time from the previous right character
        newTime.timeFromPrevious = currTime - prev.pressedTime;

        //if the key is correct, updates the cursor and time values
        if(props.src[prev.cursorPosition] === pressedKey){

          let newCursorPosition = prev.cursorPosition + 1;
          
          //check if the user typed everything
          if(newCursorPosition === props.src.length){
            newTime.endTime = currTime;
          }

          newTime.pressedTime = currTime;
          return {
            ...prev, 
            cursorPosition: newCursorPosition,

            startTime: newTime.startTime,
            endTime: newTime.endTime,
            pressedTime: newTime.pressedTime,
            timeFromPrevious: newTime.timeFromPrevious
          }
        }

        //beyond that line, the key is incorrect
        //user already pressed wrong, don't change cursor values, only update the time
        let newWrongChars = prev.wrongChars;
        if(newWrongChars.length > 0 &&
           newWrongChars[newWrongChars.length - 1] === prev.cursorPosition ){
          
          return { ...prev,
                   startTime: newTime.startTime,
                   endTime: newTime.endTime,
                   pressedTime: newTime.pressedTime,
                   timeFromPrevious: newTime.timeFromPrevious
                 };
        }
        
        //user just typed something wrong, add new entry to the wrong keys array
        newWrongChars.push(prev.cursorPosition);

        return{
          cursorPosition: prev.cursorPosition,
          wrongChars: newWrongChars,
          startTime: newTime.startTime,
          endTime: newTime.endTime,
          pressedTime: newTime.pressedTime,
          timeFromPrevious: newTime.timeFromPrevious
        }
      })
    }

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    }
  }, [props.src]) ;

  console.log(codeState);
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
