//ESSENTIALS
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

//MATERIAL-UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { FormGroup } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";

//FIREBASE
import fire from "../config/fire-config";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100vw",
        height: "100vh",
    },
    formGroup: {
        margin: "auto",
    },
    formContainer: {
        margin: "5rem",
    },
    margin: {
        flexGrow: 1,
        textAlign: "center",
    },
}));

export default function Auth({ changeTheme }) {
    //intialize
    const user = fire.auth().currentUser;
    const classes = useStyles();
    const theme = useTheme();
    const isLarge = useMediaQuery({
        query: "(min-device-width: 800px)",
    });
    const router = useRouter();
    const [login, setLogin] = useState(true);

    //styles
    const rootStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    };
    const questionText = {
        textAlign: "center",
    };
    const image = {
        width: "100%",
        height: "100vh"
    };

    //mount
    useEffect(() => {
        if (theme.palette.type == "light") {
            changeTheme();
        }
    }, []);

    //functions
    function changeType() {
        setLogin(!login);
    }

    //render functions
    function renderImage() {
        return (
            <Container>
                <img src="/SVG/book.svg" alt="Book" style={image} />
            </Container>
        );
    }

    //render
    return (
        <div style={rootStyle}>
            <Typography variant="h5" color="inherit" style={{
                position: "absolute",
                top: "1.5rem",
                left:"1.5rem",
                display: "flex"
            }} >
                <LocalLibraryIcon style={{
                    marginRight: "0.5rem",
                    fontSize: "2rem",
                    color: "#ffc93c",
                }}
                />
                    Noter
                </Typography>
            <Container style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <FormGroup row={false}>
                    {login ? <Login /> : <Register />}
                    <div style={questionText}>
                        <a
                            onClick={changeType}
                            style={{
                                color: "#40a8c4",
                                cursor: "pointer",
                            }}
                        >
                            {login ? "Not yet registered?" : "Already a user?"}
                        </a>
                    </div>
                </FormGroup>
            </Container>
            {isLarge ? renderImage() : null}
        </div>
    );
}
