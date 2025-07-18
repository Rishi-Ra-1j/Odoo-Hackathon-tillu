import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBell } from "react-icons/fa";

const mockNotifications = [
  { id: 1, text: "Your question was answered!", isRead: false },
  { id: 2, text: "You were mentioned by @jane_doe", isRead: false },
  { id: 3, text: "Admin: Site maintenance tonight.", isRead: true },
];

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">StackIt</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {(user && (user.role === 'user' || user.role === 'admin')) && (
              <li className="nav-item">
                <Link className="nav-link" to="/ask">Ask Question</Link>
              </li>
            )}
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Panel</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav align-items-center mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link fw-semibold">
                    Hi, {user.username} <span className="badge bg-light text-dark ms-1">{user.role}</span>
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-light ms-2" onClick={() => { logout(); navigate("/login"); }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
