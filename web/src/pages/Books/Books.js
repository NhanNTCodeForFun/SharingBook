import React, { useState, useContext, useEffect } from "react";
import { PageHeader } from "../../components";
import { ImBooks } from "react-icons/im";
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Typography,
  Avatar,
  withStyles,
} from "@material-ui/core";
import { IoBan } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import useTable from "../../components/useTable";
import Modal from "./BookModal";
import "./Books.css";
import { getAllBooksAPI, checkBookAPI } from "../../services/book-services";
import { ApiContext } from "../../contexts/BookDataContext";
import { AiFillCheckCircle } from "react-icons/ai";

const headCells = [
  { id: "no", label: "#NO" },
  { id: "img", label: "Ảnh Cuốn Sách" },
  { id: "book", label: "Sách" },
  { id: "content", label: "Mô tả" },
  { id: "status", label: "Trạng Thái" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
    button: {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    height: "100%",
    width: theme.spacing(30),
  },
  buttonActive: {
    width: "100%",
    backgroundColor: "green",
    color: "white",
  },
  buttonInactive: {
    width: "100%",
    backgroundColor: "red",
    color: "white",
  },
  buttonInfo: {
    marginTop: 5,
    width: "100%",
    backgroundColor: "#00e5ff",
    color: "white",
  },
  bookInformation: {
    display: "inline-block",
    width: "30%",
    fontWeight: "bold",
  },
}));

function Books() {
  const { allBookList, setAllBookList } = useContext(ApiContext);

  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const { TblContainer, TblHead, TblPagination, booksAfterPagingSorting } =
    useTable(books, headCells);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (allBookList) {
      setBooks(allBookList);
    }
  }, [allBookList]);

  const fetchBooks = async () => {
    let allBookListResponse = await getAllBooksAPI();
    if (allBookListResponse) {
      allBookListResponse = allBookListResponse.sort((a, b) => {
        return a.bookId - b.bookId;
      });
      setAllBookList(allBookListResponse);
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpen = (book) => {
    setOpen(true);
    setBook(book);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = async (book, status) => {
    const dto = {
      bookId: book.bookId,
      status,
    };

    let editedBook = books.find((found) => found.bookID === book.bookID);
    const position = books.indexOf(editedBook);

    editedBook = { ...editedBook, status: !book?.status };
    books[position] = { ...editedBook };
    setBooks([...books]);

    const checkResponseStatus = await checkBookAPI(dto);
    if (checkResponseStatus) {
      await fetchBooks();
    }
  };

  const rowData = booksAfterPagingSorting(books);

  return (
    <div className="wrapper" style={{ marginTop: "3rem" }}>
      <PageHeader
        title="Quản lý sách"
        subTitle="Phê duyệt cuốn sách trong hệ thống"
        icon={<ImBooks style={{ fontSize: "1.8rem" }} />}
      />
      <Paper className={classes.pageContent}>
        <TblContainer>
          <TblHead />
          <TableBody>
            {rowData.map((item, index) => (
              <TableRow hover key={item?.bookId}>
                <TableCell>{++index}</TableCell>
                <TableCell>
                  <Avatar
                    variant="square"
                    src={item?.frontSideImage}
                    className={classes.avatar}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    style={{ marginBottom: "1rem" }}
                    variant="h5"
                    color="initial"
                  >
                    {item?.name}
                  </Typography>
                  <Typography>
                    <Typography
                      className={classes.bookInformation}
                      variant="subtitle2"
                      color="initial"
                    >
                      Thể loại:{" "}
                    </Typography>
                    <span>{item?.category.categoryName}</span>
                  </Typography>
                  <Typography>
                    <Typography
                      className={classes.bookInformation}
                      variant="subtitle2"
                      color="initial"
                    >
                      Tác giả:{" "}
                    </Typography>
                    <span>{item?.author}</span>
                  </Typography>
                  <Typography>
                    <Typography
                      className={classes.bookInformation}
                      variant="subtitle2"
                      color="initial"
                    >
                      Giá:{" "}
                    </Typography>
                    <span>{item?.price}</span>
                  </Typography>
                  <Typography>
                    <Typography
                      className={classes.bookInformation}
                      variant="subtitle2"
                      color="initial"
                    >
                      Người đăng:{" "}
                    </Typography>
                    <span>{item?.member.name}</span>
                  </Typography>
                  <Typography
                    className={classes.bookInformation}
                    variant="subtitle2"
                    color="initial"
                  >
                    NXB:{" "}
                  </Typography>
                  <span>{item?.publisher}</span>
                </TableCell>
                <TableCell width="25%">
                  <Typography variant="subtitle1" color="initial">
                    {item?.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    className={classes.root}
                    style={
                      item?.checked
                        ? { background: "#4caf50", color: "white" }
                        : { background: "#f44336", color: "white" }
                    }
                    label={item?.checked ? "Chấp nhận" : "Hủy bỏ"}
                  />
                </TableCell>
                <TableCell>
                  {item?.checked ? (
                    <Button
                      style={{ marginRight: "10px" }}
                      size="small"
                      variant="contained"
                      className={(classes.root, classes.buttonInactive)}
                      startIcon={<IoBan />}
                      onClick={() => handleStatusChange(item, false)}
                    >
                      Hủy bỏ
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
                      Chấp nhận
                    </Button>
                  )}

                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleClickOpen(item)}
                    className={(classes.root, classes.buttonInfo)}
                    books={item}
                    startIcon={<IoIosInformationCircle />}
                  >
                    Thông tin
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>

      <Modal book={book} handleClose={handleClose} open={open} />
    </div>
  );
}

export default Books;
