import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/about" color="inherit">
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;