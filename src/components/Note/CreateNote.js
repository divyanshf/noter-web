//ESSENTIALS
import { useState } from "react";
import Snackbar from "./Snackbar";

//MATERIAL-UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";

//FIREBASE
import fire from "../../config/fire-config";

const useStyles = makeStyles((theme) => ({
    card:{
        maxWidth: "500px",
        margin: "auto",
        border: `2px solid ${theme.palette.divider}`,
        borderRadius:'1rem',
        boxShadow:'none'
    }
}));

export default function CreateNote({ toggleMount }) {
    //initialize
    const classes = useStyles();
    const theme = useTheme();
    const user = fire.auth().currentUser;
    const [note, setNote] = useState({
        title: "",
        content: "",
    });
    const [open, setOpen] = useState(false);

    //styles
    const root = {
        maxWidth: "500px",
        margin: "auto"
    };
    const iconStyle = {
        fontSize: "1.2rem",
    };
    const cardsActions = {
        display: "flex",
        justifyContent: "flex-end",
    };

    //functions
    function handleNoteChange(event) {
        const { name, value } = event.target;
        setNote((prev) => {
            return { ...prev, [name]: value };
        });
    }
    function openPop() {
        setOpen(true);
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (note.title || note.content) {
            fire
                .firestore()
                .collection("users")
                .doc(user.email)
                .collection("notes")
                .add({
                    title: note.title,
                    content: note.content,
                    trash: false,
                    archive: false,
                    star:false,
                    edited: false,
                    timestamp: fire.firestore.Timestamp.now()
                })
                .then(() => {
                    setNote({
                        title: "",
                        content: "",
                    });
                    openPop();
                    toggleMount();
                });
        } 
        else 
            console.log("Not accepted!");
    }

    //render
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <div>
                        <InputBase
                            placeholder="Title"
                            fullWidth
                            rowsMax={2}
                            onChange={handleNoteChange}
                            name="title"
                            value={note.title}
                            autoComplete = "off"
                        />
                    </div>
                    <div>
                        <InputBase
                            placeholder="Note it down ..."
                            fullWidth
                            multiline
                            rowsMin={3}
                            onChange={handleNoteChange}
                            name="content"
                            value={note.content}
                        />
                    </div>
                </CardContent>
                <CardActions style={cardsActions}>
                    <Tooltip title="Done">
                        <IconButton onClick={handleSubmit}>
                            <DoneIcon style={iconStyle} />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
            <Snackbar open={open} message="Note created!" setOpen={setOpen} />
        </div>
    );
}
