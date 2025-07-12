import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/auth/register", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <form onSubmit={handleSubmit} className="col-md-5 card shadow p-4">
          <h2 className="mb-4 text-primary fw-bold">Register</h2>
          <input type="text" name="username" required placeholder="Username" className="form-control mb-3" value={form.username} onChange={handleChange} />
          <input type="email" name="email" required placeholder="Email" className="form-control mb-3" value={form.email} onChange={handleChange} />
          <input type="password" name="password" required placeholder="Password" className="form-control mb-3" value={form.password} onChange={handleChange} />
          <button type="submit" className="btn btn-primary w-100 mb-2">Register</button>
          {error && <div className="text-danger mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;
