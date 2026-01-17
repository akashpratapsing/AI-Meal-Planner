import UserCountCard from "../components/adminComponents/UserCountCard";
import UserListTable from "../components/adminComponents/UserListTable";
import UserRoleChart from "../components/adminComponents/UserRoleChart";

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 md:px-6 lg:px-10 py-6">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-sm md:text-base opacity-70">
            Monitor and manage your application
          </p>
        </div>

        <div className="space-y-10">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            <UserCountCard />
            {/* Add more <UserCountCard /> here if needed */}
          </div>

          {/* Chart Section */}
          {/* <div className="bg-base-100 shadow rounded-2xl p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4">User Role Distribution</h2>
            <UserRoleChart />
          </div> */}

          {/* Tables Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-base-100 shadow rounded-2xl p-4 md:p-6">
              <h2 className="text-xl font-semibold mb-4">User List</h2>
              <UserListTable />
            </div>
            {/* <div className="bg-base-100 shadow rounded-2xl p-4 md:p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <LogActivityTable />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
