import React from "react";
import "../css/Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json();

      if (data) {
        localStorage.setItem("user", JSON.stringify({ name: data.name }));
        localStorage.setItem('token', data.token);
        setOpen(false);
        swal("Login succesfull !");
        navigate('/');
        window.location.reload();
      } else {
        setError("Invalid Credential");
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
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