
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const NavBar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const loginToken = localStorage.getItem('loginToken');

  const logoutHandler = () => {
    if (window.confirm("Are you sure to logout?")) {
      localStorage.removeItem("loginToken");
      localStorage.removeItem("firmId");
      localStorage.removeItem("firmName");
      navigate("/login");
    }
  };

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    if (onToggleSidebar) onToggleSidebar(newState);
  };

  return (
    <div className="navSection">
      {/* Hamburger (only mobile via CSS) */}
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="navTitle">Vendor Dashboard</div>

      <div className="navButtons">
        {!loginToken ? (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
          </>
        ) : (
          <button onClick={logoutHandler}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default NavBar;




