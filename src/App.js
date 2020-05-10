import React from 'react';
import './App.css';
import Navigation from './features/Navigation/Navigation'
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return(
    <>
    <Router>
      <Navigation/>
      <ToastContainer 
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable/>
    </Router>
    </>
  );
}

export default App;
