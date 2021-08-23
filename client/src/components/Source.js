import React from 'react';
// import { useState } from 'react';
import './style/Source.css'


const Source = (props) => {

  const renderCode = (src, cursorPosition, rightChars = [], wrongChars = []) => {
    
    if(src === null) return;

    let charArray = []
    src.split("").forEach((currChar, index) => {
      
      let charClass = "src-char";

      //is the cursor position in the current character?
      if(index === cursorPosition){
        charClass += " cursor"
      }

      if(rightChars.includes(index)){
        charClass += " src-char-right"
      } else if (wrongChars.includes(index)){
        charClass += " src-char-wrong"
      } else {
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

  return (
    <div className="source-container">
    { //<div className="cursor" style={{
      //  opacity: '0.64',
      //}}></div>
    }
      <code>
        {
          renderCode(props.src,
                    props.cursorPosition,
                    props.rightChars || [],
                    props.wrongChars || [])
        }
      </code>
    </div>
  );
}

export default Source;
