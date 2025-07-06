import ActiveUsersChart from "../components/adminComponents/ActiveUsersChart";
import LogActivityTable from "../components/adminComponents/LogActivityTable";
import TopFeaturesChart from "../components/adminComponents/TopFeaturesChart";
import UserCountCard from "../components/adminComponents/UserCountCard";
import UserListTable from "../components/adminComponents/UserListTable";
import UserRoleChart from "../components/adminComponents/UserRoleChart";

const AdminPanel = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="space-y-6">
          <UserCountCard />
          <UserRoleChart />
          <ActiveUsersChart />
        </div>
        <div className="space-y-6">
          <TopFeaturesChart />
          <LogActivityTable />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <UserListTable />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
