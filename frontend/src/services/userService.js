import axios from "axios";

const BASE_URL = "http://localhost:8081/api/users/v1";

/**
 * Update user profile by ID
 * @param {string} userId - ID of the user to update
 * @param {object} data - Updated user fields
 * @returns {Promise<object>} Updated user data from server
 */
export const updateUser = async (userId, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Update user error:", error);
    throw error.response?.data || error;
  }
};

/**
 * Fetch user details by ID
 * @param {string} userId - ID of the user to fetch
 * @returns {Promise<object>} User data from server
 */
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Get user error:", error);
    throw error.response?.data || error;
  }
};

/**
 * Delete a user by ID
 * @param {string} userId
 */
export const deleteUserById = async (userId) => {
  const response = await axios.delete(`${API_BASE}/delete/${userId}`);
  return response.data;
};

/**
 * Get all users (Admin access only)
 */
export const getAllUsers = async () => {
  const response = await axios.get(`${API_BASE}/all`);
  return response.data;
};
