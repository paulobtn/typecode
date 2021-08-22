import React from 'react';
import './style/Source.css'

const renderCode = (src) => {
  
  if(src === null) return;
  
  return (
    src.split("").map(character => {
      return (
          <span className="src-char">{character}</span>
      )
    })
  );
}



const Source = (props) => {
    //fazer o cursor animado aqui
    return (
      <div className="source-container">
        <div className="cursor" style={{
          opacity: '0.64',
          // left: `${0*1.22 + 3.3}rem`
        }}></div>
        <code>
          {renderCode(props.src)}
        </code>
      </div>
    );
}

export default Source;
