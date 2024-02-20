import React from 'react';
import { Link } from 'react-router-dom';

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