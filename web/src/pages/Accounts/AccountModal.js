import React, { useState, useEffect, useCallback } from "react";
import {
  TextField,
  Dialog,
  Typography,
  withStyles,
  IconButton,
  makeStyles,
  Grid,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import {
  getUserFeedback,
  getAllFailedReason,
  getMemberByIdAPI,
} from "../../services/member-services";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9d6838",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: "0 auto",
    // height: 500
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function Modal(props) {
  const { open, handleClose, user } = props;
  const classes = useStyles();
  const [feedback, setFeedback] = useState([]);
  const [failedReason, setFailedReason] = useState([]);

  const convertDate = (date) => {
    const dateObj = new Date(date);
    let month = "" + (dateObj.getMonth() + 1);
    let day = "" + dateObj.getDate();
    let year = dateObj.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return [day, month, year].join("-");
  };

  //get all feedback of member by memberId
  const fetchFeedback = useCallback(async (userId) => {
    let allFeedbackResponse = await getUserFeedback(userId);
    if (allFeedbackResponse) {
      setFeedback(allFeedbackResponse);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchFeedback(user.memberId);
    }
  }, [user, fetchFeedback]);

  const getFromSentFailReasonMemberInfo = async (memberId) => {
    const result = await getMemberByIdAPI(memberId);
    return result;
  };

  const fetchFailedReson = useCallback(async (userId) => {
    let allReasonResponse = await getAllFailedReason();
    if (allReasonResponse) {
      allReasonResponse = allReasonResponse.filter(
        (reason) => reason.toMemberId === userId
      );

      for (let index = 0; index < allReasonResponse.length; index++) {
        const memberInformation = await getFromSentFailReasonMemberInfo(
          allReasonResponse[index].fromMemberId
        );
        if (memberInformation) {
          allReasonResponse[index].fromMemberName = memberInformation.name;
        }
      }
      setFailedReason(allReasonResponse);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchFailedReson(user.memberId);
    }
  }, [user, fetchFailedReson]);

  return (
    <div>
      <Dialog
        className={classes.dialog}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          THÔNG TIN THÀNH VIÊN
        </DialogTitle>
        <DialogContent dividers>
          {/* <FormControl> */}
          <ThemeProvider theme={theme}>
            <Grid container spacing={1} className={classes.wrapper}>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={12} style={{ marginTop: -20 }}>
                  {/*Profile */}
                  <TextField
                    fullWidth
                    id="filled-read-only-input"
                    label="Profile"
                    InputProps={{
                      readOnly: true,
                    }}
                    size="small"
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    id="filled-read-only-input"
                    label="Username"
                    defaultValue={user?.username}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={5} style={{ marginLeft: 30 }}>
                  <TextField
                    fullWidth
                    id="filled-read-only-input"
                    label="Họ và tên"
                    defaultValue={user?.name}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    id="filled-read-only-input"
                    label="Địa chỉ"
                    defaultValue={user?.addressDetail}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={5} style={{ marginLeft: 30 }}>
                  <TextField
                    fullWidth
                    id="filled-read-only-input"
                    label="Email"
                    defaultValue={user?.email}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>

                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    id="filled-read-only-input"
                    label="Trạng thái"
                    defaultValue={
                      user
                        ? user.active === true
                          ? "Được kích hoạt"
                          : "Bị cấm"
                        : null
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                {/*Feedback */}
                <Grid item xs={12} style={{ marginTop: -20 }}>
                  <p
                    style={{
                      fontSize: "medium",
                      fontFamily: "sans-serif",
                      color: "blue",
                      marginTop: 10,
                    }}
                  >
                    Feedback
                  </p>
                </Grid>
                {feedback.map((item, index) => (
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "100%" }}
                      id="standard-read-only-input"
                      defaultValue={
                        ++index +
                        ". " +
                        item.comment +
                        "   (đã được gửi bởi " +
                        item.fromMember.name +
                        " vào lúc " +
                        convertDate(item.timestamp) +
                        " )"
                      }
                      // defaultValue={item.comment + "   (đã được gửi bởi " + getUsernameById(item.fromMember.memberId) + " )"}
                      InputProps={{
                        readOnly: true,
                      }}
                      size="small"
                    />
                  </Grid>
                ))}
                <Grid item xs={12} style={{ marginTop: -20 }}>
                  <p
                    style={{
                      fontSize: "medium",
                      fontFamily: "sans-serif",
                      color: "red",
                      marginTop: 10,
                    }}
                  >
                    Lý do bị hủy giao dịch
                  </p>
                </Grid>
                {failedReason.map((item, index) => (
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "100%" }}
                      id="standard-read-only-input"
                      defaultValue={
                        ++index +
                        ". " +
                        item.content +
                        " (bởi " +
                        item.fromMemberName +
                        ")"
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      size="small"
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid item container spacing={3} xs={12}></Grid>
            </Grid>

            {/* </FormControl> */}
          </ThemeProvider>
        </DialogContent>

        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
