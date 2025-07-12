import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <form onSubmit={handleSubmit} className="col-md-5 card shadow p-4">
          <h2 className="mb-4 text-primary fw-bold">Login</h2>
          <input type="email" name="email" required placeholder="Email" className="form-control mb-3" value={form.email} onChange={handleChange} />
          <input type="password" name="password" required placeholder="Password" className="form-control mb-3" value={form.password} onChange={handleChange} />
          <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
          {error && <div className="text-danger mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
