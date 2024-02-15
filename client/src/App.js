import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import Register from './components/Register';


function App() {

  const [jwt, setJwt] = useState("")
  const [user, setUser] = useState({})



  return (
    <Router>
      <div className="App">

      <Register/>
      <Login setJwt={setJwt} setUser={setUser} jwt={jwt}/>

      </div>
    </Router>
    
  );
}

export default App;
