import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/admin/v1";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to add Authorization header for every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Update user roles
 * @param {string} userId
 * @param {string[]} roles
 */
export const updateUserRoles = (userId, roles) => {
  return api.put(`/users/${userId}/roles`, roles);
};

/**
 * Export logs and automatically trigger download
 * @param {Object} filters
 * @param {string} [filters.email]
 * @param {string} [filters.username]
 * @param {string} [filters.role]
 * @param {string} [filters.method]
 * @param {string} [filters.endpoint]
 * @param {string} [filters.from] - ISO datetime format
 * @param {string} [filters.to]   - ISO datetime format
 * @param {string} [filters.format] - "csv" (default) or "excel"
 */
export const exportLogs = async (filters = {}) => {
  const response = await api.get(`/logs/export`, {
    params: filters,
    responseType: "blob",
  });

  // Determine file name based on format
  const fileName = filters.format === "excel" ? "audit_logs.xlsx" : "audit_logs.csv";

  // Create download link
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

/**
 * Get total user count
 */
export const getTotalUserCount = () => {
  return api.get(`/count`);
};

/**
 * Get active user count by subscription plan
 */
export const getActiveUserCountByPlan = () => {
  return api.get(`/count-by-plan`);
};

/**
 * Create a new user
 * @param {Object} userData
 */
export const createUser = async (userData) => {
  try {
    const response = await api.post(`/create`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // message string like "✅ User created successfully"
  } catch (error) {
    if (error.response) {
      // Backend returned error response
      throw new Error(error.response.data || "Failed to create user");
    } else {
      throw new Error("Network error");
    }
  }
};

