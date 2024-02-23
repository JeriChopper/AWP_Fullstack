/// Jericho Koskinen
/// 0607024
/// Project started 14.2.2024
/// Sources and references will be linked near the code


///App.js

/// IMPORTS AND DEPENDENCIES
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
import Profile from './pages/Profile';


function App() {
  const [jwt, setJwt] = useState(''); //useState to pass jwt
  const [user, setUser] = useState({}); // useState to pass user
  const LoggedIn = !!jwt; // Boolean jwt value.

  const logout = () => {
    setJwt('');
    setUser({});
  }; // Function to logout, clears jwt and user.


  /// Return function has Routed system. Header includes boolean Logout function which terminates the jwt. 
  /// All of the routes take to Authorization (Register/Login) page if jwt is not valid. Index page leads to Introduction page. 
  /// Chat, Find, Profile pages prop jwt token for verification of the correct user
  /// User passed as a prop to Find page to exclude the user itself in the find page

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
            path="/chat" element={!jwt ? (<Authentication setJwt={setJwt} setUser={setUser} jwt={jwt} />) : (
                <>
                  <Chat jwt={jwt}/>
                </>)}/>
          <Route 
            path="/find" element={!jwt ? <Authentication setJwt={setJwt} setUser={setUser} jwt={jwt} /> 
            :<Find user={user} jwt={jwt}/>}/>  
          <Route 
            path="/profile" element={!jwt ? <Authentication setJwt={setJwt} setUser={setUser} jwt={jwt} /> 
            :<Profile jwt={jwt}/>}></Route>
        </Routes>
      
      </div>
    </Router>
    
  );
}

export default App;
