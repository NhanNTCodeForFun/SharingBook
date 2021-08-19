import React,{ useState} from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Box,
  Grid,
  InputBase,
  IconButton,
  Badge,
  fade,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import { AiFillProfile } from "react-icons/ai";
import {MdSearch, MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { MyAvatar } from '../assets/img';
import { IconContext } from 'react-icons';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    background: "linear-gradient(45deg, #9d6838 10%, #64412a 90%)",
    transform: 'translateZ(0)'
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: '35ch'
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  ava: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  itemText: {
    marginLeft: '0.8rem',
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Header({ openSideMenu, setOpenSideMenu }) {  //sidebar, setSidebar
  const styles = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);




  //Mobile
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <GiHamburgerMenu style={{ color: "white" }} />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar src="/src/assets/img/ava.png" className={styles.ava} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={styles.grow}>
      <div className={styles.sectionDesktop}>
        <AppBar position="fixed" className={styles.root} elevation={10}>
          <Toolbar variant="dense">
            <Box display="flex" flexDirection="row" width="100%">
              <Box style={{ width: '250px', display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
                {/* <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
              </IconButton> */}
                {!openSideMenu ? (
                  <Link to="#">
                    <GiHamburgerMenu style={{ fontSize: '1.5rem', marginRight: '0.8rem' }} onClick={() => setOpenSideMenu(!openSideMenu)} />
                  </Link>
                ) : (
                  <Link to="#">
                    < MdClose style={{ fontSize: '1.8rem', marginRight: '0.8rem' }} onClick={() => setOpenSideMenu(!openSideMenu)} />
                  </Link>
                )}

                <Typography variant="h5" style={{ fontWeight: 600, fontFamily: 'Merienda', marginLeft: '4rem' }}>ShareBook</Typography>
              </Box>
              <Box flexGrow={1}>
                <Grid alignItems="center" container>
                 
                  <Grid item sm></Grid>
  
                  <Grid item>
                    <IconButton
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                      <Avatar src={MyAvatar} className={styles.ava} />
                    </IconButton>

                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      open={open}
                      onClose={() => setAnchorEl(null)}
                    >
                      <IconContext.Provider value={{ color: '#64412a' }}>

                      <MenuItem  onClick={() => setAnchorEl(null)}>
                        <AiFillProfile />
                        <Typography m="2rem" className={styles.itemText}> My profile </Typography>
                      </MenuItem>
                      <Link to="/" style={{ textDecoration: 'none' }}>
                        <MenuItem style={{ textDecoration: 'none', color:'black'}}onClick={() => setAnchorEl(null)}>
                          <BiLogOut />
                          <Typography className={styles.itemText}>Logout</Typography>
                        </MenuItem>
                      </Link>
                      </IconContext.Provider>
                    </Menu>
                  </Grid>
                </Grid>
              </Box>
            </Box>


          </Toolbar>
        </AppBar>
      </div>

      {renderMobileMenu}
    </div>
  );
}

export default Header;
