import { useState } from "react";

const UserListTable = () => {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetchAllUsers().then(setUsers);
  // }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md overflow-auto">
      <h3 className="text-lg font-semibold mb-4">All Users</h3>
      <table className="w-full text-sm text-left">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={idx}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListTable;