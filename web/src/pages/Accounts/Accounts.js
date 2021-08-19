import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  withStyles,
  createMuiTheme,
  Toolbar,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  InputAdornment,
  IconButton,
  ThemeProvider,
} from "@material-ui/core";
import { getAllUsersAPI } from "../../services/member-services";
import { Rating } from "@material-ui/lab";
import { ImUsers } from "react-icons/im";
import { IoBan } from "react-icons/io5";
import { IoWarningOutline } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import { PageHeader } from "../../components";
import useTable from "../../components/useTable";
import Details from "./AccountModal";
import Warning from "./WarningModal";
import "./Accounts.css";
import { AiFillCheckCircle,AiOutlineSearch } from "react-icons/ai";

const headCells = [
  { id: "no", label: "#NO", disableSorting: true },
  { id: "email", label: "Email", disableSorting: true },
  { id: "name", label: "Họ và tên", disableSorting: true },
  { id: "mobile", label: "Số điện thoại", disableSorting: true },
  { id: "rating", label: "Đánh giá" },
  { id: "status", label: "Trạng thái", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
  { id: "details", label: "Chi tiết", disableSorting: true },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
    button: {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  buttonRemoved: {
    background: "red",
    color: "white",
  },
  buttonInfo: {
    backgroundColor: "#1aa3ff",
    color: "white",
  },
  buttonWarn: {
    background: "#fcb900",
    color: "white",
  },
  margin: {
    margin: theme.spacing(1),
  },
  buttonActive: {
    background: "green",
    color: "white",
  }
}));

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

function Accounts() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterUser, setFilterUser] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [filterRating, setFilterRating] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [filterStatus, setFilterStatus] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, usersAfterPagingSorting } =
    useTable(users, headCells, filterUser, filterRating, filterStatus);

  //get all users api
  const fetchMembers = async () => {
    let allMembersResponses = await getAllUsersAPI();
    if (allMembersResponses) {
      allMembersResponses = allMembersResponses.filter(
        (member) => member.admin !== true
      );
      setUsers(allMembersResponses);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  //Detail form
  const handleDetailOpen = (user) => {
    setOpenDetail(true);
    setUser(user);
  };
  const handleDetailClose = () => {
    setOpenDetail(false);
  };
  //Warning form
  const handleWarnOpen = () => {
    setOpenWarning(true);
  };
  const handleWarnClose = () => {
    setOpenWarning(false);
  };

  const handleStatusChange = (user, active) => {
    let editedUser = users.find(
      (found) => found.username === user.username && user.admin == false
    );
    const position = users.indexOf(editedUser);

    editedUser = { ...editedUser, active: !user?.active  };
    users[position] = { ...editedUser };
    setUsers([...users]);
  };

  const handleSearchUser = (e) => {
    let target = e.target;
    setFilterUser({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const handleFilterRating = (e) => {
    let target = e.target;
    setFilterRating({
      fn: (items) => {
        if (target.value == "") return items;
        else return items.filter((x) => x.averageStar === target.value);
      },
    });
  };

  const handleFilterStatus = (e) => {
    let target = e.target;
    setFilterStatus({
      fn: (items) => {
        if (target.value == "") return items;
        else return items.filter((x) => x.active === target.value);
      },
    });
  };

  const rowData = usersAfterPagingSorting(users);

  return (
    <div className="wrapper" style={{ marginTop: "4rem" }}>
      <PageHeader
        title="Quản lý tài khoản"
        subTitle="Kích hoạt hoặc cấm tài khoản trong hệ thống"
        icon={<ImUsers style={{ fontSize: "1.8rem" }} />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          {/*Search User Input Text */}
          <ThemeProvider theme={theme}>
            <TextField
              size="small"
              variant="outlined"
              label="Tìm user"
              className={classes.margin}
              onChange={handleSearchUser}
              style={{ width: "25rem"}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineSearch/>
                  </InputAdornment>
                ),
              }}
            />
          </ThemeProvider>
          {/* <FormControl variant="outlined" size="small">
            <InputLabel>Search</InputLabel>
            <OutlinedInput
              value={searchValue}
              onChange={{handleSearchUser}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/*filter rating */}
          <ThemeProvider theme={theme}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              style={{ marginLeft: 50 }}
              size="small"
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Đánh giá
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={age}
                onChange={handleFilterRating}
                label="Rating"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </ThemeProvider>

          {/*filter status*/}
          <ThemeProvider theme={theme}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              style={{ marginLeft: 50 }}
              size="small"
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Trạng Thái
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={age}
                onChange={handleFilterStatus}
                label="Trạng thái"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={true}>Được kích hoạt</MenuItem>
                <MenuItem value={false}>Bị cấm</MenuItem>
              </Select>
            </FormControl>
          </ThemeProvider>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {rowData.map((item, index) => (
              <StyledTableRow key={item?.memberId}>
                <StyledTableCell>{++index}</StyledTableCell>
                <StyledTableCell>{item?.email}</StyledTableCell>
                <StyledTableCell>{item?.name}</StyledTableCell>
                <StyledTableCell>{item?.phoneNumber}</StyledTableCell>
                <StyledTableCell>
                  <Rating
                    size="medium"
                    name="size-medium"
                    value={item?.averageStar}
                    readOnly
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Chip
                    className={classes.root}
                    style={
                      item?.active
                        ? { background: "#4caf50", color: "white" }
                        : { background: "#f44336", color: "white" }
                    }
                    label={item?.active ? "Được kích hoạt" : "Cấm"}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  {item?.active ? (
                    <Button
                      style={{ marginRight: "10px" }}
                      size="small"
                      variant="contained"
                      className={(classes.root, classes.buttonRemoved)}
                      startIcon={<IoBan />}
                      onClick={() => handleStatusChange(item, false)}
                    >
                      Bị cấm
                    </Button>
                  ) : (
                    <Button
                      style={{ marginRight: "10px" }}
                      size="small"
                      variant="contained"
                      className={(classes.root, classes.buttonActive)}
                      startIcon={<AiFillCheckCircle />}
                      onClick={() => handleStatusChange(item, true)}
                    >
                      Được kích hoạt
                    </Button>
                  )}

                  <Button
                    style={{ marginLeft: 30 }}
                    variant="contained"
                    size="small"
                    className={classes.buttonWarn}
                    startIcon={<IoWarningOutline />}
                    onClick={() => handleWarnOpen(item)}
                  >
                    Cảnh báo
                  </Button>
                </StyledTableCell>
                {/*Button view information */}
                <StyledTableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleDetailOpen(item)}
                    className={classes.buttonInfo}
                    users={item}
                    startIcon={<IoIosInformationCircle />}
                  >
                    Xem
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Warning handleClose={handleWarnClose} open={openWarning} />
      <Details user={user} handleClose={handleDetailClose} open={openDetail} />
    </div>
  );
}

export default Accounts;
