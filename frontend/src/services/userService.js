import api from "./axios";

export const getUserById = async (userId) => {
  const res = await api.get(`/users/v1/${userId}`);
  return res.data;
};

export const updateUser = async (userId, data) => {
  const res = await api.put(`/users/v1/update/${userId}`, data);
  return res.data;
};

export const deleteUserById = async (userId) => {
  const res = await api.delete(`/users/v1/delete/${userId}`);
  return res.data;
};

export const getAllUsers = async () => {
  const res = await api.get("/users/v1/all");
  return res.data;
};

export const uploadProfilePicture = async (userId, file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post(
    `/users/v1/${userId}/upload-profile`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return res.data;
};
