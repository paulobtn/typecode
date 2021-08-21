import './style/App.css';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";

import useRequest from '../hooks/useRequest';

function App() {

  const response = useRequest('/api/source/random');
  console.log(response);

  return (
    <div className="App">
      <header className="App-header">
      
    {response.data && 
      <AceEditor
        mode="c_cpp"
        theme="github"
        onChange={(a) => {console.log(a)}}
        value={response.data.src}
        name="div-id"
        editorProps={{ $blockScrolling: true }}
      />
      }
      

      </header>
    </div>
  );
}

export default App;






// import React from "react";
// import { render } from "react-dom";
// import AceEditor from "react-ace";

// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/theme-github";

// function onChange(newValue) {
  // console.log("change", newValue);
// }

// // Render editor
// render(
  // <AceEditor
    // mode="java"
    // theme="github"
    // onChange={onChange}
    // name="UNIQUE_ID_OF_DIV"
    // editorProps={{ $blockScrolling: true }}
  // />,
  // document.getElementById("example")
// );
