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
import ColorPopover from "./ColorPopover";
import {colors, getColor} from '../Colors/Colors'

//FIREBASE
import fire from "../../config/fire-config";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "90%",
        boxShadow: "none",
        margin: "1rem auto",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '1rem',
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
    const [noteColor, setNoteColor] = useState(getColor(note.color))

    //  Color popover
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
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

    const openColorPop = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeColorPop = () => {
        setAnchorEl(null);
    };

    const changeColor = (color) => {
        fire
            .firestore()
            .collection("users")
            .doc(user.uid)
            .collection("notes")
            .doc(note.id)
            .update({
                color: color.color,
            })
            .then(() => {
                toggleMount();
                setNoteColor(color)
            })
            .catch((err) => {
                console.log(err);
            });
    }


    //render functions
    function renderTitle() {
        if (note.title.length < 25) return note.title;
        return note.title.slice(0, 25) + "...";
    }

    function renderContent() {
        if (note.content.length < 240) return note.content;
        return note.content.slice(0, 240) + "...";
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
                openColorPop={openColorPop}
            />
        );
    }

    //render
    return (
        <Card
            onMouseOver={showOptions}
            onMouseLeave={isMobile || isTablet ? showOptions : hideOptions}
            className={classes.root}
            style={{
                backgroundColor:`${theme.palette.type === 'dark' ? noteColor.dark : noteColor.light}`
            }}
        >
            <CardActionArea disableRipple disableTouchRipple classes={{
                root: classes.actionArea,
                focusHighlight: classes.focusHighlight
            }}>
                <CardContent onClick={handleOpenPop}>
                    <Typography gutterBottom variant="h6" style={{
                        marginBottom:`${renderContent() ? '1rem' : '0'}`,
                        fontWeight: '600'
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
            <ColorPopover
                anchor={anchorEl}
                open={open}
                closePopup={closeColorPop}
                current={note.color}
                changeColor={changeColor}
            />
        </Card>
    );
}
