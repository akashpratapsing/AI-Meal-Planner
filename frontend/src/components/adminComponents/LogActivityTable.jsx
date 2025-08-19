import React, { useEffect, useState } from "react";
import { getAuditLogs } from "../../services/auditService";
import { Activity, ChevronLeft, ChevronRight, Search } from "lucide-react";

const LogActivityTable = () => {
  const [logs, setLogs] = useState([]);
  const [pageInfo, setPageInfo] = useState({ totalPages: 0, number: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    email: "",
    username: "",
    role: "",
    method: "",
    endpoint: "",
    from: "",
    to: "",
    page: 0,
    size: 10
  });

  const fetchLogs = () => {
    setLoading(true);
    getAuditLogs(filters)
      .then((data) => {
        setLogs(data.content);
        setPageInfo({ totalPages: data.totalPages, number: data.number });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching audit logs", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const getMethodBadge = (method) => {
    const badges = {
      GET: "badge-success",
      POST: "badge-info",
      PUT: "badge-warning",
      DELETE: "badge-error"
    };
    return badges[method] || badges.GET;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center mb-4">
          <Activity className="w-5 h-5 mr-2 text-primary" />
          <h2 className="card-title text-xl">Activity Logs</h2>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-2 mb-4">
          <input
            type="text"
            name="email"
            placeholder="Filter by Email"
            className="input input-bordered input-sm"
            value={filters.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Filter by Username"
            className="input input-bordered input-sm"
            value={filters.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="role"
            placeholder="Filter by Role"
            className="input input-bordered input-sm"
            value={filters.role}
            onChange={handleChange}
          />
          <select
            name="method"
            className="select select-bordered select-sm"
            value={filters.method}
            onChange={handleChange}
          >
            <option value="">All Methods</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            type="date"
            name="from"
            className="input input-bordered input-sm"
            value={filters.from}
            onChange={handleChange}
          />
          <input
            type="date"
            name="to"
            className="input input-bordered input-sm"
            value={filters.to}
            onChange={handleChange}
          />
          <button
            onClick={fetchLogs}
            className="btn btn-primary btn-sm col-span-full md:col-span-1"
          >
            <Search className="w-4 h-4 mr-1" />
            Apply Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>User</th>
                <th className="hidden md:table-cell">Method</th>
                <th className="hidden lg:table-cell">Endpoint</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar placeholder">
                          <div className="skeleton w-8 h-8 rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="skeleton h-3 w-20"></div>
                          <div className="skeleton h-3 w-16"></div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      <div className="skeleton h-6 w-12 rounded-full"></div>
                    </td>
                    <td className="hidden lg:table-cell">
                      <div className="skeleton h-3 w-32"></div>
                    </td>
                    <td>
                      <div className="skeleton h-3 w-16"></div>
                    </td>
                  </tr>
                ))
              ) : logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id} className="hover">
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar placeholder">
                          <div className="bg-accent text-accent-content rounded-full w-8 h-8">
                            <span className="text-xs font-semibold">
                              {log.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{log.username}</div>
                          <div className="text-xs opacity-70">{log.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      <div
                        className={`badge badge-sm ${getMethodBadge(log.method)}`}
                      >
                        {log.method}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell">
                      <code className="text-xs">{log.endpoint}</code>
                    </td>
                    <td className="text-sm opacity-70">
                      {formatTimestamp(log.timestamp)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center opacity-60 py-4">
                    No logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-base-300">
          <span className="text-sm opacity-70">
            Page {pageInfo.number + 1} of {pageInfo.totalPages}
          </span>
          <div className="join">
            <button
              className="join-item btn btn-sm"
              disabled={pageInfo.number === 0}
              onClick={() =>
                setFilters({ ...filters, page: filters.page - 1 }, fetchLogs())
              }
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              className="join-item btn btn-sm"
              disabled={pageInfo.number >= pageInfo.totalPages - 1}
              onClick={() =>
                setFilters({ ...filters, page: filters.page + 1 }, fetchLogs())
              }
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogActivityTable;
