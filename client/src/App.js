import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
      
      <Login />

      </div>
    </Router>
    
  );
}

export default App;
