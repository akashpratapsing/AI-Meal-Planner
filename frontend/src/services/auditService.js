import axios from "axios";

const GRAPHQL_URL = "http://localhost:8081/graphql";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

/**
 * Fetch paginated audit logs with filters
 * @param {Object} filters
 * @param {string} [filters.email]
 * @param {string} [filters.username]
 * @param {string} [filters.role]
 * @param {string} [filters.method]
 * @param {string} [filters.endpoint]
 * @param {string} [filters.from] - ISO datetime format
 * @param {string} [filters.to] - ISO datetime format
 * @param {number} [filters.page]
 * @param {number} [filters.size]
 */
export const getAuditLogs = async (filters) => {
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
        size
        number
      }
    }
  `;

  const variables = { ...filters };

  const response = await axios.post(
    GRAPHQL_URL,
    { query, variables },
    getAuthHeaders()
  );

  // Handle GraphQL errors
  if (response.data.errors) {
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data.auditLogs;
};
