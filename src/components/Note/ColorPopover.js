//ESSENTIALS
import { useState, useRef, useEffect } from "react";

//MATERIAL-UI
import { Box, Popover } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Edit, ExitToApp } from "@material-ui/icons";
import fire from "../../config/fire-config";
import { green } from "@material-ui/core/colors";
import {colors} from '../Colors/Colors'
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({

}));

export default function ColorPopover({
    anchor,
    open,
    closePopup,
    changeColor,
    current
}) {
    //initialize
    const theme = useTheme()
    const ref = useRef(null)
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

    const renderColor = (color, index) => {
        const isChecked = (current === undefined && color.color === 'transparent') || current === color.color
        return(
            <div key={index} onClick={() => changeColor(color)} style={{
                width: '30px',
                height: '30px',
                margin: '5px',
                background:`${theme.palette.type === 'dark' ? color.dark : color.light}`,
                border:`1px solid ${theme.palette.text.primary}`,
                borderRadius: '50%',
                // transform: `scale(${isChecked ? 1.3 : 1})`,
                cursor: 'pointer'
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: `${isChecked ? 'flex' : 'none'}`,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <CheckIcon style={{
                        width: '1rem'
                    }} />
                </div>
            </div>
        );
    }

    //render
    return (
        <Popover
            open={open}
            anchorEl={anchor}
            onClose={closePopup}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
        >
            <div 
                style={{
                    display:'grid',
                    gridTemplateColumns:'auto auto auto auto',
                    padding: '0.5rem'
                }}>
                {colors.map((c, index) => renderColor(c, index))}
            </div>
        </Popover>
    );
}
