import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImBooks, ImUsers } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import Avatar from "@material-ui/core/Avatar";
import { MdClose } from "react-icons/md";
import { IconContext } from "react-icons";
import Divider from '@material-ui/core/Divider';
import { SidebarItems } from "./SidebarItems";
import Header from "./Header";
import { LogoShareBook } from "../assets/img";
import { makeStyles } from "@material-ui/core";
import "./SideBar.css";

const useStyles = makeStyles((theme) => ({
    appMain: {
        paddingLeft: "275px",
        width: "100%",
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        margin: "auto",
        marginBottom: "30px"
    },

}));

function Layout() {
    // const styles = useStyles()
    const [sidebar, setSidebar] = useState(true);
    const styles = useStyles();
    return (

        <IconContext.Provider value={{ color: "#fff" }}>
            {/* <div className="navbar">
          <Link to="#" className="menu-bars">
            <GiHamburgerMenu style={{ fontSize: '1.5rem' }} onClick={() => setSidebar(!sidebar)} />
          </Link>
        </div> */}
            <div className="navbar">
                <Header sidebar={sidebar} setSidebar={setSidebar} />
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>

                <ul className="nav-menu-items">
                    {/** onClick={() => setSidebar(!sidebar)} */}
                    <li >
                        <Avatar

                            align="center"
                            justifyContent="center"
                            display="flex"
                            alt=""
                            src={LogoShareBook}
                            className={styles.large}
                        />
                    </li>

                    {SidebarItems.map((item, index) => (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                            <Divider />
                        </li>
                    ))}
                </ul>
            </nav>
        </IconContext.Provider>
    );
}

export default Layout;