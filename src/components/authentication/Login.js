import React from "react";
import "./css/Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import API_URL from '../api/Api';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import firebase from '../../firebaseConfig';

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Please Fill all the Feilds");
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
        `${API_URL}/api/user/login`,
        { email, password },
        config
      );
      toast.success('logged in successfully');
      localStorage.setItem("userInfo", JSON.stringify(data));
      setOpen(false);
      navigate('/');
      window.location.reload();
    } catch (error) {
      setOpen(false);
      toast.error('Invalid Credentials');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const user = await result.user;
      setOpen(true);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          `${API_URL}/api/user/google-auth`,
          {
            name: user.displayName,
            email: user.email,
            password: user.providerData[0].uid,
            pic: user.photoURL,
          },
          config
        );

        toast.success('register successful');
        localStorage.setItem("userInfo", JSON.stringify(data));
        setOpen(false);
        navigate('/');
        window.location.reload();
        toast.success('logged in successfully');
      } catch (error) {
        toast.error(error)
        setOpen(false);
      }
    } catch (signupError) {
      toast.error('Error while logging in');
      console.log('Login error:', signupError);
    }
  };


  return (
    <div className="main-login">
      <Toaster />
      <div className="login">

        <div className="login-left">
          <div className=" leftdiv ">

            <div className="login__leftContent">
              <Link to='/' ><i className="fa-solid fa-arrow-left fa-fade"></i></Link>
              <Link to='/' >Back to Home Page</Link>
            </div>
            
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
                </div>
              </div>

              <button type="submit" className="loginbtn" style={{ backgroundColor: 'white' }}>
                Log In
              </button>
              <div className='login-google-auth' onClick={handleGoogleLogin}>
                <span><img src="./images/google-short.jpg" alt="" /></span>
                Continue with Google</div>
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