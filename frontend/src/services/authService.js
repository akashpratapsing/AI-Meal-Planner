import api from "./axios";

export const loginUser = async (data) => {
  const res = await api.post("/auth/v1/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post("/auth/v1/register", data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await api.post("/auth/v1/change-password", data);
  return res.data;
};

export const googleAuth = async (googleToken) => {
  const res = await api.post("/auth/v1/google", { token: googleToken });
  return res.data;
};
