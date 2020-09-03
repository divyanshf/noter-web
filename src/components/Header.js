//ESSENTIALS
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//MATERIAL-UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import { AccountCircle } from "@material-ui/icons";

//FIREBASE
import fire from "../config/fire-config";

const styles = makeStyles((theme) => ({

}));

export default function Header({
  changeMenuState,
  changeSettingState,
  openPopup,
  userData
}) {
  //initialize
  const router = useRouter();
  const theme = useTheme();

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

  //functions
  function toggleMenu() {
    changeMenuState();
  }
  function toggleSetting() {
    changeSettingState();
  }

  //render
  return (
    <AppBar color="inherit" position="fixed">
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

        <div style={freeSpace}></div>
        <Tooltip title="Profile Setting">
          <IconButton onClick={openPopup} style={{
            padding: "5px",
            marginLeft: theme.spacing(1),
          }}>
            <Avatar>
              {userData.displayName ? userData.displayName[0] : ""}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
