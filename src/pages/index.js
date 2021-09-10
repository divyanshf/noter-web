//ESSENTIALS
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Layout from "../components/Layout";
import Note from "../components/Note/Note";
import CreateNote from "../components/Note/CreateNote";
import Snackbar from "../components/Note/Snackbar";

//MATERIAL-UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { CircularProgress } from '@material-ui/core';

//  MASONRY
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

//FIREBASE
import fire from "../config/fire-config";

const useStyles = makeStyles((theme) => ({

}));

export default function Home({ changeTheme }) {
  //initialize
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const [userData, setUserData] = useState({
    displayName: "",
    email: ""
  });
  const [progress, setProgress] = useState(true);
  const [data, setData] = useState([]);
  const [mount, setMount] = useState(0);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const isMobile = useMediaQuery({
    query: "(max-device-width: 425px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-device-width: 768px)",
  });
  const isLarge = useMediaQuery({
    query: "(min-device-width: 800px)",
  });

  //styles
  const container = {
    width: "100vw",
    minHeight: "100vh",
    marginBottom: "2rem",
    paddingTop: theme.spacing(12),
  };
  const help = {
    marginTop: theme.spacing(10),
    textAlign: "center",
    fontFamily: "Architects Daughter",
    color: "grey",
  };
  const createrContainer = {
    marginBottom: theme.spacing(2)
  };
  const gridContainer = {
    marginTop: theme.spacing(2),
  };
  const progressStyle = {
    marginTop:"3rem",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  };

  //functions
  function checkNote(note) {
    if (!note.trash && !note.archive) {
      return true;
    }
    return false;
  }

  function toggleMount() {
    setMount(prev => (!prev));
  }

  function collectNotes(user) {
    fire
      .firestore()
      .collection("users")
      .doc(user.email)
      .collection("notes")
      .orderBy("timestamp", "desc")
      .get()
      .then((snap) => {
        const notes = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(notes.filter(checkNote));
        setProgress(false);
      });
  }

  function openSnackFunction(message) {
    setSnackMessage(message);
    setOpenSnack(true);
  };

  //mount
  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUserData(user);
        collectNotes(user);
      }
      else {
        router.push("/auth");
      }
    });
  }, [mount]);

  //render functions
  function renderText() {
    return (
      <Typography variant="h5" style={help}>
        Write your first note now!
      </Typography>
    );
  }

  function renderNote(note) {
    return (
        <Note key={note.id} openSnackFunction={openSnackFunction} toggleMount={toggleMount} user={userData} note={note} />
    );
  }

  function renderNotes() {
    return (
      <ResponsiveMasonry
        columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}
    >
        <Masonry>
          {data.map(renderNote)}
        </Masonry>
      </ResponsiveMasonry>
    );
  }

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
          <div style={createrContainer}>
            <CreateNote toggleMount={toggleMount} />
          </div>
          {progress ? renderProgress() : data.length ? renderNotes() : renderText()}
          <Snackbar open={openSnack} message={snackMessage} setOpen={setOpenSnack} />
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
