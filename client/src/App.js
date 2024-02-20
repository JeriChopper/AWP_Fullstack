import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import './pages/auth.css'
import Authentication from './pages/Authentication';
import Header from './components/Header';
import Home from './pages/Home';
import Intro from './pages/Intro';


function App() {
  const [jwt, setJwt] = useState('');
  const [user, setUser] = useState({});

  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route 
            path="/" element={!jwt ? <Intro setJwt={setJwt} setUser={setUser} jwt={jwt} /> 
            :<Home/>}>
          </Route>
          <Route 
            path="/auth" element={!jwt ? <Authentication setJwt={setJwt} setUser={setUser} jwt={jwt} /> 
            :<Home/>}/>
          <Route 
            path="/chat" element={!jwt ? <Authentication setJwt={setJwt} setUser={setUser} jwt={jwt} /> 
            :<Home/>}/>  
        </Routes>
      
      </div>
    </Router>
    
  );
}

export default App;
