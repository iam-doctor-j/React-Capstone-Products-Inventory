import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './features/Navigation/Navigation'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return(
    <>
    <Router>
      <Navigation/>
    </Router>
    </>
  );
}

export default App;
