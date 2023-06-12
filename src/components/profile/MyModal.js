import React, { useState } from 'react'
import "./css/Modal.css"
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import Post from '../profile/Post'
import axios from 'axios';
import { ChatState } from '../context/ChatProvider';
import API_URL from '../api/Api';


const MyModal = (props) => {
    const { post, closeModal, handleLike, loading, liked, likeCount, viewCount } = props;
    const { user } = ChatState();
    const [follow, setFollow] = useState(false);
    const [following, setFollowing] = useState(false);
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

    const handleToggleFollow = async () => {
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          };
          if (following) {
            // Unfollow the user
            await axios.put(`${API_URL}/api/user/unfollow/${post.userId._id}`, {}, config);
            setFollowing(false);
          } else {
            // Follow the user
            await axios.put(`${API_URL}/api/user/follow/${post.userId._id}`, {}, config);
            setFollowing(true);
          }
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        // Fetch follow status
        const CheckFollow = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                // Fetch follow status
                const followStatusResponse = await axios.get(`${API_URL}/api/user/CheckFollow/${post.userId._id}`, config);
                setFollowing(followStatusResponse.data.isFollowing);
                console.log('Following : ', followStatusResponse.data.isFollowing);
            } catch (error) {
                console.error(error);
            }
        };
        CheckFollow()
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
                        <a href={user ? `/user-profile?userId=${post.userId._id}` : `/profile`}>
                            <Avatar src={post.userId.pic.url} />
                        </a>
                    </IconButton>
                </div>

                <div className="modal__item">
                    <IconButton className="modal__itemIcon" onClick={handleLike}>
                        <i className={liked ? 'stat-icons fa-solid fa-heart liked' : 'stat-icons fa-regular fa-heart'} />
                    </IconButton>
                    {!loading ? (
                        <span>{likeCount}</span>
                    ) : (<span>--</span>)}
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-sharp fa-solid fa-eye" />
                    </IconButton>
                    {!loading ? (
                        <span>{viewCount}</span>
                    ) : (<span>--</span>)}
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-solid fa-share" />
                    </IconButton>
                    <span>{post.shares.length}</span>
                </div>
            </div>
            <div className='popup__container'>

                <div className='modal__Main ModalScrollbar'>
                    <div className="modal__header">

                        <a href={user ? `/user-profile?userId=${post.userId._id}` : `/profile`}>
                            <Avatar src={post.userId.pic.url} />
                        </a>
                        <div className='modal__headerInfo'>
                            <h1>{post.userId.name}</h1>

                            {following ? (
                                <p onClick={handleToggleFollow}>Unfollow</p>
                            ) : (
                                <p onClick={handleToggleFollow}>Follow</p>
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