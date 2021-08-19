import axiosInstances from "./axios-instance";

export const getAllUsersAPI = async () => {
  const url = "/members";
  let result;
  await axiosInstances
    .get(url)
    .then((res) => {
      result = res.data;
    })
    .catch((error) => console.error(error));
  return result;
};

export const getMemberByIdAPI = async (memberId) => {
  const url = `/members/${memberId}`;
  let result;
  await axiosInstances
    .get(url)
    .then((res) => {
      result = res.data;
    })
    .catch((error) => console.error(error));
  return result;
};

export const getUserFeedback = async (userId) => {
  const url = `/feedback/${userId}`;
  let result;
  await axiosInstances
    .get(url)
    .then((res) => {
      result = res.data;
    })
    .catch((error) => console.error(error));
  return result;
};

export const getAllFailedReason = async () => {
  const url = "failReason";
  let result;
  await axiosInstances
    .get(url)
    .then((res) => {
      result = res.data;
    })
    .catch((error) => console.error(error));
  return result;
};
