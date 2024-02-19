import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Button component={Link} to="/" color="inherit">
                home
            </Button>
            <Button component={Link} to="/about" color="inherit">
                about
            </Button>
            <Button >
                FI
            </Button>
            <Button >
                EN
            </Button>
        </Toolbar>
  </AppBar>
);
};

//export default Header;

export default function App(){
    return (
        <Suspense fallback="loading">
            <Header/>
        </Suspense>
    )
}