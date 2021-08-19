import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { LogoShareBook } from "../../assets/img";
import { UserApiContext } from "../../contexts/AuthContext";
import { login } from "../../services/user-services";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signin: {
    background: "linear-gradient(45deg, #9d6838 10%, #64412a 90%)",
    transform: "translateZ(0)",
    color: "white",
  },
  "&$focused": {
    outlineColor: "#64412a",
    borderColor: "#64412a",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#64412a",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

export default function SignIn() {
  const { currentUser, setCurrentUser } = useContext(UserApiContext);
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isWrongAccount, setWrongAccount] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (currentUser && currentUser.admin) {
      history.push("/accounts");
    }
  }, [currentUser, history]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = {
      username,
      password,
    };
    const loginResponse = await login(loginData);
    if (loginResponse && loginResponse.admin) {
      setCurrentUser(loginResponse);
    } else {
      setWrongAccount(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        paddingTop: "1px",
        paddingBottom: "1px",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar src={LogoShareBook} className={classes.avatar} />
          <div style={{ display: "flex", fontFamily: "Merienda" }}>
            <Typography
              style={{ color: "#7a2e19", fontFamily: "Merienda" }}
              variant="h4"
            >
              Share
            </Typography>
            <Typography style={{ fontFamily: "Merienda" }} variant="h4">
              Book
            </Typography>
          </div>

          <form
            autoComplete="off"
            className={classes.form}
            noValidate
            onSubmit={handleSubmit}
          >
            <ThemeProvider theme={theme}>
              <TextField
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Tên đăng nhập"
                name="email"
                autoComplete="email"
                autoFocus
                className={classes["&$focused"]}
              />
              <TextField
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                className={classes}
              />

              {isWrongAccount ? (
                <p style={{ textAlign: "center", color: "red" }}>
                  Tên đăng nhập hoặc mật khẩu không đúng
                </p>
              ) : null}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={(classes.submit, classes.signin)}
              >
                Đăng Nhập
              </Button>
            </ThemeProvider>
            <Grid container>
              <Grid item xs style={{ textAlign: "center", marginTop: 10 }}>
                <Link
                  style={{ textDecoration: "none" }}
                  href="#"
                  variant="body2"
                >
                  Quên mật khẩu?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
