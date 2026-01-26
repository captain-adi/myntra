import React from "react";
import { Navigate } from "react-router-dom";
import LoadingDialog from "../loadingDialog/LoadingDialog";
import { useAppSelector } from "../../hooks/hook";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAppSelector((state) => state.auth);
  if (loading) {
    return <LoadingDialog open={true} />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
}

export default ProtectedRoute;
