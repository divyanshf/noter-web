//ESSENTIALS
import { useState } from "react";
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
import { ExitToApp } from "@material-ui/icons";

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
    const [openLogoutPop, setOpenLogout] = useState(false);

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
                <ListItem>
                    <Avatar style={center}>
                        {userData.displayName ? userData.displayName[0] : ""}
                    </Avatar>
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
