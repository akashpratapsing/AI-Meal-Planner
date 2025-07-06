import { useState } from "react";

const LogActivityTable = () => {
  const [logs, setLogs] = useState([]);

  // useEffect(() => {
  //   fetchActivityLogs().then(setLogs);
  // }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md overflow-auto">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      <table className="w-full text-sm text-left">
        <thead><tr><th>User</th><th>Action</th><th>Date</th></tr></thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx}>
              <td>{log.user}</td>
              <td>{log.action}</td>
              <td>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogActivityTable;