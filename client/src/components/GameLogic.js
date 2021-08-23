import Source from './Source'
import { useState, useEffect } from 'react';

const convertTypedCharacter = (c) => {
  
  switch(c){
    case 'Enter': return '\n';
    case 'Tab': return '\t';
    default: return c;
  }

}

const GameLogic = (props) => {

  // const [cursorPosition, setCursorPosition] = useState(0);
  // const [wrongChars, setWrongChars] = useState([]);

  const [codeState, setCodeState] = useState({
    cursorPosition: 0,
    wrongChars: []
  })
  
  useEffect(() => {
   
    const listener = (event) => {

      let pressedKey = convertTypedCharacter(event.key);
      
      let forbiddenKeys = [
        'Meta',
        'Shift',
        'CapsLock',
        'Alt',
        'Control',
        'Compose'
      ]
      
      if(props.src === null) return;
      if(forbiddenKeys.includes(pressedKey)) return;
      if(pressedKey === '\t') event.preventDefault();
      
      //checks if the key is correct and updates the cursor

      setCodeState(prev => {

        //check if the key is correct and updates the cursor
        if(props.src[prev.cursorPosition] === pressedKey){
          let newCursorPosition = prev.cursorPosition + 1;
          return {
            ...prev, cursorPosition: newCursorPosition
          }
        }

        //the key is incorrect
        
        //user already pressed wrong, return the previous state
        let newWrongChars = prev.wrongChars;
        if(newWrongChars.length > 0 &&
           newWrongChars[newWrongChars.length - 1] === prev.cursorPosition ){
          
          return prev;
        }
        
        //new entry to the wrong keys array
        newWrongChars.push(prev.cursorPosition);
        return{
          cursorPosition: prev.cursorPosition, wrongChars: newWrongChars
        }
      })
    }

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    }
  }, [props.src]) 

  // console.log(codeState);

  return (
    <Source 
      src = {props.src}
      // cursorPosition = {cursorPosition}
      // wrongChars = {wrongChars}
      cursorPosition = {codeState.cursorPosition}
      wrongChars = {codeState.wrongChars}
    />
  )
}

export default GameLogic;
