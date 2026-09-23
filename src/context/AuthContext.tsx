import { createContext } from "react";

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);