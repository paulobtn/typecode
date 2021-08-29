import React, {useState, 
               useImperativeHandle,
               useCallback,
               forwardRef 
              } from "react";
import {createPortal} from 'react-dom';

import "./style/Modal.css";

export function Modal({children, defaultOpened = false}, ref ){

  const [isOpen, setIsOpen] = useState(defaultOpened);

  const close = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close
  }), [close]) 

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

export default forwardRef(Modal);
