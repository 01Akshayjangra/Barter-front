import React, { useState } from 'react'
import "./css/Modal.css"
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import Post from '../profile/Post'
import axios from 'axios';
import { ChatState } from '../context/ChatProvider';


const MyModal = (props) => {
    const { post, closeModal } = props;
    const { user } = ChatState();
    const [follow, setFollow] = useState(false);

    const [posts, setPosts] = useState([]);

    const payload = { id: post._id };

    const fetchUserData = () => {
        fetch("https://barter-api.onrender.com/recommend", {
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                fetchDataFromBackend(data.recommendations); // call fetchDataFromBackend() with the recommendations array as an argument
            })
            .catch(error => console.error(error));
    };

    const fetchDataFromBackend = recommendations => {
        const postIds = recommendations; // set postIds to the recommendations array

        fetch("api/get/recommendations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: postIds })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPosts(data);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        // fetchUserData();
      }, []); // Call fetchUserData() only once when the component mounts


    // console.log(post.userId._id)
    const followUser = async (userId, token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        try {
            const res = await axios.post("/api/user/follow", post.userId._id, config);

            setFollow(true);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    // Unfollow a user
    const unfollowUser = async (userId, token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        try {
            const res = await axios.post("/api/user/unfollow", post.userId._id, config);
            setFollow(false);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);
    //post._id
    return (
        <>
            <div className='popup__wrapper' onClick={closeModal}></div>

            <div className="modal__rightContent">
                <i className='fa-sharp fa-solid fa-xmark' onClick={closeModal} />

                <div className="modal__item">
                    <IconButton className='modal__itemIcon'>
                        <Link to='/explore'><Avatar src={post.userId.pic.url} /></Link>
                    </IconButton>
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-regular fa-heart" />
                    </IconButton>
                    <span>{post.hearts}</span>
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-sharp fa-solid fa-eye" />
                    </IconButton>
                    <span>{post.views}</span>
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-solid fa-share" />
                    </IconButton>
                    <span>{post.shares}</span>
                </div>
            </div>
            <div className='popup__container'>

                <div className='modal__Main ModalScrollbar'>
                    <div className="modal__header">
                        <Link to='/explore'><Avatar src={post.userId.pic.url} /></Link>
                        <div className='modal__headerInfo'>
                            <h1>{post.userId.name}</h1>
                            {follow ? (
                                <p onClick={unfollowUser}>Unfollow</p>
                            ) : (
                                <p onClick={followUser}>Follow</p>
                            )}

                        </div>
                    </div>
                    <div className="modal__bodyMain">
                        <div className="modal__body">
                            <div className='modal__bodyTitle'>
                                {/* <h1>Title</h1> */}
                                <p>{post.title}</p>
                            </div>
                        </div>
                        <div className="modal__body">
                            <img src={post.image.url} alt="" />
                        </div>
                        <div className="modal__body">
                            <div className='modal__bodyDes'>
                                {/* <h1>Description</h1> */}
                                <p>{post.description}</p>
                            </div>
                        </div>
                        <div className="modal_tools"> <h4>Tools Used -  {post.tools}</h4>
                        </div>
                        {/* {post.tags} */}

                        {/* <div className="modal__body">
                            <div className='modal__bodyPostMain'>

                                <h1>More by {post.userId.name}</h1>
                                <button>View Profile</button>
                                <div className='modal__bodyPosts'>

                                    {posts.map(post => (
                                        <Post
                                            key={post._id}
                                            post={post} />
                                    ))}
                                </div>
                            </div>
                        </div> */}
                        <div className="modal__body">
                            {/* <div className='modal__bodyPostMain'>

                                <h1>More Like This ...</h1>
                                <div className='modal__bodyPosts'>

                                    {posts.map(post => (
                                        <Post
                                            key={post._id}
                                            post={post} />
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default MyModal