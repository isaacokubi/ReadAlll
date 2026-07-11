import { useEffect, useState } from "react";
import { getStats } from "../../api/admin";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getStats();
      setStats(data);
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded">
          <h2 className="text-lg">Users</h2>
          <p className="text-xl">{stats.users}</p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-lg">Books</h2>
          <p className="text-xl">{stats.books}</p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-lg">Orders</h2>
          <p className="text-xl">{stats.orders}</p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-lg">Revenue</h2>
          <p className="text-xl">
            ${stats.revenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;