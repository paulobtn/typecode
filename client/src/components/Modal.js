import {createPortal} from 'react-dom';

import "./style/Modal.css";

export function Modal({children, isOpen}){

  return createPortal( 
    isOpen ? (
      <div className="modal">
        <div className="modal-overlay"></div>
        <div className="modal-body">{children}</div>
      </div>
    ) : null,
    document.getElementById('modal-root')
  )
}

export default Modal;
