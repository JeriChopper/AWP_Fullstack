import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import Register from './components/Register';


function App() {

  const [jwt, setJwt] = useState("")
  const [user, setUser] = useState({})
  const [registerComplete, setRegisterComplete] = useState(false)

  const handleRegistrationComplete = () => {
    setRegisterComplete(true);
  };


  return (
    <Router>
      <div className="App">
        <h2>{jwt ? `Your email: ${user.email}!`: ""} </h2>

      {!registerComplete && (
        <Register onRegistrationComplete={handleRegistrationComplete} />
      )}
      {!user.email?.length > 0 &&
        <Login setJwt={setJwt} setUser={setUser} jwt={jwt}/>
      }
      </div>
    </Router>
    
  );
}

export default App;
