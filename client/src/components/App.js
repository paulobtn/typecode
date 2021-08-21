import './style/App.css';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

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
        theme="monokai"
        onChange={(a) => {console.log(a)}}
        value={response.data.src}
        name="div-id"
        showGutter={false}
        fontSize={18}
        editorProps={{ $blockScrolling: true }}
        setOptions={
          {
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            behavioursEnabled: false
          }
        }
      />
      }
      

      </header>
    </div>
  );
}

export default App;
