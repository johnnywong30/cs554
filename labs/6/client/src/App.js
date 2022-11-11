import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes';
import PokemonNav from './components/PokemonNav';
import Heading from './components/Heading';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <PokemonNav />
        <Heading />
      </div>
        <div className='App-body'>
          <Routes />
        </div>
    </Router>
  );
}

export default App;
