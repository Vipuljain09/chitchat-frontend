import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/auth/sign-in");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
