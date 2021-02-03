//ESSENTIALS
import FixedContent from "../components/FixedContent";

//MATERIAL-UI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    
}));

const Layout = ({ children, changeTheme, route, toggleMount }) => {
    const classes = useStyles();

    //render
    return (
        <div>
            <FixedContent route={route} changeTheme={changeTheme} toggleMount={toggleMount} />
            {children}
        </div>
    );
};
export default Layout;
