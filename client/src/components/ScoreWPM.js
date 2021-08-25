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

  const [wpmDisplay, setWpmDisplay] = useState({
    update: false,
    wpm: 0
  });

  const setUpdater = (value) => {
    setWpmDisplay( (prev) => {
        return (
          {
            ...prev,
            update: value,
          }
        )
      }
    );
  }

  //updates wpm every half second
  useEffect (() => {
    let interval;
    
    // if the updater is active, update the wpm every half second
    if(wpmDisplay.update){
      interval = setInterval(() => {

        //update wpm
        setWpmDisplay( (prev) => {
          return {...prev, wpm: getWPM(props.codeState)};
        });

      }, 500);
    }

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wpmDisplay, props.codeState.gameState]);
  
  //starts or stops updating the wpm based on the game state
  useEffect (() => {
    switch(props.codeState.gameState) {
      case 'GAME_STATE_END':
      // [> falls through <]
      case 'GAME_STATE_IDLE':
        setUpdater(false);
        break;
      case 'GAME_STATE_RUNNING':
        setUpdater(true);
        break;
      default:
    }
  }, [props.codeState.gameState])

  console.log(wpmDisplay);
  return (
    <div className="wpm-container">
      <span className="wpm-value">
        {wpmDisplay.wpm} WPM
      </span>
    </div>
  );

}

export default ScoreWPM;

