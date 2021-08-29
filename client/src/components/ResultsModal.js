import {  useState, useCallback, useEffect  } from 'react';

import Modal from './Modal';
import { GAME_STATE_END } from '../constants';

const ResultsModal = (props) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => {
      setIsOpen(true);
      if(props.onOpen){
        props.onOpen();
      }
    }
    , [props]);
  const close = useCallback(() => {
      setIsOpen(false);
      if(props.onClose){
        props.onClose();
      }
    }
    , [props]);


  useEffect(() => {

    // if the game is finished show the results
    if(props.codeState.gameState === GAME_STATE_END){
      open();
    }

  }, [props.codeState.gameState, open]);

  
  const renderResults = () => {

    let charPerSec = 0;
    let {codeState} = props;
    if(codeState.pressedTime - codeState.startTime !== 0){
      charPerSec = codeState.cursorPosition*1000/(codeState.pressedTime - codeState.startTime);
    }

    const wpm = parseInt((charPerSec*60)/5);
    let accuracy = 1 - (codeState.wrongChars.length/codeState.cursorPosition);


    return ( 
      <Modal
        isOpen = { isOpen } 
      >
        <h2>Results: </h2>
        <h3>Score: {wpm} wpm</h3>
        <h3>Accuracy: {parseInt(accuracy*100)}%</h3>
      <button type='button' onClick={() => {close()}}>Play again</button>
      </Modal>
    )

  }

  return (renderResults());
}

export default ResultsModal;
