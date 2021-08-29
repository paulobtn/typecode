import {  useState, useCallback, useEffect  } from 'react';

import Modal from './Modal';
import { GAME_STATE_END } from '../constants';

const ResultsModal = (props) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => {
      setIsOpen(true);
    }
    , []);
  const close = useCallback(() => {
      setIsOpen(false);
    }
    , []);


  useEffect(() => {

    // if the game is finished show the results
    if(props.codeState.gameState === GAME_STATE_END){
      open();
    }

  }, [props.codeState.gameState]);

  return ( 
    <Modal
      isOpen = { isOpen } 
    >
       Results modal 
    </Modal>
  )
}

export default ResultsModal;
