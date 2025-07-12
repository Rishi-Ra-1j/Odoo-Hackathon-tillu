import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

// Attach JWT to every request (if logged in)
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("stackitUser"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
