import React, { useState } from "react";
import Layout from "../../components/Layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

function create() {

  const [minContribution, setMinContribution] = useState("");

  const onSubmit = async (event) => {
    //Keeps browser from attempting to submit the form right away
    event.preventDefault(); 
  };

  return (
    <Layout>
      <Box
        onSubmit={onSubmit}
        component="form"
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
              label="Campaign Title"
              placeholder="Enter Name"
              variant="filled"
            />
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
            <Button variant="outlined">Create Campaign</Button>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default create;
