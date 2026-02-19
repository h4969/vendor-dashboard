
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../data/apiPath';

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login success');
        setEmail("");
        setPassword("");

        
        localStorage.setItem('loginToken', data.token);
        localStorage.setItem('vendorId', data.vendor._id);

        if (data.firmId) {
          localStorage.setItem('firmId', data.firmId);
        }

        
        const firmName = data.vendor.firm?.[0]?.firmName;
        if (firmName) {
          localStorage.setItem('firmName', firmName);
        }
        navigate("/welcome");        
        //showWelcomeHandler();
        window.location.reload();
      } else {
        alert(data.error || "Login failed");
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed due to an error");
    }
  };

  return (
    <div className='loginPage'>
    <div className="loginSection">
      <form className='authForm' onSubmit={loginHandler} autoComplete='off'>
        <marquee><h3>Vendor Login</h3></marquee>
        <label>Email</label>
        <input
          type="text"
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
        /><br />

        <label>Password</label>
        <input
          type="password"
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
        /><br />

        <div className="btnSubmit">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;



