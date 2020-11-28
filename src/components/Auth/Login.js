//ESSENTIALS
import { useState } from "react";
import { useRouter } from "next/router";

//MATERIAL-UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Button } from "@material-ui/core";

//FIREBASE
import fire from "../../config/fire-config";

const useStyles = makeStyles((theme) => ({
    formControl: {
        color: "grey"
    }
}));

export default function Login() {
    //initialize
    const classes = useStyles();
    const router = useRouter();
    const theme = useTheme();
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    //styles
    const input = {
        width: theme.spacing(25),
        margin: "auto",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: "flex",
        justifyContent: "center",
    };

    //functions
    function handleChange(event) {
        const { name, value } = event.target;
        if (name == "email") {
            setUserName(value);
        } else {
            setPass(value);
        }
    }

    function onSubmit(event) {
        event.preventDefault();
        fire
            .auth()
            .setPersistence(fire.auth.Auth.Persistence.SESSION)
            .then(() => {
                return fire
                    .auth()
                    .signInWithEmailAndPassword(userName, pass)
                    .then(() => {
                        setUserName("");
                        setPass("");
                        router.push("/");
                    });
            })
            .catch((err) => {
                console.log(err.code);
                if(err.code === "auth/user-not-found"){
                    setError("User Not Found");
                }
            });
    }

    //render
    return (
        <form
            onSubmit={onSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div style={input}>
                <TextField
                    onChange={handleChange}
                    type="email"
                    name="email"
                    autoComplete="off"
                    label="Email"
                    value={userName}
                />
            </div>
            <div style={input}>
                <TextField
                    onChange={handleChange}
                    type="password"
                    name="pass"
                    label="Password"
                    value={pass}
                />
            </div>
            <Typography style={{
                color:"red",
                fontSize:"0.8rem"
            }}>
                {error}
            </Typography>
            <div style={input}>
                <Button type="submit" color="primary">
                    Login
                </Button>
            </div>
        </form>
    );
}
