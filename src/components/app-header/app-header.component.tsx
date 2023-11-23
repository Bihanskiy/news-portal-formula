import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './app-header.styles.scss';

const AppHeader = () => {
  return (
    <AppBar position="fixed">
      <Toolbar className="header-toolbar">
        <Typography variant="h4" component="a" href='/'>
          Formula
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;