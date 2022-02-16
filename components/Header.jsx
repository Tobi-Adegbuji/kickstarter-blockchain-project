import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxIcon from "@mui/icons-material/AddBox";
import Router from "next/router";



function Header() {
  return (
    <AppBar position="static">
        <Toolbar>
          <Typography onClick={() => Router.push("/")} letterSpacing={8} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CHAINSTARTER
          </Typography>
          <Button color="inherit" onClick={() => Router.push("/")}>Campaigns</Button>
          <AddBoxIcon/>
        </Toolbar>
      </AppBar>
  )
}

export default Header