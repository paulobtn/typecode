import './style/App.css';

import useFetch from '../hooks/useFetch';
import GameLogic from './GameLogic';
import {useEffect} from 'react';

function App() {
  
   const {fetchData, fetchState} = useFetch({
     defaultUrl: '/api/source/random',
   })

  useEffect(() => {
     fetchData();
  }, [fetchData])

  const renderGame = (resp) => {

   switch(fetchState.status){
      case 'fetched':
        return <GameLogic
          src = {resp.data.src}
          fetchData = {fetchData}
        />
      case 'error':
        console.log(resp.error);
        return <div className='error'>{resp.error}</div>
      default:
        return null;
    }
  }


  return (
    <div className="App">
      {renderGame(fetchState)}
    </div>
  );
}

export default App;
