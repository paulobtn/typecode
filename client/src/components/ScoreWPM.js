import { useState, useEffect } from 'react'

import './style/ScoreWPM.css';

//words per minute is characters per second divided by the average amount of
//characters of an english word
const getWPM = (codeState) => {

    let charPerSec = 0;
    let currentTime = Date.now();
    if(currentTime - codeState.startTime !== 0){
      charPerSec = codeState.cursorPosition*1000/(currentTime - codeState.startTime);
    }
    return parseInt((charPerSec*60)/5);

}

const ScoreWPM = (props) => {


  const [scoreDisplay, setScoreDisplay] = useState({
    isActive: true,
    counter: 0,
    wpm: 0
  });
  
  //updates score every second
  useEffect (() => {
    let interval;

    if(scoreDisplay.isActive){
      interval = setInterval(() => {
        setScoreDisplay( (prev) => {
          return {...prev, counter: prev.counter + 1, wpm: getWPM(props.codeState)};
        });
      }, 500);
    }


    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoreDisplay]);


  return (
    <div className="wpm-container">
      <span className="wpm-value">
        {scoreDisplay.wpm} WPM
      </span>
    </div>
  );

}

export default ScoreWPM;

