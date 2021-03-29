//ESSENTIALS
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

//MATERIAL-UI
import { useTheme } from "@material-ui/core/styles";
import { Button, Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CircularProgress } from '@material-ui/core';

//FIREBASE
import fire from "../config/fire-config";

export default function Unavailable({ changeTheme }) {
  //initialize
  const router = useRouter();
  const theme = useTheme();
  const [userData, setUserData] = useState({
    displayName: "",
    email: ""
  });

  //styles
  const container = {
    width: "100vw",
    minHeight: "100vh",
    marginBottom: "2rem",
    paddingTop: theme.spacing(12),
    display: 'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  };
  const progressStyle = {
    marginTop:"3rem",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  };

  //mount
  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUserData(user);
      }
      else {
        router.push("/auth");
      }
    });
  }, []);

  function renderProgress() {
    return (
      <div style={progressStyle}>
        <CircularProgress/>
      </div>
    );
  }

  //render
  if(userData.displayName != ""){
    return (
      <Layout route={router.pathname} changeTheme={changeTheme}>
        <Container style={container}>
          <Typography variant='h3'>
              404
          </Typography>
          <Button color='primary' variant='contained' onClick={()=>router.push('/')} style={{
              marginTop:'1rem'
          }}>
              BACK TO HOME
          </Button>
        </Container>
      </Layout>
    );
  }
  else{
    return(
      <div style={{
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%, -50%)"
      }}>
        {renderProgress()}
      </div>
    );
  }
}
