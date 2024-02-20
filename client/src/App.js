import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import './components/auth.css'
import Authentication from './components/Authentication';
import Header from './components/Header';


function App() {
  const [jwt, setJwt] = useState('');
  const [user, setUser] = useState({});

  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route 
            path="/" element={!jwt ? <Authentication setJwt={setJwt} setUser={setUser} jwt={jwt} /> 
            :""}/>
          <Route 
            path="/chat" element={!jwt ? <Authentication setJwt={setJwt} setUser={setUser} jwt={jwt} /> 
            :""}/>  
        </Routes>
      
      </div>
    </Router>
    
  );
}

export default App;
