//ESSENTIALS
import { useRef, useEffect } from "react";

//MATERIAL-UI
import { Dialog } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export default function ProfilePop({
    handleClose,
    open,
    option,
    logout,
}) {
    //initialize
    const descriptionElementRef = useRef(null);
    const title = option == "logout" ? "Logout" : "Delete Account";
    const content =
        option == "logout"
            ? "Are you sure you want to log out?"
            : "Are you sure you want to delete your account?";

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
    function handleSubmit() {
        if (option == "logout") {
            logout();
        }
    }

    //render
    return (
        <Dialog open={open} onClose={handleClose} scroll="body">
            <DialogTitle id="scroll-dialog-title">
                <Typography>{title}</Typography>
            </DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
                <Typography>{content}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    NO
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    YES
                </Button>
            </DialogActions>
        </Dialog>
    );
}
