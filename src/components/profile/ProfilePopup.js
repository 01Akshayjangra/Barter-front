import * as React from 'react';
import "./css/ProfilePopup.css"
import { Link } from 'react-router-dom'
import { Avatar, IconButton } from '@mui/material';

export default function ProfilePopup(props) {
  const { postImage, postName, views, hearts, shares } = props;
  
  return (
    <>
      <div className='popup__modalMain'>
        <Link target='_top' to="/"><i className="fa-sharp fa-solid fa-xmark" /></Link>
        <div className="post-userInfo">
          <a href="/myprofile">
            <Avatar />
            <span>{postName}</span>
          </a>
        </div>
        <div className='popup__modal'>
          <div className="popup__modalImg">
            <img className='post-main-img' src={postImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}