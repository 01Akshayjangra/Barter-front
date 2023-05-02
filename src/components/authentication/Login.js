import React from "react";
import "./css/Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

import axios from "axios";


const Login = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert("Please Fill all the Feilds")
      return;
    }

    try {
      setOpen(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setOpen(false);
      swal("logged in successfully")
      navigate('/');
      window.location.reload();
    } catch (error) {
      setOpen(false);
      alert("Invalid Credentials")
    }
  };

  return (
    <div className="main-login">
      <div className="login">
        <div className="login-left">
          <div className=" leftdiv ">
            {/* {error && <p>{error}</p>} */}
            <h1>Hello</h1>
            <h1>Designers</h1>
            <p className="para"></p>
          </div>
        </div>

        <div className="login-right">
          <div className="login__rightHead">
            <h1>Login</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login__formContainer">
              <h1 for="email">Email or Username</h1>
              <input
                type="email"
                name="email"
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <h1>Password</h1>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="login__checkBox">
                <input type="checkbox" name="remember" />
                <div className="login__checkboxContent">
                  <p>Remember Me</p>
                  <Link to="/forgetpassword">Forget password?</Link>
                </div>
              </div>

              <button type="submit" className="loginbtn">
                Log In
              </button>
              <p>
                Don't have an account?{" "}
                <Link to="/signup"> Click Here! to create an account now,</Link>{" "}
                it takes less than a minute
              </p>
            </div>
          </form>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleSubmit}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Login;