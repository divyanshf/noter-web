//ESSENTIALS
import Link from "next/link";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import NoteOptions from "./NoteOptions";
import NotePop from "./NotePop";

//MATERIAL-UI
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";
import { Card, InputBase } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "90%",
        boxShadow: "none",
        margin: "1rem auto",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '1rem'
    },
    actionArea: {
      "&:hover $focusHighlight": {
        opacity: 0
      }
    },
    focusHighlight: {},
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        transition: "0.5s ease"
    },
    chip: {
        fontSize: 12,
        margin: theme.spacing(0.5),
    },
    content:{
        width: '100%',
        height:'100%',
        fontSize: 13,
        whiteSpace:'pre-wrap'
    }
}));

export default function Note({ note, user, toggleMount, openSnackFunction }) {
    //initialize
    const classes = useStyles();
    const theme = useTheme();
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
        setOpen(true)
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
        if (note.title.length < 25) return note.title;
        return note.title.slice(0, 25) + "...";
    }

    function renderContent() {
        if (note.content.length < 140) return note.content;
        return note.content.slice(0, 140) + "...";
    }

    function renderInputBase(){
        return (
            <Typography className={classes.content} variant="subtitle1" component='p'>
                {renderContent()}
            </Typography>
        );
    }

    function renderNoteOptions(){
        return(
            <NoteOptions
                user={user}
                note={note}
                mouseOver={mouseOver}
                setMouseOver={setMouseOver}
                toggleMount={toggleMount}
                openSnack={openSnackFunction}
            />
        );
    }

    //render
    return (
        <Card
            onMouseOver={showOptions}
            onMouseLeave={isMobile || isTablet ? showOptions : hideOptions}
            className={classes.root}
        >
            <CardActionArea disableRipple disableTouchRipple classes={{
                root: classes.actionArea,
                focusHighlight: classes.focusHighlight
            }}>
                <CardContent onClick={handleOpenPop}>
                    <Typography gutterBottom variant="heading1" component="h3" style={{
                        marginBottom:`${renderContent() ? '1rem' : '0'}`
                    }}>
                        {renderTitle()}
                    </Typography>
                    {renderContent() ? renderInputBase() : null}
                </CardContent>
            </CardActionArea>
            <NotePop
                user={user}
                note={note}
                handleClose={handleClosePop}
                open={openPop}
                openSnack={openSnackFunction}
                toggleMount = {toggleMount}
            />
            <CardActions className={classes.actions}>
                {renderNoteOptions()}
            </CardActions>
        </Card>
    );
}
