export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

export  const getToken = () => {
  return localStorage.getItem("token");
};

export const clearToken = () => {
  localStorage.removeItem("token");
};
