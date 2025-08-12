import axios from "axios";

const API_BASE = "/api";

/**
 * Update user roles (Admin only)
 * @param {string} userId
 * @param {string[]} roles
 */
export const updateUserRoles = async (userId, roles) => {
  const response = await axios.put(`${API_BASE}/users/${userId}/roles`, roles);
  return response.data;
};

/**
 * Get paginated & filtered audit logs (GraphQL)
 * @param {object} filter
 * @param {number} page
 * @param {number} size
 */
export const getAuditLogs = async (filter, page = 0, size = 10) => {
  const query = `
    query AuditLogs(
      $email: String,
      $username: String,
      $role: String,
      $method: String,
      $endpoint: String,
      $from: String,
      $to: String,
      $page: Int!,
      $size: Int!
    ) {
      auditLogs(
        email: $email,
        username: $username,
        role: $role,
        method: $method,
        endpoint: $endpoint,
        from: $from,
        to: $to,
        page: $page,
        size: $size
      ) {
        content {
          id
          email
          username
          role
          method
          endpoint
          timestamp
        }
        totalPages
        totalElements
        number
        size
      }
    }
  `;

  const variables = {
    ...filter,
    page,
    size,
  };

  const response = await axios.post("/graphql", {
    query,
    variables,
  });

  return response.data.data.auditLogs;
};

/**
 * Export audit logs (CSV or Excel)
 * @param {object} params
 * @param {"csv" | "excel"} format
 */
export const exportAuditLogs = async (params = {}, format = "csv") => {
  const queryParams = new URLSearchParams({
    ...params,
    format,
  }).toString();

  const response = await axios.get(`${API_BASE}/logs/export?${queryParams}`, {
    responseType: "blob",
  });

  return response;
};

export const fetchUserCount = async () => {
  /* API Call */
};
export const fetchUserRoles = async () => {
  /* API Call */
};
export const fetchActivityLogs = async () => {
  /* API Call */
};
export const fetchAllUsers = async () => {
  /* API Call */
};
export const fetchTopFeatures = async () => {
  /* API Call */
};
export const fetchActiveUserStats = async () => {
  /* API Call */
};
