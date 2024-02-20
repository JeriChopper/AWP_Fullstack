import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <AppBar sx={{
      position: "fixed",
      backgroundColor: 'transparent'
    }}>
      <Toolbar sx={{
        justifyContent: 'center',
        color: 'black'}} >
        <Button component={Link} to="/"
        sx={{
          backgroundColor: 'white',
          marginRight: '20px',
        }}>
          HOME
        </Button>
        <Button component={Link} to="/chat"
        sx={{
          backgroundColor: 'white'
        }}>
          CHAT
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;