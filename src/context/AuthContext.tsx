import { createContext } from "react";
import { User } from "../shared/types/auth";

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  user: User | null;
}


export const AuthContext = createContext<AuthContextValue | null>(null);

