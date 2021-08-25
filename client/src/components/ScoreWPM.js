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
    timerIsActive: false,
    counter: 0,
    wpm: 0
  });

  const setTimer = (value) => {
    setScoreDisplay( (prev) => {
        return (
          {
            ...prev,
            timerIsActive: value,
            counter: 0
          }
        )
      }
    );
  }

  //updates score every half second
  useEffect (() => {
    let interval;
    
    // if the game is running and timer is active
    if(scoreDisplay.timerIsActive){
      interval = setInterval(() => {

        //increment timer
        setScoreDisplay( (prev) => {
          return {...prev, counter: prev.counter + 1, wpm: getWPM(props.codeState)};
        });

      }, 500);
    }
    

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoreDisplay, props.codeState.gameState]);
  
  //starts or stops timer based on the game state
  useEffect (() => {
    switch(props.codeState.gameState) {
      case 'GAME_STATE_END':
      // [> falls through <]
      case 'GAME_STATE_IDLE':
        setTimer(false);
        break;
      case 'GAME_STATE_RUNNING':
        setTimer(true);
        break;
      default:
    }
  }, [props.codeState.gameState])

  console.log(scoreDisplay);
  return (
    <div className="wpm-container">
      <span className="wpm-value">
        {scoreDisplay.wpm} WPM
      </span>
    </div>
  );

}

export default ScoreWPM;

