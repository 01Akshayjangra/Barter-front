import React from 'react'
import "./css/Post.css"
import { Avatar, IconButton } from '@mui/material';
import { useState } from 'react';
import MyModal from './MyModal';
import "./css/Modal.css"
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import PostDrawer from './PostDrawer';

const AvatarHover = (props) => {
    return(
        <><div style={{backgroundColor: 'white', border:'1px solid pink' ,color: 'black'}}>

            <h1>Profile</h1>
        
        </div>
        </>
    )
}

const Post = (props) => {
    const { postImage, postName, views, hearts, shares } = props;

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);

    return (
        <div className="main-post">
            <div className="post-imgContainer" onClick={() => setShowModal(true)}>
                <img className='post-main-img' src={postImage} alt="" />
            </div>

            {/* modal  */}
            {/* {showModal && <PostDrawer/> } */}
            {showModal && <MyModal closeModal={closeModal} postImage={postImage} postName={postName} hearts={hearts} views={views} shares={shares} />}

            <div className="post-content">

                <div className="post-userInfo">
                    <a href="/myprofile">
                        <Tooltip title={<AvatarHover/>} arrow>
                            <Avatar />
                        </Tooltip>
                        <span>{postName}</span>
                    </a>
                </div>

                <div className="post-statistics">
                    <div className="post-statsIcons post-heartStats">
                        <IconButton className="hello">
                            <i className="stat-icons fa-regular fa-heart" />
                        </IconButton>
                        <span>{hearts}</span>
                    </div>
                    <div className="post-statsIcons post-viewStats">
                        <IconButton>
                            <i className="stat-icons fa-sharp fa-solid fa-eye" />
                        </IconButton>
                        <span>{views}</span>
                    </div>
                    <div className="post-statsIcons post-shareStats">
                        <IconButton>
                            <i className="stat-icons fa-solid fa-share" />
                        </IconButton>
                        <span>{shares}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
