import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import Register from './components/Register';


function App() {
  return (
    <Router>
      <div className="App">

      <Register/>
      <Login />

      </div>
    </Router>
    
  );
}

export default App;
