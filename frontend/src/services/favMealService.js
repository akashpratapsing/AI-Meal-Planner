import api from "./axios";

export const addFavoriteMeal = async (meal) => {
  try {
    const res = await api.post("/favorites", meal);
    return res.data;
  } catch (e) {
    if (e.response?.status === 403) throw new Error("UPGRADE_REQUIRED");
    if (e.response?.status === 409) throw new Error("ALREADY_FAVORITE");
    throw e;
  }
};

export const getFavoriteMeals = async () => {
  try {
    const res = await api.get("/favorites");
    return res.data;
  } catch (e) {
    if (e.response?.status === 403) throw new Error("UPGRADE_REQUIRED");
    throw e;
  }
};

export const deleteFavoriteMeal = async (id) => {
  try {
    const res = await api.delete(`/favorites/${id}`);
    return res.data;
  } catch (e) {
    if (e.response?.status === 403) throw new Error("UPGRADE_REQUIRED");
    throw e;
  }
};
