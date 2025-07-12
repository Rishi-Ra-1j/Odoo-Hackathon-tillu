import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== "admin")
    return (
      <div className="container my-5">
        <div className="alert alert-danger">Access denied. Admins only.</div>
      </div>
    );

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h2 className="text-primary fw-bold mb-3">Admin Dashboard</h2>
        <ul className="list-group mb-4">
          <li className="list-group-item">Reject inappropriate or spammy questions/answers (feature soon!)</li>
          <li className="list-group-item">Ban users who violate platform policies (feature soon!)</li>
          <li className="list-group-item">Monitor all user activity (feature soon!)</li>
          <li className="list-group-item">Send platform-wide messages (feature soon!)</li>
          <li className="list-group-item">Download reports of user activity, feedback logs (feature soon!)</li>
        </ul>
        <div className="alert alert-info">
          <strong>Note:</strong> You can expand this dashboard to include user moderation, question review, global announcements, and more!
        </div>
      </div>
    </div>
  );
}
