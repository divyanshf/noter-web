//ESSENTIALS
import { useState, useEffect } from "react";
import Link from "next/link";

//MATERIAL-UI
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import { yellow, orange } from '@material-ui/core/colors';
import { Button, SwipeableDrawer } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { List } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Switch } from "@material-ui/core";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import AndroidIcon from '@material-ui/icons/Android';
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NoteIcon from '@material-ui/icons/Note';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import StarIcon from '@material-ui/icons/Star';

const styles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    list: {
        width: 250
    },
    fullList: {
        width: "auto",
    },
    listItem: {
        borderTopRightRadius: theme.spacing(3),
        borderBottomRightRadius: theme.spacing(3),
        marginBottom: theme.spacing(0.5),
        marginTop: theme.spacing(0.5)
    },
}));

const ThemeSwitch = withStyles({
    switchBase: {
        color: orange[900],
        "&$checked": {
            color: yellow[500],
        },
        "&$track": {
            backgroundColor: orange[900],
        },
        "&$checked + $track": {
            backgroundColor: yellow[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default function MenuDrawer({ state, toggleDrawer, changeTheme, route }) {

    //initialize
    const classes = styles();
    const theme = useTheme();
    const [checkState, setCheckState] = useState(theme.palette.type == "dark" ? true : false);
    const [routeChecker, setRouteChecker] = useState(route);
    const [linkHover, setLinkHover] = useState(false);
    const listItems = [
        {
            text: "Notes",
            icon: <NoteIcon />,
            link: "/"
        },
        {
            text: "Starred",
            icon: <StarIcon />,
            link: "starred"
        },
        {
            text: "Archives",
            icon: <ArchiveIcon />,
            link: "archives"
        },
        {
            text: "Trash",
            icon: <DeleteSharpIcon />,
            link: "trash"
        },
    ];

    //styles
    const drawerBottom = {
        position: "absolute",
        bottom: "10px",
        width:"100%",
        display: "flex",
        justifyContent:"center",
        alignItems:"center"
    };
    const anchor = {
        margin:"auto"
    };
    const linkStyle={
        color: "skyblue",
        textDecoration: linkHover ? "underline" : "none"
    }


    //functions
    function removeSlash(route) {
        if (route)
            return route.slice(1);
    }
    function handleThemeChange() {
        setCheckState(!checkState);
        changeTheme();
    }

    //mount
    useEffect(() => {
        setRouteChecker(route == "/" ? route : removeSlash(route));
    }, []);

    //render functions
    function renderList(element, index) {
        return (
            <Link key={index} href={element.link} >
                <a>
                    <ListItem className={classes.listItem} selected={routeChecker == element.link ? true : false} button key={index}>
                        <ListItemIcon>
                            {element.icon}
                        </ListItemIcon>
                        <ListItemText primary={element.text} />
                    </ListItem>
                </a>
            </Link>
        );
    }

    //render
    return (
        <SwipeableDrawer
            open={state}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
            className={classes.root}
        >
            <List className={classes.list}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0.5rem 0",
                    }}
                >
                    <ThemeSwitch
                        checked={checkState}
                        onChange={handleThemeChange}
                        name="theme"
                    />
                    <Typography variant="h6" color="primary">
                        {theme.palette.type == "dark" ? <NightsStayIcon /> : <WbSunnyIcon />}
                    </Typography>
                </div>
                <Divider />
                {listItems.map(renderList)}
                <Divider />
                <Link href='https://i.diawi.com/N9m3eH'>
                    <a target='_blank'>
                        <ListItem button>
                            <ListItemIcon>
                                <AndroidIcon />
                            </ListItemIcon>
                            <ListItemText primary='Download' />
                        </ListItem>
                    </a>
                </Link>
            </List>
            <div style={drawerBottom}>
                <Link href="https://github.com/DivyanshFalodiya/Noter">
                    <a target='_blank' style={anchor}>
                        <p style={linkStyle} onMouseEnter={()=>{setLinkHover(true)}} onMouseLeave={()=>{setLinkHover(false)}} >Open-Source</p>
                    </a>
                </Link>
            </div>
        </SwipeableDrawer>
    );
}
