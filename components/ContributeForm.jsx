import React, { useState } from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { AlertTitle, Button, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import web3 from "../ethereum/web3";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Zoom from "@mui/material/Zoom";
import LinearProgress from "@mui/material/LinearProgress";
import Router from "next/router";


function ContributeForm() {

    const [errorMessage, setErrorMessage] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    const onSubmit = async (event) => {
      //Keeps browser from attempting to submit the form right away
      event.preventDefault();
  
      setErrorMessage(""); 
  
      setShowSpinner(true);
  
      try {
        //Get list of accounts
        const accounts = await web3.eth.getAccounts();
        /*
      When using metamask we don't have to worry about gas.  
      Metamask automatically calculates a suggested gas amount to use.
      This is what metamask uses internally: https://github.com/MetaMask/eth-gas-price-suggestor
      */
        await factory.methods.createCampaign(minContribution).send({
          //when we set one of multiple Metamask accounts to be the default account, that account is placed at accounts[0]
          from: accounts[0],
        });
  
        Router.push("/");
  
      } catch (err) {
        setErrorMessage(err.message);
      }
  
      setShowSpinner(false);
    };

  return (
        <form onSubmit={onSubmit}>
        <Box
          marginTop={4}
          padding={5}
          sx={{
            width: "50%",
            height: "50%",
            backgroundColor: "#2C2C2C",
          }}
          autoComplete="on"
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={9}>
              <Typography variant="h5">Create A Campaign</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                id="filled-required"
                label="Minimum Contribution"
                placeholder="Enter In Wei"
                variant="filled"
                value={minContribution}
                onChange={(event) => setMinContribution(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">wei</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <Button type="submit" variant="outlined">
                Create Campaign
              </Button>
            </Grid>
          </Grid>
        </Box>
        {showSpinner ? <LinearProgress /> : null}
        {/* !1 Turns a string into its equivalent bool value  */}
        <Zoom in={!!errorMessage}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="large"
                onClick={() => {
                  setErrorMessage("");
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            <AlertTitle>Oops!</AlertTitle>
            {errorMessage}
          </Alert>
        </Zoom>
      </form>
  )
}

export default ContributeForm