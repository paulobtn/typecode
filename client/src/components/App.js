import './style/App.css';

import useRequest from '../hooks/useRequest';
import Source from './Source';

function App() {


  const response = useRequest('/api/source/2');
  // console.log(response);


  return (
    <div className="App">
      <Source 
        src={response.data ? response.data.src : null}
        cursorPosition={12}
        rightChars={[
          0,1,2,3,4,6,8,9,10,11
        ]}
        wrongChars={[
          5,7
        ]}
      />

    </div>
  );
}

export default App;
