import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1 className="welcome-title">Welcome to Vendor Dashboard</h1>
        <p className="welcome-subtitle">
          Manage your products, track sales, and grow your business with ease.
        </p>
        <div className="welcome-buttons">
          <button className="btn login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="btn register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;



