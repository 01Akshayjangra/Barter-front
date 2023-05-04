//Authentications
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Forgetpass from './components/authentication/Forgetpass';

//Main Pages
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home';
import Explore from './components/pages/Explore';
import Blog from './components/pages/Blog';
import Learn from './components/pages/Learn';

//Messages
import Messages from './components/chat/Messages';

//User-Profile
import Modal from './components/profile/Modal';
import Upload from './components/profile/Upload';
import Profile from './components/profile/Profile';
import UserProfile from './components/profile/UserProfle';
import EditProfile from './components/profile/EditProfile';

import {initialState, reducer } from '../src/context/UseReducer';
import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import { Footer } from './components/pages/Footer';


export const UserContext = createContext();


const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/explore" element={<Explore />} />
      <Route exact path="/profile" element={<Profile/> } />
      <Route exact path="/blog" element={<Blog />} />
      <Route exact path="/learn" element={<Learn />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/message" element={<Messages />} />
      <Route exact path="/forgetpassword" element={<Forgetpass />} />
      <Route exact path="/upload" element={<Upload />} />
      <Route exact path="/user-profile" element={<UserProfile/>} />
      <Route exact path="/editor" element={<EditProfile/>} />
      <Route exact path="/modal" element={<Modal />} /> 
    </Routes>
  )
}

function App() {

  return (
    <>
        <Router>

          <Navbar/>
          <Routing />
          <Footer/>

        </Router>
    </>
  )
}

export default App;

