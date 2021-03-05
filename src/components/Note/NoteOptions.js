//ESSENTIALS
import { useState } from "react";
import { useRouter } from "next/router";

//MATERIAL-UI
import { IconButton } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveSharpIcon from "@material-ui/icons/UnarchiveSharp";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

//FIREBASE
import fire from "../../config/fire-config";

export default function NoteOptions({ mouseOver, setMouseOver, note, user, toggleMount, openSnack }) {
    //initialize
    const router = useRouter();
    const trash = !note.trash;
    const archive = !note.archive;
    const star = !note.star;

    //styles
    const toggleOptionsStyle = {
        opacity: `${mouseOver ? "100" : "0"}`,
        // transition: "0.3s ease",
    };

    const iconStyle = {
        fontSize: "1.2rem",
    };

    //functions
    function showOptions() {
        setMouseOver(true);
    }

    function hideOptions() {
        setMouseOver(false);
    }

    function deleteNote() {
        fire
            .firestore()
            .collection("users")
            .doc(user.email)
            .collection("notes")
            .doc(note.id)
            .update({
                trash: trash,
            })
            .then(() => {
                openSnack(`${note.trash ? "Note restored!" : "Note trashed!"}`);
                toggleMount();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function deleteNotePermanent() {
        fire
            .firestore()
            .collection("users")
            .doc(user.email)
            .collection("notes")
            .doc(note.id)
            .delete()
            .then(() => {
                openSnack("Note deleted!");
                toggleMount();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function archiveNote() {
        fire
            .firestore()
            .collection("users")
            .doc(user.email)
            .collection("notes")
            .doc(note.id)
            .update({
                archive: archive,
            })
            .then(() => {
                openSnack(`${note.archive ? "Note unarchived!" : "Note archived!"}`);
                toggleMount();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function starNote() {
        fire
            .firestore()
            .collection("users")
            .doc(user.email)
            .collection("notes")
            .doc(note.id)
            .update({
                star: star,
            })
            .then(() => {
                openSnack(`${note.star ? "Note Unstarred!" : "Note starred!"}`);
                toggleMount();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //render functions
    function renderPermanentDelete() {
        return (
            <Tooltip title="Delete Permanently">
                <IconButton onClick={deleteNotePermanent} style={toggleOptionsStyle}>
                    <DeleteIcon style={iconStyle} />
                </IconButton>
            </Tooltip>
        );
    }

    //render
    return (
        <div style={{
            transition:"0.5s ease"
        }}>
            <Tooltip title={note.star ? "Unstar" : "Star"}>
                <IconButton onClick={starNote} style={toggleOptionsStyle}>
                    {note.star ? (
                        <StarIcon style={iconStyle} />
                    ) : (
                            <StarBorderIcon style={iconStyle} />
                        )}
                </IconButton>
            </Tooltip>
            <Tooltip title={note.archive ? "Unarchive" : "Archive"}>
                <IconButton onClick={archiveNote} style={toggleOptionsStyle}>
                    {note.archive ? (
                        <UnarchiveSharpIcon style={iconStyle} />
                    ) : (
                            <ArchiveIcon style={iconStyle} />
                        )}
                </IconButton>
            </Tooltip>
            <Tooltip title={note.trash ? "Restore" : "Delete"}>
                <IconButton onClick={deleteNote} style={toggleOptionsStyle}>
                    {note.trash ? (
                        <RestoreFromTrashIcon style={iconStyle} />
                    ) : (
                            <DeleteIcon style={iconStyle} />
                        )}
                </IconButton>
            </Tooltip>
            {note.trash ? renderPermanentDelete() : null}
        </div>
    );
}
