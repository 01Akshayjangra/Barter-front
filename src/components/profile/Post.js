import React from 'react'

import { Avatar, IconButton } from '@mui/material';
import { useState } from 'react';

import "./css/Post.css"
import "./css/Modal.css"

import MyModal from './MyModal';
import Tooltip from '@mui/material/Tooltip';
import { ChatState } from '../context/ChatProvider';

const AvatarHover = (props) => {
    return(
        <><div style={{backgroundColor: 'white', border:'1px solid pink' ,color: 'black'}}>

            <h1>Profile</h1>
        
        </div>
        </>
    )
}

const Post = (props) => {
    const {post} = props;
    const {setUserId}= ChatState();
    // console.log("------------------",post.userId._id)
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const handleUserProfile = () => {
        setUserId(post.userId._id)
    }
    // const {profileImg} = post.userId.pic;
    return (
        <div className="main-post">
            <div className="post-imgContainer" onClick={() => setShowModal(true)}>
                <img className='post-main-img' src={post.image.url} alt="" />
            </div>

            {/* modal  */}
            {/* {showModal && <PostDrawer/> } */}
            {showModal && <MyModal post={post} closeModal={closeModal} />}

            <div className="post-content">

                <div className="post-userInfo">
                    <a href={`/user-profile?userId=${post.userId._id}`}>
                        <Tooltip title={<AvatarHover/>} arrow>
                            <Avatar src={post.userId.pic.url} onClick={handleUserProfile}/>
                        </Tooltip>
                        <span>{post.userId.name}</span>
                    </a>
                </div>

                <div className="post-statistics">
                    <div className="post-statsIcons post-heartStats">
                        <IconButton className="hello">
                            <i className="stat-icons fa-regular fa-heart" />
                        </IconButton>
                        <span>{post.hearts}</span>
                    </div>
                    <div className="post-statsIcons post-viewStats">
                        <IconButton>
                            <i className="stat-icons fa-sharp fa-solid fa-eye" />
                        </IconButton>
                        <span>{post.views}</span>
                    </div>
                    {/* <div className="post-statsIcons post-shareStats">
                        <IconButton>
                            <i className="stat-icons fa-solid fa-share" />
                        </IconButton>
                        <span>{post.shares}</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Post
