import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import LoadingDialog from "../loadingDialog/LoadingDialog";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingDialog open={true} />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
}

export default ProtectedRoute;
