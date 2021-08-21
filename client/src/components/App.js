import './style/App.css';

import useRequest from '../hooks/useRequest';

function App() {

  const response = useRequest('/api/source/random');
  console.log(response);

  return (
    <div className="App">
      <header className="App-header">
        {response.data && <p>
         {response.data.id}
        </p>}
      </header>
    </div>
  );
}

export default App;