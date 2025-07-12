import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== "admin")
    return <div className="container my-5"><div className="alert alert-danger">Access denied</div></div>;

  // Here, you could list users, add ban/approve/report features, broadcast msg, etc.
  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h2 className="text-primary fw-bold mb-3">Admin Dashboard</h2>
        <ul>
          <li>Reject spam skill descriptions (feature soon!)</li>
          <li>Ban users (feature soon!)</li>
          <li>Send platform-wide messages (feature soon!)</li>
          <li>Download reports (feature soon!)</li>
        </ul>
      </div>
    </div>
  );
};
export default AdminDashboard;
