import api from "./api";

// Login function
export async function login(form) {
  const { data } = await api.post("/auth/login", form);
  return data;
}

// Register function
export async function register(form) {
  const { data } = await api.post("/auth/register", form);
  return data;
}
