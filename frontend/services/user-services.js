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

export const getUser = async memberId => {
  const url = `/members/${memberId}`;
  let result;
  await axiosInstances
    .get(url)
    .then(response => {
      result = response.data;
    })
    .catch(error => console.error(error));
  return result;
};

export const changePassword = async (memberId, data) => {
  const url = '/members/changePassword';
  let result = false;
  await axiosInstances
    .put(url, data, {
      params: {
        memberId: memberId,
      },
    })
    .then(response => {
      result = response;
    })
    .catch(error => console.error(error));
  return result;
};

export const update = async (memberId, data) => {
  const url = '/members/update';
  let result = false;
  await axiosInstances
    .put(url, data, {
      params: {
        memberId: memberId,
      },
    })
    .then(response => {
      result = response;
    })
    .catch(error => console.error(error));
  return result;
};

export const getAllUsersAPI = async () => {
  const url = '/members';
  let result;
  await axiosInstances
    .get(url)
    .then(res => {
      result = res.data;
    })
    .catch(error => console.error(error));
  return result;
};

export const changeAvatar = async (memberId, data) => {
  const url = '/members/changeAvatar';
  let result = false;
  await axiosInstances
    .put(url, data, {
      params: {
        memberId: memberId,
      },
    })
    .then(response => {
      result = response;
    })
    .catch(error => console.error(error));
  return result;
};
