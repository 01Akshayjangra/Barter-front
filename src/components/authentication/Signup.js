import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import API_URL from '../api/Api';
import toast, { Toaster } from 'react-hot-toast';
import "./css/Signup.css";
import firebase from '../../firebaseConfig';

const Signup = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [pic, setPic] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault()
    setOpen(true);
    if (!name || !email || !password || !confirmpassword) {
      setOpen(false);
      toast.error("All field are required");
      return;
    }
    if (password !== confirmpassword) {
      toast.error("Confirm password not match");
      setOpen(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/user`,
        {
          name,
          email,
          password,
        },
        config
      );

      toast.success('register successful')
      navigate('/login')
      localStorage.setItem("userInfo", JSON.stringify(data));
      setOpen(false);
    } catch (error) {
      toast.error("error occured")
      setOpen(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const user = await result.user;
      console.log(user.displayName)
      console.log(user.email)
      console.log(user.providerData[0].uid)
      console.log(user)
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
      console.log('Login error:',signupError);
    }
  };



  return (
    <div className="main-signin">
      <Toaster />
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
            <form onSubmit={submitHandler}>

              <h1 htmlFor="name">Username</h1>
              <input
                placeholder="Choose a unique username"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <h1 htmlFor="email">Email</h1>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <h1>Password</h1>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <h1>Confirm Password</h1>
              <input
                type="password"
                placeholder="Confirm your password"
                name="confirmpassword"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                required
              />

              <br />

              <button type="submit" className="signinbtn">
                Sign Up
              </button>
              <div className='google-auth' onClick={handleGoogleLogin}>
                <span><img src="./images/google-short.jpg" alt="" /></span>
                Continue with Google</div>
              <p>
                Already have an account? <Link to="/login"> Login now</Link>
              </p>
            </form>

            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={submitHandler}
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