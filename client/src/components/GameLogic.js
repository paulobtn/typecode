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

  const [cursorPosition, setCursorPosition] = useState(0);
  // const [pressedKey, setPressedKey] = useState(null);
  const [wrongChars, setWrongChars] = useState([]);
  
  useEffect(() => {
   
    const listener = (event) => {

      let pressedKey = convertTypedCharacter(event.key);
      let incorrectChar = "";

      if(props.src === null) return;
      if(pressedKey === 'Shift') return;
      if(pressedKey === '\t') event.preventDefault();
      
      //checks if the key is correct and updates the cursor
      setCursorPosition(prev => {
        
        if(props.src[prev] === pressedKey){
          return prev + 1;
        }

        incorrectChar = pressedKey;
        return prev;

      });

      //update wrong chars array
      // setWrongChars(prev => {
        // if(incorrectChar !== ''){
          // // return prev.concat(incorrectChar);
          // return prev.concat(incorrectChar);
        // }
        // return prev;
      // })


    }

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    }
  }, [props.src]) 

  // console.log(wrongChars);

  return (
    <Source 
      src = {props.src}
      cursorPosition = {cursorPosition}
      wrongChars = {wrongChars}
    />
  )
}

export default GameLogic;
