import axiosInstances from './axios-instance';

export const getAllCategoriesAPI = async () => {
  const url = '/categories';
  let result;
  await axiosInstances
    .get(url)
    .then(res => {
      result = res.data;
    })
    .catch(error => console.error(error));
  return result;
};
