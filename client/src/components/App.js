import './style/App.css';

import useRequest from '../hooks/useRequest';
import GameLogic from './GameLogic';

function App() {

  const response = useRequest('/api/source/2');

  return (
    <div className="App">
      <GameLogic 
        src = {response.data ? response.data.src : null}
      /> 
    </div>
  );
}

export default App;
