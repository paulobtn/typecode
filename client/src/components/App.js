import './style/App.css';

import useFetch from '../hooks/useFetch';
import GameLogic from './GameLogic';

function App() {

  const response = useFetch('/api/source/random');

  const renderGame = (resp) => {

    switch(response.status){
      case 'fetched':
        return <GameLogic
          src = {resp.data.src}
        />
      case 'error':
        console.log(resp.error);
        return <div className='error'>{resp.error}</div>
      default:
        return <div>Loading...</div>

    }
  }


  return (
    <div className="App">
      {renderGame(response)}
    </div>
  );
}

export default App;
