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
import { ColorLens } from "@material-ui/icons";

export default function NoteOptions({ mouseOver, setMouseOver, note, user, toggleMount, openSnack, openColorPop }) {
    //initialize
    const router = useRouter();
    const trash = !note.trash;
    const archive = !note.archive;
    const star = !note.star;

    //styles
    const toggleOptionsStyle = {
        display: `${mouseOver ? "block" : "none"}`,
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
            .doc(user.uid)
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
            .doc(user.uid)
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
            .doc(user.uid)
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
            .doc(user.uid)
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
            <div style={{
                margin:'0.5rem',
                cursor:'pointer'
            }}>
                <Tooltip title="Delete Permanently" onClick={deleteNotePermanent}>
                    <DeleteIcon style={iconStyle} />
                </Tooltip>
            </div>
        );
    }
    function renderStarOption() {
        return (
            <div style={{
                margin:'0.5rem',
                cursor:'pointer'
            }}>
                <Tooltip title={note.star ? "Unstar" : "Star"} onClick={starNote}>
                    {note.star ? (
                        <StarIcon style={iconStyle} />
                    ) : (
                            <StarBorderIcon style={iconStyle} />
                        )}
                </Tooltip>
            </div>
        );
    }
    function renderArchiveOption() {
        return (
            <div style={{
                margin:'0.5rem',
                cursor:'pointer'
            }}>
                <Tooltip title={note.archive ? "Unarchive" : "Archive"} onClick={archiveNote}>
                    {note.archive ? (
                        <UnarchiveSharpIcon style={iconStyle} />
                    ) : (
                            <ArchiveIcon style={iconStyle} />
                        )}
                </Tooltip>
            </div>
        );
    }

    //render
    return (
        <div style={{
            transition:"0.5s ease",
            opacity: `${mouseOver ? "100" : "0"}`,
            display:'flex',
        }}>
            <div style={{
                margin:'0.5rem',
                cursor:'pointer'
            }}>
                <Tooltip title="Color" onClick={openColorPop}>
                    <ColorLens style={iconStyle} />
                </Tooltip>
            </div>

            {!note.trash ? renderStarOption() : null}
            {!note.trash ? renderArchiveOption() : null}

            <div style={{
                margin:'0.5rem',
                cursor:'pointer'
            }}>
                <Tooltip title={note.trash ? "Restore" : "Delete"} onClick={deleteNote}>
                    {note.trash ? (
                        <RestoreFromTrashIcon style={iconStyle} />
                    ) : (
                            <DeleteIcon style={iconStyle} />
                        )}
                </Tooltip>
            </div>
            
            {note.trash ? renderPermanentDelete() : null}
        </div>
    );
}
