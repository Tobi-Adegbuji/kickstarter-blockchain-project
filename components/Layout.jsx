import React from "react";
import Header from "./Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Head from "next/head";

function Layout(props) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      h4: {
        color: "white",
      },
      h5: {
        color: "white",
      },
    },
  });

  return (
    <div>
      <Container maxWidth="xl">
        <Head>
          <title>Chainstarter</title>
        </Head>
        <ThemeProvider theme={darkTheme}>
          <Header />
          {props.children}
        </ThemeProvider>
      </Container>
    </div>
  );
}

export default Layout;
