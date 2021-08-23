// import React from 'react';
// import { useState } from 'react';
import './style/Source.css'

const renderCode = (src, cursorPosition, wrongChars = []) => {
  
  if(src === null) return;

  let charArray = []
  src.split("").forEach((currChar, index) => {
    
    let charClass = "src-char";

    //is the cursor position in the current character?
    if(index === cursorPosition){
      charClass += " cursor"
    }
    
    //styling the characters
    if(wrongChars.includes(index)){
       charClass += " src-char-wrong"
    } else if(index < cursorPosition){
       charClass += " src-char-right"
    } else{
       charClass += " src-char-before"
    }

    charArray.push(
      {
        character: currChar,
        charClass: charClass
      }
    );
  })

  return (
    
    charArray.map((value, index) => {

      //if it's a new line character, add a space to make the cursor appear
      if(value.character !== '\n'){
        return(
            <span key={index} className={value.charClass}>{value.character}</span>
        ) 
      } else{
          return(
              <span key={index} className={value.charClass}>{' \n'}</span>
          ) 
      }
    })
  );
}

const Source = (props) => {


  return (
    <div className="source-container">
      <code>
        {
          renderCode(props.src,
                    props.cursorPosition,
                    props.wrongChars || [])
        }
      </code>
    </div>
  );
}

export default Source;
