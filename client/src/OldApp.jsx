import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './OldApp.css';
import Names from './components/Names';
import axios from 'axios';

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/test/`);

      setPeople(response.data);
    };

    fetchNames();
  }, [setPeople]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Names people={people} />
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Poo poo
        </a>
      </header>
    </div>
  );
}

export default App;