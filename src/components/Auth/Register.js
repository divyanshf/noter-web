//ESSENTIALS
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//MATERIAL-UI
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

//FIREBASE
import fire from "../../config/fire-config";

const useStyles = makeStyles((theme) => ({
    input: {
        width: theme.spacing(25),
        margin: "auto",
        marginBottom: theme.spacing(2),
    },
}));

export default function Register() {
    //initialize
    const classes = useStyles();
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        name: "",
        pass: "",
        cpass: "",
    });
    const [passError, setPassError] = useState(false);
    const [cpassError, setCPassError] = useState(false);
    const [error, setError] = useState("");

    //functions
    function handleChange(event) {
        const { name, value } = event.target;
        setUser((prev) => {
            return { ...prev, [name]: value };
        });
        if (name == "pass") {
            if (value.length < 8) setPassError(true);
            else setPassError(false);
        }
    }

    function onValidate(event) {
        event.preventDefault();
        if (user.pass != user.cpass) {
            setCPassError(true);
        }
        else {
            onSubmit();
        }
    }

    function updateProfile(){
        fire
        .auth()
        .currentUser
        .updateProfile({
            displayName: user.name.toUpperCase(),
        })
        .then(() => {
            router.push("/");
        })
        .catch(err => {
            console.log(err);
        });
    }

    function onSubmit() {
        fire
            .auth()
            .createUserWithEmailAndPassword(user.username, user.pass)
            .then(() => {
                updateProfile();
            })
            .catch((err) => {
                console.log(err);
                if(err.code === "auth/email-already-in-use"){
                    setError("Already registered !!");
                }
            });
    }

    //render
    return (
        <form
            onSubmit={onValidate}
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <TextField
                onChange={handleChange}
                type="text"
                name="name"
                label="Name"
                className={classes.input}
                value={user.name}
                required
            />
            <TextField
                onChange={handleChange}
                helperText="Dummy emails work fine!"
                type="email"
                name="username"
                label="Email"
                className={classes.input}
                value={user.username}
                required
            />
            <TextField
                onChange={handleChange}
                error={passError}
                helperText={passError ? "Minimum 8 characters required" : ""}
                type="password"
                name="pass"
                label="Password"
                className={classes.input}
                value={user.pass}
                required
            />
            <TextField
                onChange={handleChange}
                error={cpassError}
                helperText={cpassError ? "Passwords dont match!" : ""}
                type="password"
                name="cpass"
                label="Confirm Password"
                className={classes.input}
                value={user.cpass}
                required
            />
            <Typography style={{
                color:"red",
                fontSize:"0.8rem"
            }}>
                {error}
            </Typography>
            <Button type="submit" className={classes.input} color="primary">
                Register
            </Button>
        </form>
    );
}
