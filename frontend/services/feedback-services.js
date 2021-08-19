import axiosInstances from './axios-instance';

export const getAllFeedbackToUser = async userId => {
  const url = `/feedback/${userId}`;
  let result = null;
  await axiosInstances
    .get(url)
    .then(response => {
      result = response.data;
    })
    .catch(error => console.error(error));
  return result;
};

export const addNewFeedback = async newFeedbackDto => {
  const url = '/feedback';
  let result = false;
  await axiosInstances
    .post(url, newFeedbackDto)
    .then(() => (result = true))
    .catch(error => console.error(error));
  return result;
};
