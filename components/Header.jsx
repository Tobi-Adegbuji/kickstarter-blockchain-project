import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxIcon from "@mui/icons-material/AddBox";


function Header() {
  return (
    <AppBar position="static">
        <Toolbar>
          <Typography letterSpacing={8} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CHAINSTARTER
          </Typography>
          <Button color="inherit">Campaigns</Button>
          <AddBoxIcon/>
        </Toolbar>
      </AppBar>
  )
}

export default Header