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

  return ( 
    <Modal
      isOpen = { isOpen } 
    >
    <h2>Results: </h2>
    <h3>Score: 100wpm</h3>
    <h3>Accuracy: 98%</h3>
    <button type='button' onClick={() => {close()}}>Play again</button>
    </Modal>
  )
}

export default ResultsModal;
