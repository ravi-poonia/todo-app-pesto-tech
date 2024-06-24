import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../db/firebaseConfig";

interface IProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>Error: {error.message}</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
