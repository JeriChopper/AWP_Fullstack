/// Jericho Koskinen
/// 0607024
/// Project started 14.2.2024
/// Sources and references will be linked near the code



///Imports and Dependencies
import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';


//Header component. Takes loggedIn and onLogout as a prop from App.js 
const Header = ({LoggedIn, onLogout}) => {


  /// Returns app bar with buttons which all redirect to right content if authorization is correct.

  

  /// Logout button is conditionally rendered

  /// Logout button functionality inspired from: https://www.youtube.com/watch?v=VlklL6TPlpw

  return (
    <AppBar sx={{
      position: "fixed",
      backgroundColor: 'transparent'
    }}>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'center',
        color: 'black',
      }}>
        <Button component={Link} to="/" sx={{
          backgroundColor: 'white',
          marginRight: '20px',
          color: "inherit",
        }}>
          HOME
        </Button>
        <Button component={Link} to="/chat" sx={{
          backgroundColor: 'white',
          marginRight: '20px',
          color: "inherit"
        }}>
          CHAT
        </Button>
        <Button component={Link} to="/find" sx={{
          backgroundColor: 'white',
          color: "inherit",
          marginRight: '20px'
        }}>
          FIND
        </Button>
        <Button component={Link} to="/profile" sx={{
          backgroundColor: 'white',
          marginRight: '20px',
          color: "inherit"
        }}>
          Profile
        </Button>
        {LoggedIn && (
          <Button onClick={onLogout} sx={{
            backgroundColor: 'white',
            color: "inherit",
          }}>
            LOGOUT
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;