import React from 'react';

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

    return (
      <div className="source-container">
        <code>
          {renderCode(props.src)}
        </code>
      </div>
    );
}

export default Source;
