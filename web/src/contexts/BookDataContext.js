import React, { useState } from "react";

export const ApiContext = React.createContext();

const BookDataContext = (props) => {
  const [allBookList, setAllBookList] = useState([]);

  return (
    <ApiContext.Provider value={{ allBookList, setAllBookList }}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default BookDataContext;
