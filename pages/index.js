import React, { useState } from "react";
import factory from "../ethereum/factory";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Layout from "../components/Layout";

function CampaignIndex({ campaigns }) {
  const renderCampaigns = () => {
    const example = [
      "0xbbc3d1b671D16fd306b9556Ed8529190c0753030",
      "0xbbc3d1b671D16fd306b9556Ed8529190c0753030",
      "0xbbc3d1b671D16fd306b9556Ed8529190c0753030",
      "0xbbc3d1b671D16fd306b9556Ed8529190c0753030",
      "0xbbc3d1b671D16fd306b9556Ed8529190c0753030",
      "0xbbc3d1b671D16fd306b9556Ed8529190c0753030",
      "0xbbc3d1b671D16fd306b9556Ed8529190c0753030",
      "0xbbc3d1b671D16fd306b9556Ed8529190c0753030",
      "0xbbc3d1b671D16fd306b9556Ed8529190c0753030",
    ];

    const items = example.map((address) => {
      return (
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography noWrap>{address}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Campaign</Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });

    return items;
  };

  return (
    <Layout>
      <div>
        <Typography variant="h4" marginY={5}>
          Open Campaigns
        </Typography>
        <Grid container direction={"row"} spacing={4} justify="flex-start">
          <Grid item xs={6}>
            <Grid
              container
              spacing={2}
              maxWidth={"900px"}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              {renderCampaigns()}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Button size="large" startIcon={<AddBoxIcon />} variant="contained">
              Add Campaign
            </Button>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

//uses server side rendering to call the campaign contracts (so good for slow devices)
//Next will call this bypassing having to render the component
CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  //Below is really: campaigns: campaigns. The prop name and its value.
  return { campaigns };
};

export default CampaignIndex;
