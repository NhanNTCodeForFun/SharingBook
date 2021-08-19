import React from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Avatar } from '@material-ui/core';
import { IconContext } from 'react-icons';
import { SidebarItems } from './SidebarItems';
import { LogoShareBook } from "../assets/img";
import Header from './Header';
import './SideBar.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        background: "linear-gradient(45deg, #9d6838 10%, #64412a 90%)",
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        paddingTop: '70px',
    },
    drawerClose: {
        background: "linear-gradient(45deg, #9d6838 10%, #64412a 90%)",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
        paddingTop: '75px'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    logo: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        margin: "auto",
        marginBottom: "30px"
    },
    logoNone: {
        display: 'none'
    },
    button: {
        // main styles,
        "&:focus": {
            backgroundColor: "#64412a",
            color: "white"
        }
      }

}));

function SideMenu({ children }) {
    const classes = useStyles();
    const [openSideMenu, setOpenSideMenu] = React.useState(false);


    return (
        <div className={classes.root}>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div style={{ zIndex: 2 }}>
                    <Header openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} />
                </div>

                <div style={{ zIndex: 1 }}>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: openSideMenu,
                            [classes.drawerClose]: !openSideMenu,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: openSideMenu,
                                [classes.drawerClose]: !openSideMenu,
                            }),
                        }}
                    >
                        <List>
                            <ListItem>
                                <Avatar
                                    align="center"
                                    justifyContent="center"
                                    display="flex"
                                    alt=""
                                    src={LogoShareBook}
                                    className={openSideMenu ? classes.logo : classes.logoNone}
                                />
                            </ListItem>

                            {SidebarItems.map((item, index) => (
                                <Link to={item.path} className="nav-text nav-text-a">
                                    <ListItem className={classes.button} autoFocus={true} tabIndex={2} button key={index}>
                                        <ListItemIcon  style={{ fontSize: '1.4rem', paddingLeft: '0.4rem' }}>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.title} />
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Drawer>
                </div>
            </IconContext.Provider>
            <main className={classes.content}>
                {/* <div className={classes.toolbar} /> */}
                {children}
            </main>
        </div>
    );
}

export default SideMenu;

//=======================================================================

// const SideMenu = () => {
//     return (
//         <IconContext.Provider value={{ color: '#fff' }}>
//             <Drawer
//                 variant={
//                     window.matchMedia('(max-width: 960px)').matches
//                         ? 'temporary'
//                         : 'permanent'
//                 }
//                 anchor="left"
//                 open={openSideMenu}
//                 onClose={setOpenSideMenu}
//                 classes={{
//                     paper: clsx(
//                         classes.drawerPaper,
//                         !openSideMenu && classes.drawerPaperClose
//                     ),
//                 }}
//             >
//                 <div className={classes.drawerHeader}>
//                     <img
//                         className={classes.majorImg}
//                         alt="major-logo"
//                         onClick={() => {
//                             history.push(defaultRoutes[user.roles[0]].route)
//                         }}
//                     />
//                 </div>
//                 <List component="nav">
//                     {menuItems.map((item, index) => {
//                         return (
//                             <ListItem
//                                 className={classes.menuItem}
//                                 key={index}
//                                 selected={item.path === selectedIndex}
//                                 component={Link}
//                                 to={`${url}/${item.path}`}
//                                 onClick={() =>
//                                     handleSelectedItem(item.path)
//                                 }
//                             >
//                                 <Tooltip title={item?.title}>
//                                     <ListItemIcon className={classes.menuIcon}>
//                                         {item.icon}
//                                     </ListItemIcon>
//                                 </Tooltip>
//                                 <ListItemText
//                                     disableTypography
//                                     primary={
//                                         <Typography
//                                             variant="h6"
//                                             className={classes.menuText}
//                                         >
//                                             {item?.title}
//                                         </Typography>
//                                     }
//                                 />
//                             </ListItem>
//                         )
//                     })}
//                 </List>
//                 <div className={classes.drawerFooter}>
//                     <Tooltip title={openSideMenu ? 'Collapse' : 'Expand'}>
//                         <IconButton
//                             onClick={setOpenSideMenu}
//                             className={classes.chevron}
//                         >
//                             <MdChevronLeft />
//                         </IconButton>

//                     </Tooltip>
//                 </div>
//             </Drawer>
//         </IconContext.Provider>
//     );
// }