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
        <h2>{jwt ? `Welcome ${user.email}!`: ""} </h2>

      <Register/>

      {!user?.id?.length > 0 &&
        <Login setJwt={setJwt} setUser={setUser} jwt={jwt}/>
      }
      </div>
    </Router>
    
  );
}

export default App;
