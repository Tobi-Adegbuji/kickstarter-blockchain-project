import React from "react";
import Layout from "../../../components/Layout";
import retrieveCampaign from "../../../ethereum/campaign";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Router from "next/router";
import Link from "next/link";
import web3 from "../../../ethereum/web3";
import ContributeForm from "../../../components/ContributeForm";

function Show(props) {
  const renderCampaignInfo = () => {
    const {
      minContribution,
      campaignBalance,
      requestCount,
      approversCount,
      manager,
    } = props;

    const data = [
      {
        header: manager.toString(),
        title: "Address of Manager",
        description:
          "The manager created this campaign and can create request to withdraw funds from the balance of the contract.",
      },
      {
        header: requestCount,
        title: "Number of Request",
        description:
          "Number of pending request the manager has made to withdraw funds from contract balance. ",
      },
      {
        header: web3.utils.fromWei(campaignBalance, 'ether'), 
        title: "Total Contributions (ether)",
        description: "Total contribution donated by contributors.",
      },
      {
        header: `${minContribution}`,
        title: "Minimum Contribution (wei)",
        description:
          "This is the minimum contibution needed to become a contributor.",
      },
      {
        header: approversCount,
        title: "Number of Contributors",
        description: "Total number of contributors for this campaign.",
      },
    ];

    const cards = data.map((stat, key) => {
      return (
        <Grid item xs={6} key={key}>
          <Card>
            <CardContent>
              <Typography noWrap variant="body2">
                {stat.header}
              </Typography>

              <Typography variant="h6"> {stat.title} </Typography>

              <Typography variant="body2">{stat.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });

    return cards;
  };

  return (
    <Layout>
      <div>
        <Typography variant="h4" marginY={5}>
          Campaign Information
        </Typography>
        <Grid container direction={"row"} spacing={4} justify="flex-start">
          <Grid item xs={6}>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="stretch"
            >
              {renderCampaignInfo()}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => Router.push("/")}
              size="large"
              startIcon={<AddBoxIcon />}
              variant="contained"
            >
              <ContributeForm/>
            </Button>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

Show.getInitialProps = async (props) => {
  //Below we are getting the address from the url
  const campaign = retrieveCampaign(props.query.address);

  const summary = await campaign.methods.getSummary().call();

  return {
    minContribution: summary[0],
    campaignBalance: summary[1],
    requestCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

export default Show;
