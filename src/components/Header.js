//ESSENTIALS
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { SearchContext } from "../context/searchContext";

//MATERIAL-UI
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import { Avatar, Input, InputBase } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import { AccountCircle } from "@material-ui/icons";
import SearchIcon from '@material-ui/icons/Search';

//FIREBASE
import fire from "../config/fire-config";

const styles = makeStyles((theme) => ({
  root:{
    boxShadow:"none",
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));

export default function Header({
  changeMenuState,
  changeSettingState,
  openPopup,
  userData,
  toggleMount
}) {
  //initialize
  const router = useRouter();
  const theme = useTheme();
  const classes = styles();
  const isMobile = useMediaQuery({
    query: "(max-device-width: 425px)",
  });
  const [search, setSearch] = useContext(SearchContext);

  //styles
  const anchorStyle = {
    display: "flex",
    alignItems: "center",
    width: "auto",
  };
  const freeSpace = {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  };
  const margin = {
    marginRight: theme.spacing(1),
  };
  const searchStyle = {
    position: 'relative',
    width: isMobile ? "100%" : "500px",
    border: "1px solid grey",
    borderRadius: theme.shape.borderRadius,
    display:'flex',
    justifyContent:'flex-start',
  };
  const searchIcon = {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const input = {
    width: "100%",
    transition: "0.3s ease",
  };

  //functions
  function toggleMenu() {
    changeMenuState();
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    toggleMount();
  }

  function renderHeadLink(){
    if(router.route !== "/search" || (router.route === "/search" && isMobile == false))
    return (
      <Typography
      variant="h5"
      color="inherit"
      style={margin}
    >
      <Link href="/">
        <a style={anchorStyle}>
          <LocalLibraryIcon
            style={{
              marginRight: "0.5rem",
              fontSize: "2rem",
              color: "#ffc93c",
            }}
          />
          Noter
        </a>
      </Link>
    </Typography>
    );
  }

  function renderSearchIcon() {
    return (
      <Link href="search" >
        <Tooltip title="Search">
          <IconButton style={{
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
          }}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Link>
    );
  }

  function renderSearchInput() {
    return (
      <div style={searchStyle}>
            <div style={searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search . . ."
              style={input}
              value = {search}
              onChange = {handleSearchChange}
            />
          </div>
    );
  }

  function renderProfile() {
    if(router.route !== "/search" || (router.route === "/search" && isMobile == false))
    return (
        <Tooltip title="Profile Setting">
          <IconButton onClick={openPopup} style={{
            padding: "5px",
            marginLeft: theme.spacing(1),
          }}>
            {renderAvatar()}
          </IconButton>
        </Tooltip>
    );
  }

  function renderAvatar(){
    if(fire.auth().currentUser.photoURL == null){
        return(
            <Avatar>
                {userData.displayName ? userData.displayName[0].toUpperCase() : ""}
            </Avatar>
        );
    }
    else{
        return(
            <Avatar 
                src={fire.auth().currentUser.photoURL} />
        )
    }
}

  //render
  return (
    <AppBar className={classes.root} color="inherit" position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
          style={margin}
        >
          <MenuIcon />
        </IconButton>

        {renderHeadLink()}
        
        {router.route !== "/search" ? <div style={freeSpace}></div> : isMobile ? null : <div style={freeSpace}></div>}
        {router.route === "/search" ? renderSearchInput() : renderSearchIcon()}
        {router.route === "/search" && !isMobile ? <div style={freeSpace}></div> : null}

        {renderProfile()}
      </Toolbar>
    </AppBar>
  );
}
