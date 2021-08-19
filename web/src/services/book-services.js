import axiosInstances from "./axios-instance";

export const getAllBooksAPI = async () => {
  const url = "/books";
  let result;
  await axiosInstances
    .get(url)
    .then((res) => {
      result = res.data;
    })
    .catch((error) => console.error(error));
  return result;
};

export const checkBookAPI = async (dto) => {
  const url = "/books/check";
  let result = false;
  await axiosInstances
    .post(url, dto)
    .then(() => (result = true))
    .catch((error) => console.error(error));
  return result;
};
