//ESSENTIALS
import FixedContent from "../components/FixedContent";

const Layout = ({ children, changeTheme, route }) => {
    //render
    return (
        <div>
            <FixedContent route={route} changeTheme={changeTheme} />
            {children}
        </div>
    );
};
export default Layout;
