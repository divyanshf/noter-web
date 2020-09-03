//ESSENTIALS
import Link from "next/link";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import NoteOptions from "./NoteOptions";
import NotePop from "./NotePop";

//MATERIAL-UI
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "90%",
        margin: "1rem auto",
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
    },
    chip: {
        fontSize: 12,
        margin: theme.spacing(0.5),
    },
}));

export default function Note({ note, user, toggleMount, openSnackFunction }) {
    //initialize
    const classes = useStyles();
    const isTablet = useMediaQuery({
        query: "(device-width: 768px)",
    });
    const isMobile = useMediaQuery({
        query: "(max-device-width: 425px)",
    });
    const [mouseOver, setMouseOver] = useState(
        isTablet || isMobile ? true : false
        );
    const [openPop, setOpen] = useState(false);

    //functions
    const handleOpenPop = () => {
        setOpen(true);
    };

    const handleClosePop = () => {
        setOpen(false);
    };

    function showOptions() {
        setMouseOver(true);
    }

    function hideOptions() {
        setMouseOver(false);
    }


    //render functions
    function renderTitle() {
        if (note.title.length < 20) return note.title;
        return note.title.slice(0, 20) + "...";
    }

    function renderContent() {
        if (note.content.length < 143) return note.content;
        return note.content.slice(0, 143) + "...";
    }

    //render
    return (
        <Card
            onMouseOver={showOptions}
            onMouseLeave={isMobile || isTablet ? showOptions : hideOptions}
            className={classes.root}
        >
            <CardActionArea>
                <CardContent onClick={handleOpenPop}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {renderTitle()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {renderContent()}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <NotePop
                user={user}
                note={note}
                handleClose={handleClosePop}
                open={openPop}
                openSnack={openSnackFunction}
            />
            <CardActions className={classes.actions}>
                <NoteOptions
                    user={user}
                    note={note}
                    mouseOver={mouseOver}
                    setMouseOver={setMouseOver}
                    toggleMount={toggleMount}
                    openSnack={openSnackFunction}
                />
            </CardActions>
        </Card>
    );
}
