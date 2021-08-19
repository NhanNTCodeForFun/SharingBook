import axiosInstances from './axios-instance';

export const login = async account => {
  const url = '/members/login';
  let result;
  await axiosInstances
    .post(url, account)
    .then(response => {
      result = response.data;
    })
    .catch(error => console.error(error));
  return result;
};

export const signup = async data => {
  const url = '/members/signup';
  let result = false;
  await axiosInstances
    .post(url, data)
    .then(response => {
      result = response;
    })
    .catch(error => console.error(error));
  return result;
};
