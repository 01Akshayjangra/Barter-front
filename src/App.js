import Home from './components/Home';
import Explore from './components/Explore';
import Blog from './components/Blog';
import Learn from './components/Learn';
import Login from './components/Login';
import Modal from './components/Modal';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Messages from './components/Messages';
import Forgetpass from './components/Forgetpass';
import UploadSettings from './components/UploadSettings';
import Upload from './components/Upload';
import {initialState, reducer } from '../src/context/UseReducer'
import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import Profile from './components/Profile';
import UserProfile from './components/UserProfle';
import EditProfile from './components/EditProfile';


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
      <Route exact path="/uploadsettings" element={<UploadSettings />} />
      <Route exact path="/user-profile" element={<UserProfile/>} />
      <Route exact path="/editor" element={<EditProfile/>} />
      <Route exact path="/modal" element={<Modal />} />

      
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>

        <Router>

          <Navbar/>
          <Routing />

        </Router>
      </UserContext.Provider>
    </>
  )
}

export default App;

