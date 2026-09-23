import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthprotectedProps {
  children: ReactNode;
}

export default function Authprotected({
  children,
}: AuthprotectedProps) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}