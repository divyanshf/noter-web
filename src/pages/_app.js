//ESSENTIALS
import "../styles/globals.css";
import { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Head from "next/head";

//MATEARIAL-UI
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { yellow, orange, red, grey } from "@material-ui/core/colors";

//FIREBASE
import fire from "../config/fire-config";

function MyApp({ Component, pageProps }) {
  //initialize
  const user = fire.auth().currentUser;
  const [darkState, setDarkState] = useState(true);
  const mainPrimaryColor = darkState ? yellow[500] : orange[900];
  const mainSecondaryColor = darkState ? red[500] : red[900];
  const palletType = darkState ? "dark" : "light";
  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });

  //functions
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  //render
  return (
    <ThemeProvider theme={theme}>
      <Scrollbars
        style={{ width: "100vw", height: "100vh" }}
        autoHide
        thumbMinSize={30}
        universal={true}
      >
        <CssBaseline />
        <Head>
          <title>Noter</title>
          <link rel="icon" href="/favicon.ico" />
          {/* <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" /> */}
        </Head>
        <Component changeTheme={handleThemeChange} {...pageProps} />
      </Scrollbars>
    </ThemeProvider>
  );
}

export default MyApp;
