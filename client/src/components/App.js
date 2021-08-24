import './style/App.css';

import useRequest from '../hooks/useRequest';
import GameLogic from './GameLogic';

function App() {

  const response = useRequest('/api/source/1');

  const renderGame = (resp) => {
    if(resp.data ){
      
      return <GameLogic 
        src = {resp.data.src}
      /> 
    }

    return <div>loading...</div>
  }


  return (
    <div className="App">
      {renderGame(response)}
    </div>
  );
}

export default App;
