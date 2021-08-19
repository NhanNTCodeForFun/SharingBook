import React from "react";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
  DialogActions,
  ThemeProvider, createMuiTheme
} from "@material-ui/core";

export default function WarningForm(props) {
  const { open, handleClose } = props;

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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>Cảnh báo:</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Để cảnh báo user của app, làm ơn hãy nhập lý do vào đây. Hệ thống của
          chúng thôi sẽ gửi lời nhắn đến user đấy trong chốc lát
        </DialogContentText>
        <ThemeProvider theme={theme}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nhập cảnh báo:"
            type="warningMessage"
            fullWidth
          />
        </ThemeProvider>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Hủy bỏ
        </Button>
        <Button
          style={{ background: "#fcb900", color: "white" }}
          onClick={handleClose}
        >
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );
}
