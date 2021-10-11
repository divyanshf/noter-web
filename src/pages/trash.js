//ESSENTIAL
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Layout from "../components/Layout";
import Note from "../components/Note/Note";
import Snackbar from "../components/Note/Snackbar";

//MATERIAL-UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { CircularProgress } from '@material-ui/core';

//  MASONRY
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

//FIREBASE
import fire from "../config/fire-config";

const useStyles = makeStyles((theme) => ({
  girdContainer: {
    marginTop: theme.spacing(2),
  },
  createrContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

}));

export default function Trash({ changeTheme }) {
  //initialize
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [progress , setProgress] = useState(true);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [userData, setUserData] = useState({
    displayName:"",
    email: "",
    uid:""
  });
  const [data, setData] = useState([]);
  const [mount, setMount] = useState(0);
  const isMobile = useMediaQuery({
    query: "(max-device-width: 425px)",
  });
  const isTablet = useMediaQuery({
    query: "(device-width: 768px)",
  });

  //styles
  const help = {
    marginTop: "2rem",
    textAlign: "center",
    fontFamily: "Architects Daughter",
    color: "grey",
  };
  const head = {
    textAlign: "center",
    marginBottom: "1rem",
  };
  const container = {
    width: "100vw",
    minHeight: "100vh",
    marginBottom: "2rem",
    paddingTop: theme.spacing(10),
  };
  const progressStyle = {
    marginTop:"3rem",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  };

  //functions
  function checkNote(note) {
    if (note.trash) {
      return true;
    }
    return false;
  }

  function toggleMount() {
    setProgress(true)
    setMount(prev => (!prev));
  }

  function collectNotes(user) {
    fire
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("notes")
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

  //mount
  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUserData(user);
        collectNotes(user)
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
        No trash note!
      </Typography>
    );
  }

  function openSnackFunction(message) {
    setSnackMessage(message);
    setOpenSnack(true);
  };

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

  function renderProgress(){
    return (
      <div style={progressStyle}>
        <CircularProgress 
          style={{
            position:"absolute",
            left:"50%",
          }}  />
      </div>
    );
  }

  //render
  if(fire.auth().currentUser != null){
    return (
      <Layout route={router.pathname} changeTheme={changeTheme} toggleMount={toggleMount}>
        <Container style={container}>
          <Typography variant="h5" style={head}>
            Trash Notes
          </Typography>
          {progress ? renderProgress() : data.length ? renderNotes() : renderText() }
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
