import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../shared/types/auth";
import { authApi } from "../shared/api/auth.api";

function AuthProvider({ children }: {children: ReactNode}) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!token) return;

    authApi
      .getCurrentUser()
      .then(({ user }) => {
        setUser(user);
      })
      .catch(() => {
        logout();
      });
  }, [token]);

  const login = (user: User) => {
    localStorage.setItem("token", user.token);
    setToken(user.token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
