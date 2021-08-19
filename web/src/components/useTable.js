import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
} from "@material-ui/core";

export default function useTable(
  records,
  headCells,
  filterUser,
  filterRating,
  filterStatus
) {
  const pages = [5, 10, 15];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pages[page]);
  const [order, setOrder] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState(0);

  const TblContainer = (props) => <Table>{props.children}</Table>;

  const TblHead = (props) => {
    //hanlde sort function
    const hanldeSortRequest = (cellId) => {
      const isDesc = orderBy === cellId && order === "asc";
      setOrder(isDesc ? "desc" : "asc");
      setOrderBy(cellId);
    };
    return (
      <TableHead
        align="center"
        style={{
          background: "linear-gradient(45deg, #9d6838 10%, #64412a 90%)",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              style={{
                color: "white",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
              }}
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => {
                    hanldeSortRequest(headCell.id);
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  // handle change Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 10);
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handlChangeRowsPerPage}
    />
  );

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order1 = comparator(a[0], b[0]);
      if (order1 !== 0) return order1;
      return b[1] - a[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(_order, _orderBy) {
    return _order === "desc"
      ? (a, b) => descendingComparator(a, b, _orderBy)
      : (a, b) => -descendingComparator(a, b, _orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] < a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const usersAfterPagingSorting = () => {
    return stableSort(
      filterUser.fn(filterRating.fn(filterStatus.fn(records))),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    // return stableSort(users, getComparator(order, orderBy)).slice(
    //   page * rowsPerPage,
    //   (page + 1) * rowsPerPage
    // );
  };

  const booksAfterPagingSorting = () => {
    return stableSort(records, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    usersAfterPagingSorting,
    booksAfterPagingSorting
  };
}
