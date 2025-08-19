import axios from "axios";

const API_BASE = "http://localhost:8081/api/auth/v1";

// Login user
export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/login`, data, {
      headers: {
        "Content-Type": "application/json", 
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};

// Register user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/register`, data, {
      headers: {
        "Content-Type": "application/json", 
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Registration failed. Please try again."
    );
  }
};

// Change password 
export const changePassword = async (data, token) => {
  try {
    const response = await axios.post(`${API_BASE}/change-password`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Pass JWT token here
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Password change failed. Please try again."
    );
  }
};
