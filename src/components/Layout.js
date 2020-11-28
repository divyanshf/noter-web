//ESSENTIALS
import FixedContent from "../components/FixedContent";

const Layout = ({ children, changeTheme, route, toggleMount }) => {
    //render
    return (
        <div>
            <FixedContent route={route} changeTheme={changeTheme} toggleMount={toggleMount} />
            {children}
        </div>
    );
};
export default Layout;
