import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Use your login service, which talks to your backend via api.js!
      const res = await loginService(form);
      login(res); // Save user+token in context/localStorage
      navigate("/"); // Redirect to home
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    }
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <form onSubmit={handleSubmit} className="col-md-5 card shadow p-4">
          <h2 className="mb-4 text-primary fw-bold">Login</h2>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="form-control mb-3"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="form-control mb-3"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="btn btn-primary w-100 mb-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <div className="text-danger mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}
