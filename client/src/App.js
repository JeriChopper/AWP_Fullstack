import { useState } from 'react';
//import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import './components/auth.css'
import Authentication from './components/Authentication';

function App() {
  const [jwt, setJwt] = useState('');
  const [user, setUser] = useState({});

  return (
    <div className="App">
      {!jwt? <Authentication setJwt={setJwt} setUser={setUser} jwt={jwt} /> : `Your email: ${user.email}!`}
      <h2>Welcome</h2>
    </div>
  );
}

export default App;
