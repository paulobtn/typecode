import './style/App.css';

import useRequest from '../hooks/useRequest';
import Source from './Source';

function App() {


  const response = useRequest('/api/source/random');
  console.log(response);


  return (
    <div className="App">
      <Source 
        src={response.data ? response.data.src : null}
      />

    </div>
  );
}

export default App;
