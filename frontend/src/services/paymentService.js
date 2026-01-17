import api from "./axios";

export const createOrder = async (plan) => {
  const res = await api.post("/payments/create-order", { plan });
  return res.data;
};
