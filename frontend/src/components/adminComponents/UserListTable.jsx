import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";
import { createUser, updateUserRoles } from "../../services/adminService";
import { deleteUserById } from "../../services/userService";
import { Shield, Users, Trash2, Edit, Plus } from "lucide-react";

const UserListTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // form states
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    roles: ["ROLE_USER"],
  });
  const [roles, setRoles] = useState([]);

  // Load users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    getAllUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users", err);
        setLoading(false);
      });
  };

  // Create user
  const handleCreateUser = async () => {
    try {
      await createUser(newUser);
      setShowCreateModal(false);
      setNewUser({ name: "", email: "", password: "", roles: ["ROLE_USER"] });
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserById(id);
        fetchUsers();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // Update roles
  const handleUpdateRoles = async () => {
    try {
      await updateUserRoles(selectedUser.id, roles);
      setShowRoleModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const getRoleBadge = (roles) => {
    if (roles.includes("ADMIN")) return "badge-error";
    if (roles.includes("MODERATOR")) return "badge-warning";
    return "badge-success";
  };

  const getPlanBadge = (plan) => {
    const badges = {
      Basic: "badge-neutral",
      Pro: "badge-info",
      Premium: "badge-primary",
      Enterprise: "badge-accent",
    };
    return badges[plan] || badges.Basic;
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary" />
            <h2 className="card-title text-xl">All Users</h2>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-4 h-4 mr-1" /> Create User
          </button>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th className="hidden md:table-cell">Role(s)</th>
                <th className="hidden lg:table-cell">Plan</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <div className="skeleton h-4 w-8"></div>
                    </td>
                    <td>
                      <div className="skeleton h-6 w-32"></div>
                    </td>
                    <td className="hidden md:table-cell">
                      <div className="skeleton h-6 w-20"></div>
                    </td>
                    <td className="hidden lg:table-cell">
                      <div className="skeleton h-6 w-20"></div>
                    </td>
                    <td>
                      <div className="skeleton h-6 w-16"></div>
                    </td>
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id} className="hover">
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          {user.profileImageUrl ? (
                            <div className="w-10 h-10 rounded-full">
                              <img
                                src={user.profileImageUrl}
                                alt={user.name || "User"}
                              />
                            </div>
                          ) : (
                            <div className="bg-primary text-primary-content rounded-full w-10 h-10 flex items-center justify-center">
                              <span className="text-sm font-semibold">
                                {user.name?.charAt(0).toUpperCase() ||
                                  user.email?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="font-medium">{user.name || "-"}</div>
                          <div className="text-sm opacity-70">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {user.roles?.map((role, idx) => (
                          <div
                            key={idx}
                            className={`badge badge-sm ${getRoleBadge(
                              user.roles
                            )}`}
                          >
                            {role}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell">
                      <div className={`badge ${getPlanBadge(user.plan)}`}>
                        {user.plan || "N/A"}
                      </div>
                    </td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-xs btn-outline"
                        onClick={() => {
                          setSelectedUser(user);
                          setRoles(user.roles || []);
                          setShowRoleModal(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12">
                    <div className="flex flex-col items-center">
                      <Users className="w-12 h-12 opacity-30 mb-4" />
                      <p className="text-base-content/60">No users found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create User</h3>
            <div className="form-control mt-4">
              <label className="label">Name</label>
              <input
                type="text"
                className="input input-bordered"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input input-bordered"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <label className="label">Roles</label>
              <div className="flex gap-4">
                {["ROLE_USER", "ROLE_ADMIN"].map((role) => (
                  <label key={role} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={newUser.roles.includes(role)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...newUser.roles, role]
                          : newUser.roles.filter((r) => r !== role);
                        setNewUser({ ...newUser, roles: updated });
                      }}
                    />
                    {role}
                  </label>
                ))}
              </div>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleCreateUser}>
                Create
              </button>
              <button className="btn" onClick={() => setShowCreateModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Roles Modal */}
      {showRoleModal && selectedUser && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Update Roles for {selectedUser.name}
            </h3>
            <div className="form-control mt-4">
              {["USER", "ADMIN"].map((role) => (
                <label key={role} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={roles.includes(role)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...roles, role]
                        : roles.filter((r) => r !== role);
                      setRoles(updated);
                    }}
                  />
                  {role}
                </label>
              ))}
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleUpdateRoles}>
                Save
              </button>
              <button className="btn" onClick={() => setShowRoleModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListTable;
