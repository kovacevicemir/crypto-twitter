import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const port = 5000;
const talkToBackEnd = async () =>{
  let result = await axios.get(`http://localhost:${port}/users`);
  console.log(result);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={talkToBackEnd}>test backend connection</button>

      </header>
    </div>
  );
}

export default App;
