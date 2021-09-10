//ESSENTIALS
import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

//MATERIAL-UI
import { useTheme, makeStyles } from "@material-ui/core/styles"
import { Dialog, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { InputBase } from "@material-ui/core";
import { IconButton } from "@material-ui/core";

//FIREBASE
import fire from "../../config/fire-config";
import { Fullscreen } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root:{
        '& .MuiPaper-root':{
            borderRadius:'1rem',
            border:`2px solid ${theme.palette.divider}`,
            overflow:'hidden'
        },
    },
    title: {
        borderTopLeftRadius: '5rem',
        borderTopRightRadius: '5rem',
    },
    actions: {
        borderBottomLeftRadius: '1rem',
        borderBottomRightRadius: '1rem',
    }
}));

export default function NotePop({ handleClose, open, note, user, openSnack, toggleMount }) {
    //initialize
    const theme = useTheme()
    const classes = useStyles()
    const [details, setDetails] = useState({
        title: note.title,
        content: note.content,
        id: note.id,
    });
    const newDetails = {
        title: note.title,
        content: note.content,
        id:note.id
    }
    const isMobile = useMediaQuery({
        query: "(max-device-width: 425px)",
    });
    const titleStyle = {
        fontSize: '1.5rem'
    }
    const contentStyle = {
        fontSize: '1rem',
    }

    //functions
    function handleChange(event) {
        const { name, value } = event.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    }
    
    function handleSubmit() {
        if (details.title === newDetails.title && details.content === newDetails.content){
            handleClose();
        }
        else{
            fire
            .firestore()
            .collection("users")
            .doc(user.email)
            .collection("notes")
            .doc(details.id)
            .update({
                title: details.title,
                content: details.content,
                edited:true,
                timestamp:fire.firestore.Timestamp.now()
            })
            .then(() => {
                openSnack("Note updated!");
                toggleMount();
                handleClose();
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    function getDay(timestamp){
        if (timestamp.setHours(0,0,0,0) === new Date().setHours(0,0,0,0)){
            return 'Today';
        }
        return timestamp.toString().substr(4, 11)
    }

    function renderTimestamp() {
        var timestamp = new fire.firestore.Timestamp(note.timestamp.seconds, note.timestamp.nanoseconds).toDate()
        var time = timestamp.toString().substr(16, 5)
        var date = getDay(timestamp)
        if (date === 'Today'){
            return time
        }
        return date
    }

    //render
    return (
        <Dialog open={open} onClose={handleSubmit} scroll="paper" fullWidth className={classes.root}>
            <DialogTitle id="scroll-dialog-title" className={classes.title}>
                <InputBase
                    style={titleStyle}
                    placeholder="Title"
                    multiline
                    rowsMax={2}
                    name="title"
                    fullWidth
                    onChange={handleChange}
                    value={details.title}
                />
            </DialogTitle>
            <DialogContent>
                <InputBase
                    style={contentStyle}
                    placeholder="Note it down ..."
                    multiline
                    rowsMin={3}
                    name="content"
                    fullWidth
                    onChange={handleChange}
                    value={details.content}
                />
                <Typography style={{
                    width:'100%',
                    marginRight:'1rem',
                    color:`${theme.palette.text.disabled}`,
                    fontSize:'0.8rem',
                    textAlign:'right',
                }}>
                    {(note.edited ? "Edited " : "Created ") + renderTimestamp()}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button onClick={handleSubmit} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
