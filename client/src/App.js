
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import './pages/auth.css'
import Authentication from './pages/Authentication';
import Header from './components/Header';
import Home from './pages/Home';
import Intro from './pages/Intro';
import Chat from './pages/Chat';
import Find from './pages/Find';


function App() {
  const [jwt, setJwt] = useState('');
  const [user, setUser] = useState({});
  const LoggedIn = !!jwt; 

  const logout = () => {
    setJwt('');
    setUser({});
  };

  return (
    <Router>
      <div className="App">
        <Header LoggedIn={LoggedIn} onLogout={logout}/>
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
            :<Chat/>}/>  
          <Route 
            path="/find" element={!jwt ? <Authentication setJwt={setJwt} setUser={setUser} jwt={jwt} /> 
            :<Find/>}/>  
        </Routes>
      
      </div>
    </Router>
    
  );
}

export default App;
