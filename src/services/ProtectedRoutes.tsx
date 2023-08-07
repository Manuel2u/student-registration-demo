import React from "react";
import { Navigate } from "react-router-dom";
import auth from "./cookie-config";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoutes({ children }: Props) {
  const token = auth.getCipher();
  if (token) {
    return <>{children}</>;
  }
  return <Navigate to="/login" />;
}
