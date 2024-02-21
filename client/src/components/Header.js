import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = ({LoggedIn, onLogout}) => {

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