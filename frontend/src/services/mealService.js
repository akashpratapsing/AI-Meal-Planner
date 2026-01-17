import api from "./axios";

export const generateMealPlan = async (data) => {
  const res = await api.post("/mealplans/generate", data);
  return res.data;
};

export const saveMealPlan = async (mealPlan) => {
  const res = await api.post("/mealplans", mealPlan);
  return res.data;
};

export const getMealPlanById = async (id) => {
  const res = await api.get(`/mealplans/${id}`);
  return res.data;
};

export const getMealPlansByUser = async () => {
  const res = await api.get("/mealplans/user");
  return res.data;
};

export const deleteMealPlan = async (id) => {
  const res = await api.delete(`/mealplans/${id}`);
  return res.data;
};
