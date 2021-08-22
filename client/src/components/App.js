import './style/App.css';

import useRequest from '../hooks/useRequest';

function App() {

  const renderCode = (src) => {
    
    return (
      src.split("").map(character => {
        return (
            <span className="src-char">{character}</span>
        )
      })
    )
  }

  const response = useRequest('/api/source/random');
  console.log(response);


  return (
    <div className="App">

    <div className="source-container">
      <code>
        {response.data && renderCode(response.data.src)}
      </code>
    </div>

    </div>
  );
}

export default App;
