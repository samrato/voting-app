import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");

    // Redirect to login
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="logout-message">
      <p>Logging out...</p>
    </div>
  );
};

export default LogOut;
