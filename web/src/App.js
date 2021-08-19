import React from "react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import {
  makeStyles,
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import { SideMenu, Header } from "./components";
import { Accounts, Books, Login, NotFound } from "./pages";
import AuthContext from "./contexts/AuthContext";
import BookDataContext from "./contexts/BookDataContext";
import "./App.css";

// Đặt lại bảng màu mặc định cho app của mình
const theme = createMuiTheme({
  palette: {
    // primary: {
    //   main: "#7a2e19",
    // },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

const useStyles = makeStyles({
  appMain: {
    // paddingLeft: "250px",
    width: "100%",
    height: "100vh",
    backgroundColor: "#eeeeee",
  },
});

function App() {
  const classes = useStyles();
  return (
    <AuthContext>
      <BookDataContext>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />

            <ThemeProvider theme={theme}>
              <div className={classes.appMain}>
                {/* <Header />
            <SideBar /> */}

                <SideMenu>
                  {/* <Route exact path="/" component={Login} /> */}
                  <Route path="/accounts" component={Accounts} />
                  <Route path="/books" component={Books} />
                  {/* <Route component={NotFound} /> */}
                </SideMenu>
              </div>
              <CssBaseline />
            </ThemeProvider>
          </Switch>
        </Router>
      </BookDataContext>
    </AuthContext>
  );
}

export default App;
