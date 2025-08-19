import axios from "axios";

const BASE_API = "http://localhost:8081/api/favorites";

// Add a meal to favorites
export const addFavoriteMeal = async (userId, meal, token) => {
  try {
    const response = await axios.post(`${BASE_API}/${userId}`, meal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding favorite meal:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get favorite meals for a user
export const getFavoriteMeals = async (userId, token) => {
  try {
    const response = await axios.get(`${BASE_API}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching favorite meals:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a favorite meal by favoriteMealId
export const deleteFavoriteMeal = async (favoriteMealId, token) => {
  try {
    const response = await axios.delete(`${BASE_API}/${favoriteMealId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting favorite meal:",
      error.response?.data || error.message
    );
    throw error;
  }
};
