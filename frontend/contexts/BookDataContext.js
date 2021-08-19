import React, {useState} from 'react';
import * as bookServices from '../services/book-services';

export const ApiContext = React.createContext();

const BookDataContext = props => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const result = await bookServices.getAllBooksAPI();
    if (result) {
      setBooks(result);
    }
  };

  return (
    <ApiContext.Provider value={{books, getBooks}}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default BookDataContext;
