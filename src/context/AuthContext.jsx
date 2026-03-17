import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("cherry_user");
    const token = localStorage.getItem("cherry_token");
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("cherry_user", JSON.stringify(userData));
    localStorage.setItem("cherry_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("cherry_user");
    localStorage.removeItem("cherry_token");
    setUser(null);
  };

  const updatePoints = (newPoints) => {
    const updated = { ...user, points: newPoints };
    setUser(updated);
    localStorage.setItem("cherry_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updatePoints }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);