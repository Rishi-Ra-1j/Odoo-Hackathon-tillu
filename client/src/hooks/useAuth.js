import { useState } from "react";
export default function useAuth() {
  const [user, setUser] = useState(null);
  const login = (user) => setUser(user);
  const logout = () => setUser(null);
  return { user, login, logout };
}
