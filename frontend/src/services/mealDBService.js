import api from "./axios";

export const getMealOptions = async () => {
  const res = await api.get("/meals/options");
  return res.data;
};

export const browseMeals = async (type, value) => {
  const res = await api.get(
    `/meals/browse?type=${type}&value=${encodeURIComponent(value)}`
  );
  return res.data.meals || [];
};

export const getMealDetails = async (id) => {
  const res = await api.get(`/meals/details/${id}`);
  return res.data;
};

export const getRandomMeal = async () => {
  const res = await api.get("/meals/random");
  return res.data;
};
