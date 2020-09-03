//ESSENTIALS
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Setting from "./Profile/Setting";
import Header from "./Header";
import Drawer from "./Drawer";

//FIREBASE
import fire from "../config/fire-config";

export default function FixedCotent({ changeTheme, route }) {
    //initialize
    const router = useRouter();
    const [drawerState, setDrawerState] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const user = fire.auth().currentUser;
    const [userData, setUserData] = useState({
        diplayName: user ? user.displayName : "",
        email: user ? user.email : "",
        photoURL: user ? user.photoURL : ""
    });

    //mount
    useEffect(() => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserData({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                });
            }
        });
    }, []);

    //functions
    function logout() {
        fire
            .auth()
            .signOut()
            .then(() => {
            });
        router.push("/auth");
    }

    function changeDrawerState() {
        setDrawerState((prev) => {
            return prev === false ? true : false;
        });
    }

    function changeSettingState() {
        setSetting((prev) => {
            return prev === false ? true : false;
        });
    }

    const openLabelOption = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeLabelOption = () => {
        setAnchorEl(null);
    };

    //render
    return (
        <div>
            <Header
                openPopup={openLabelOption}
                userData={userData}
                setUserData={setUserData}
                changeMenuState={changeDrawerState}
                changeSettingState={changeSettingState}
            />
            <Drawer
                route={route}
                changeTheme={changeTheme}
                state={drawerState}
                toggleDrawer={changeDrawerState}
            />
            <Setting
                userData={userData}
                logout={logout}
                anchor={anchorEl}
                open={open}
                closePopup={closeLabelOption}
            />
        </div>
    );
}
