import axiosInstances from './axios-instance';

export const createTransferRequest = async data => {
  const url = '/transferences';
  let result = false;
  await axiosInstances
    .post(url, data)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};

export const getTransferenceById = async transferenceId => {
  const url = '/transferences';
  let result;
  await axiosInstances
    .get(url, {
      params: {
        id: transferenceId,
      },
    })
    .then(response => (result = response.data))
    .catch(error => console.error(error));
  return result;
};

export const getRequestsToMe = async userId => {
  const url = `/transferences/transferrequest/${userId}`;
  let result;
  await axiosInstances
    .get(url)
    .then(res => {
      result = res.data;
    })
    .catch(error => console.error(error));
  return result;
};

export const getMyRequests = async userId => {
  const url = `/transferences/myrequest/${userId}`;
  let result;
  await axiosInstances
    .get(url)
    .then(res => {
      result = res.data;
    })
    .catch(error => console.error(error));
  return result;
};

export const acceptRequest = async requestId => {
  const url = `/transferences/accept/${requestId}`;
  let result = false;
  await axiosInstances
    .put(url)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};

export const refuseRequest = async requestId => {
  const url = `/transferences/refuse/${requestId}`;
  let result = false;
  await axiosInstances
    .put(url)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};

export const cancelRequest = async requestId => {
  const url = `/transferences/cancel/${requestId}`;
  let result = false;
  await axiosInstances
    .put(url)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};
