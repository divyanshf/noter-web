//ESSENTIALS
import { useState, useRef, useEffect } from "react";
import ProfilePop from "./ProfilePop";

//MATERIAL-UI
import { Popover } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Edit, ExitToApp } from "@material-ui/icons";
import fire from "../../config/fire-config";
import { storage } from "firebase";

const useStyles = makeStyles((theme) => ({

}));

export default function Setting({
    userData,
    anchor,
    open,
    closePopup,
    logout,
    // deleteAccount,
}) {
    //initialize
    const classes = useStyles();
    const ref = useRef(null)
    const [openLogoutPop, setOpenLogout] = useState(false);
    const [file, setFile] = useState(null);

    //styles
    const root = {
        padding: "2rem 3rem"
    };
    const center = {
        margin: "auto",
        width: "4rem",
        height: "4rem",
    };
    const name = {
        width: "100%",
        textAlign: "center",
        paddingBottom: "0"
    };
    const email = {
        width: "100%",
        textAlign: "center",
        color: "grey",
    };
    const noPadding = {
        paddingTop: "0"
    };
    const button = {
        margin:"1rem auto auto auto"
    };

    //functions
    const handleLogoutOpenPop = () => {
        setOpenLogout(true);
    };

    const handleLogoutClosePop = () => {
        setOpenLogout(false);
    };

    function uploadImage(){
        ref.current.click()
        console.log(ref.current.value);
    }

    function onFileChange(e){
        setFile(e.target.files[0])
    }

    useEffect(() => {
        if(file != null){
            console.log(file);
            onFileSubmit()
        }
    }, [file])

    function onFileSubmit(){
        var user = fire.auth().currentUser;
        var storageRef = fire.storage().ref(user.email + '/profile/' + file.name);
        var task = storageRef.put(file)
            .then(()=>{
                    setFile(null)
                    storageRef.getDownloadURL().then((url)=>{
                        user.updateProfile({
                            displayName: user.displayName,
                            photoURL: url
                        })
                    })
                })
    }

    // function renderEditButton(){
    //     return(
    //         <IconButton onClick={uploadImage} style={{
    //             position:"absolute",
    //             padding:"5px",
    //         }}>
    //             <Edit style={{
    //                 width:"1rem",
    //                 height:"1rem"
    //             }}/>
    //             <input ref={ref} id="image-input" type="file" name="image" onChange={onFileChange} style={{
    //                 display:"none"
    //             }} />
    //         </IconButton>
    //     );
    // }

    function renderAvatar(){
        if(fire.auth().currentUser == null || fire.auth().currentUser.photoURL == null){
            return(
                <IconButton onClick={uploadImage} style={{
                    padding:'0',
                    margin:'0'
                }}>
                    <Avatar style={center}>
                        {userData.displayName ? userData.displayName[0].toUpperCase() : ""}
                    </Avatar>
                    <input ref={ref} id="image-input" type="file" name="image" onChange={onFileChange} style={{
                        display:"none"
                    }} />
                </IconButton>
            );
        }
        else{
            return(
                <IconButton onClick={uploadImage} style={{
                    padding:'0',
                    margin:'0'
                }}>
                    <Avatar 
                        style={center}
                        src={fire.auth().currentUser.photoURL}>
                    </Avatar>
                    <input ref={ref} id="image-input" type="file" name="image" onChange={onFileChange} style={{
                        display:"none"
                    }} />
                </IconButton>
            )
        }
    }

    //render
    return (
        <Popover
            open={open}
            anchorEl={anchor}
            onClose={closePopup}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
        >
            <List style={root}>
                <ListItem style={{
                    display:'flex',
                    justifyContent:'center'
                }}>
                    {renderAvatar()}
                </ListItem>
                <ListItem>
                    <Typography variant="h6" style={name}> {userData.displayName ? userData.displayName : ""} </Typography>
                </ListItem>
                <ListItem style={noPadding}>
                    <Typography component="p" style={email}>{userData.email}</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                    <Button style={button} onClick={handleLogoutOpenPop}>
                        <ExitToApp />
                        <Typography component="p">
                            Logout
                        </Typography>
                    </Button>
                </ListItem>
            </List>
            <ProfilePop
                option="logout"
                logout={logout}
                handleClose={handleLogoutClosePop}
                open={openLogoutPop}
            />
        </Popover>
    );
}
