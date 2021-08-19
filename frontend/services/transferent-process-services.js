import axiosInstances from './axios-instance';

export const markProcessSuccessfully = async transferenceId => {
  const url = `/transferences/process/success/${transferenceId}`;
  let result = false;
  await axiosInstances
    .put(url)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};

export const markProcessFailed = async transferenceId => {
  const url = `/transferences/process/fail/${transferenceId}`;
  let result = false;
  await axiosInstances
    .put(url)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};

export const cancelProcess = async transferenceId => {
  const url = `/transferences/process/cancel/${transferenceId}`;
  let result = false;
  await axiosInstances
    .put(url)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};
