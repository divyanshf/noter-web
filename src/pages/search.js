//ESSENTIALS
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { SearchContext } from "../context/searchContext";
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

export default function Search({ changeTheme }) {
  //initialize
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    uid:""
  });
  const [progress, setProgress] = useState(true);
  const [data, setData] = useState([]);
  const [mount, setMount] = useState(0);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [search, setSearch] = useContext(SearchContext);

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
  const head = {
    textAlign: "center",
    marginBottom: "1rem",
  };

  //functions
  function toggleMount() {
    setProgress(true);
    setMount(prev => (!prev));
  }

  async function collectNotes(id) {
    if (search) {
      let res = await fetch(`/api/users/${id}/notes/search/${search}/`, { method: 'GET' })
      res = await res.json();
      return res;
    }
    return {error: 'Empty search'}
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
        collectNotes(user.uid).then(res => {
          if(!res.error)
            setData(res.notes);
          else console.log(res.error);
          setProgress(false);
        })
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
          {search === "" ? "Try a search" : "Couldn't find anything"}
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
        <CircularProgress
          style={{
            position: "absolute",
            left: "50%",
          }} />
      </div>
    );
  }

  //render
  if(fire.auth().currentUser != null){
    return (
      <Layout route={router.pathname} changeTheme={changeTheme} toggleMount={toggleMount}>
        <Container style={container}>
          <Typography variant="h5" style={head}>
            Search Notes
          </Typography>
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
