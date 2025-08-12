import axios from "axios";

const BASE_API = "http://localhost:8081/api/custom-meal-plans";

// Save a custom meal plan
export const saveCustomMealPlan = async (plan, token) => {
  try {
    const response = await axios.post(BASE_API, plan, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saving custom meal plan:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a custom meal plan by ID
export const deleteCustomMealPlan = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_API}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting custom meal plan:", error.response?.data || error.message);
    throw error;
  }
};

// Get a custom meal plan by ID
export const getCustomMealPlanById = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_API}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching custom meal plan by ID:", error.response?.data || error.message);
    throw error;
  }
};

// Get all custom meal plans by user ID
export const getCustomMealPlansByUserId = async (userId, token) => {
  try {
    const response = await axios.get(`${BASE_API}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching custom meal plans by user ID:", error.response?.data || error.message);
    throw error;
  }
};
