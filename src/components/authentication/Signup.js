import React, { useState } from 'react';
import "./css/Signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

const Signup = () => {
  const [open, setOpen] = React.useState(false);
  const [userRes, setUserRes] = useState("");
  const [pic, setPic] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();


  const submitHandler = async (e) => {
    e.preventDefault()
    setOpen(true);
    if (!name || !email || !phone || !password || !confirmpassword) {
      setOpen(false);
      return;
    }
    if (password !== confirmpassword) {
      alert("password not match")
      setOpen(false);
      return;
    }
    console.log(name, email, phone, password, pic);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://barter-backend.onrender.com/api/user/",
        {
          name,
          email,
          phone,
          password,
          pic,
        },
        config
      );

      // console.log(data);

      alert('register successful')
      localStorage.setItem("userInfo", JSON.stringify(data));
      setOpen(false);
      // history.push("/chats");
    } catch (error) {
      alert("error occured")
      setOpen(false);
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

              <h1 htmlFor="phone">Phone</h1>
              <input
                type="number"
                placeholder="Enter your phone number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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