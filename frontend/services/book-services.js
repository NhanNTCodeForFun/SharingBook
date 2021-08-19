import axiosInstances from './axios-instance';

export const getAllBooksAPI = async () => {
  const url = '/books';
  let result;
  await axiosInstances
    .get(url)
    .then(res => {
      result = res.data;
    })
    .catch(error => console.error(error));
  return result;
};

export const postNewBook = async bookData => {
  const url = '/books';
  let result = false;
  await axiosInstances
    .post(url, bookData)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};

export const deleteBook = async bookId => {
  const url = `/books/${bookId}`;
  let result = false;
  await axiosInstances
    .delete(url)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};

export const setBookDisplay = async bookId => {
  const url = `/books/display/${bookId}`;
  let result = false;
  await axiosInstances
    .put(url)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};

export const setBookHide = async bookId => {
  const url = `/books/hide/${bookId}`;
  let result = false;
  await axiosInstances
    .put(url)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};
