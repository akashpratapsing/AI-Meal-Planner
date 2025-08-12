import axios from "axios";

const API_BASE = "http://localhost:8081/api/mealplans";

/**
 * Generate a meal plan by sending MealPlanRequestDTO to backend.
 * @param {Object} data - MealPlanRequestDTO object
 * @param {string} token - JWT token for authorization
 * @returns {Promise<Object>} - The generated MealPlan object
 */
export const generateMealPlan = async (data, token) => {
  try {
    const response = await axios.post(`${API_BASE}/generate`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to generate meal plan"
    );
  }
};

// Save Meal Plan
export const saveMealPlan = async (mealPlan, token) => {
  try {
    const response = await axios.post(`${API_BASE}`, mealPlan, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to save meal plan"
    );
  }
};

// Get Meal Plan by ID
export const getMealPlanById = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch meal plan"
    );
  }
};

// Get Meal Plans by User ID
export const getMealPlansByUser = async (token) => {
  try {
    const response = await axios.get(`${API_BASE}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user's meal plans"
    );
  }
};

// Delete Meal Plan by ID
export const deleteMealPlan = async (id, token) => {
  try {
    const response = await axios.delete(`${API_BASE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Contains { message: "Meal Plan deleted successfully" }
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to delete meal plan"
    );
  }
};