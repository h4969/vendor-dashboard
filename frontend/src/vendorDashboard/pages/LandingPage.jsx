
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const LandingPage = () => {
//   const loginToken = localStorage.getItem('loginToken');
//   return loginToken ? <Navigate to="/welcome" /> : <Navigate to="/login" />;
// };

// export default LandingPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const loginToken = localStorage.getItem('loginToken');

  const handleStart = () => {
    if (loginToken) {
      navigate('/welcome');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="landing-container">
      <h1>Welcome to Vendor Dashboard</h1>
      <p>Manage your products, track sales, and grow your business with ease.</p>
      <button onClick={handleStart}>
        {loginToken ? 'Go to Dashboard' : 'Login / Register'}
      </button>
    </div>
  );
};

export default LandingPage;




  
