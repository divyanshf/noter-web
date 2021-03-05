//ESSENTIALS
import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

//MATERIAL-UI
import { useTheme } from "@material-ui/core/styles"
import { Dialog } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { InputBase } from "@material-ui/core";
import { IconButton } from "@material-ui/core";

//FIREBASE
import fire from "../../config/fire-config";

export default function NotePop({ handleClose, open, note, user, openSnack, toggleMount }) {
    //initialize
    const theme = useTheme()
    const [details, setDetails] = useState({
        title: note.title,
        content: note.content,
        id: note.id,
    });
    const isMobile = useMediaQuery({
        query: "(max-device-width: 425px)",
    });
    const descriptionElementRef = useRef(null);

    const contentStyle = {
        fontSize: 13,
        color: theme.palette.grey
    }

    //mount
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    //functions
    function handleChange(event) {
        const { name, value } = event.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    }
    
    function handleSubmit() {
        fire
            .firestore()
            .collection("users")
            .doc(user.email)
            .collection("notes")
            .doc(details.id)
            .update({
                title: details.title,
                content: details.content,
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

    //render
    return (
        <Dialog open={open} onClose={handleClose} scroll="body" fullWidth>
            <DialogTitle id="scroll-dialog-title">
                <InputBase
                    placeholder="Title"
                    multiline
                    rowsMax={2}
                    name="title"
                    fullWidth
                    onChange={handleChange}
                    value={details.title}
                />
            </DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
