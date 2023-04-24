import React, { useState } from 'react';
import "../css/Signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Signup = () => {
  const [open, setOpen] = React.useState(false);

  const [userRes, setUserRes] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cPassword: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
      setOpen(true);

      try {
        const response = await fetch('/api/user/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        setOpen(false);
        setUserRes(data.message);
      } catch (error) {
        setUserRes(error.message);
      }

    };

    return (
      <div className="main-signin">
        {userRes ? (
          <ul>
            <h1 style={{ color: "red" }}>{userRes}</h1>
          </ul>
        ) : (<ul>
          <h1 style={{ color: "white" }}>{userRes}</h1>
        </ul>
        )}
        <div className="signin">

          <div className="signin-left">
            <div className=" leftdiv ">
              <h1>Welcome</h1>
              <h1>To Barter</h1>
              <p className="para"></p>
            </div>
          </div>

          <div className="signin-right">
            <div className="signin__rightHead">
              <h1>Sign Up</h1>
            </div>

            <div className="signin__formContainer">
              <form onSubmit={handleSubmit}>
                <h1 htmlFor="name">Username</h1>
                <input
                  type="text"
                  placeholder="Choose a unique username"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <h1 htmlFor="email">Email</h1>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <h1 htmlFor="phone">Phone</h1>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <h1>Password</h1>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <h1>Confirm Password</h1>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  name="cPassword"
                  value={formData.cPassword}
                  onChange={handleChange}
                  required
                />

                <br />

                <button type="submit" className="signinbtn">
                  Sign Up
                </button>
                <p>
                  Already have an account? <Link to="/login"> Login now</Link>
                </p>
              </form>
              
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleSubmit}
              >
                <CircularProgress color="inherit" />
              </Backdrop>

            </div>

          </div>
        </div>
      </div>
    );
  };

  export default Signup;