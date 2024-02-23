/// Jericho Koskinen
/// 0607024
/// Project started 14.2.2024
/// Sources and references will be linked near the code





/// Imports and dependencies
import React from 'react';
import { Link } from 'react-router-dom';



///Intro function has a Link to Get started. 
function Intro() {
  return (
    <div>
      <h1>Welcome to Timber!</h1>
      <p>Find your match and start chatting.</p>
      <Link to="/auth">
        <button>Get started</button>
      </Link>
    </div>
  )
}

export default Intro