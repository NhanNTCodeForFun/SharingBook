import axiosInstances from './axios-instance';

export const addNewFailReason = async newFailReasonDTO => {
  const url = '/failReason';
  let result = false;
  await axiosInstances
    .post(url, newFailReasonDTO)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};
