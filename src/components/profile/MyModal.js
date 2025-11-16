import React, { useState, useEffect, useCallback } from 'react'
import "./css/Modal.css"
import { Link } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import Post from '../profile/Post'
import axios from 'axios';
import { ChatState } from '../context/ChatProvider';
import API_URL from '../api/Api';


const MyModal = (props) => {
    const { post, closeModal, handleLike, likeLoading, liked, likeCount, viewCount } = props;
    const { user } = ChatState();
    const [following, setFollowing] = useState(false);
    const [posts, setPosts] = useState([]);
    const [recommendationsLoading, setRecommendationsLoading] = useState(true);
    const [followLoading, setFollowLoading] = useState(false);
    const [followStatusLoading, setFollowStatusLoading] = useState(true);

    // Fetch recommendations with error handling
    const fetchUserData = useCallback(async () => {
        try {
            setRecommendationsLoading(true);
            const payload = { id: post._id };

            const response = await fetch("https://barter-api.onrender.com/recommend", {
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recommendations');
            }

            const data = await response.json();
            await fetchDataFromBackend(data.recommendations);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setRecommendationsLoading(false);
        }
    }, [post._id]);

    // Fetch posts from backend
    const fetchDataFromBackend = async (recommendations) => {
        try {
            const response = await fetch(`${API_URL}/api/get/recommendations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: recommendations })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setRecommendationsLoading(false);
        }
    };

    // OPTIMISTIC UPDATE FOR FOLLOW/UNFOLLOW
    const handleToggleFollow = async () => {
        if (!user) return;

        // Store previous state for rollback
        const previousFollowing = following;
        
        // Optimistically update UI immediately
        setFollowing(!following);
        setFollowLoading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            if (previousFollowing) {
                // Unfollow the user
                const response = await axios.put(
                    `${API_URL}/api/user/unfollow/${post.userId._id}`, 
                    {}, 
                    config
                );
                
                if (response.status !== 200) {
                    // Rollback on failure
                    setFollowing(previousFollowing);
                }
            } else {
                // Follow the user
                const response = await axios.put(
                    `${API_URL}/api/user/follow/${post.userId._id}`, 
                    {}, 
                    config
                );
                
                if (response.status !== 200) {
                    // Rollback on failure
                    setFollowing(previousFollowing);
                }
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
            // Rollback on error
            setFollowing(previousFollowing);
        } finally {
            setFollowLoading(false);
        }
    };

    // Check initial follow status
    const checkFollowStatus = useCallback(async () => {
        if (!user) {
            setFollowStatusLoading(false);
            return;
        }

        try {
            setFollowStatusLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const response = await axios.get(
                `${API_URL}/api/user/CheckFollow/${post.userId._id}`, 
                config
            );
            
            setFollowing(response.data.isFollowing);
        } catch (error) {
            console.error('Error checking follow status:', error);
        } finally {
            setFollowStatusLoading(false);
        }
    }, [user, post.userId._id]);

    // Initialize modal
    useEffect(() => {
        // Prevent body scroll
        document.body.style.overflowY = "hidden";

        // Fetch data
        checkFollowStatus();
        fetchUserData();

        // Cleanup on unmount
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, [checkFollowStatus, fetchUserData]);

    // Check if it's user's own profile
    const isOwnProfile = user && user._id === post.userId._id;
    const profileLink = isOwnProfile ? `/profile` : `/user-profile?userId=${post.userId._id}`;

    return (
        <>
            <div className='popup__wrapper' onClick={closeModal}></div>

            <div className="modal__rightContent">
                <i className='fa-sharp fa-solid fa-xmark' onClick={closeModal} />

                {/* Avatar */}
                <div className="modal__item">
                    <IconButton className='modal__itemIcon'>
                        <a href={profileLink}>
                            {post.userId.pic && <Avatar src={post.userId.pic.url} />}
                        </a>
                    </IconButton>
                </div>

                {/* Like Button */}
                <div className="modal__item">
                    <IconButton className="modal__itemIcon" onClick={handleLike}>
                        <i className={
                            liked 
                                ? 'stat-icons fa-solid fa-heart liked' 
                                : 'stat-icons fa-regular fa-heart'
                        } />
                    </IconButton>
                    <span>{likeCount}</span>
                </div>

                {/* View Count */}
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-sharp fa-solid fa-eye" />
                    </IconButton>
                    <span>{viewCount}</span>
                </div>
            </div>

            <div className='popup__container'>
                <div className='modal__Main ModalScrollbar'>
                    {/* Header */}
                    <div className="modal__header">
                        <a href={profileLink}>
                            {post.userId.pic && <Avatar src={post.userId.pic.url} />}
                        </a>
                        <div className='modal__headerInfo'>
                            <h1>{post.userId.name}</h1>

                            {!isOwnProfile && (
                                followStatusLoading ? (
                                    <p style={{ opacity: 0.5, cursor: 'default' }}>
                                        Loading...
                                    </p>
                                ) : (
                                    <p 
                                        onClick={handleToggleFollow} 
                                        className={followLoading ? 'follow-btn-loading' : ''}
                                        style={{ 
                                            cursor: followLoading ? 'not-allowed' : 'pointer',
                                            opacity: followLoading ? 0.6 : 1 
                                        }}
                                    >
                                        {following ? 'Unfollow' : 'Follow'}
                                    </p>
                                )
                            )}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="modal__bodyMain">
                        {/* Title */}
                        <div className="modal__body">
                            <div className='modal__bodyTitle'>
                                <h1>Title</h1>
                                <p>{post.title}</p>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="modal__body">
                            <img 
                                src={post.image.url} 
                                onContextMenu={(e) => e.preventDefault()} 
                                alt={post.title || "Post image"} 
                            />
                        </div>

                        {/* Description */}
                        <div className="modal__body">
                            <div className='modal__bodyDes'>
                                <h1>Description</h1>
                                <p>{post.description}</p>
                            </div>
                        </div>

                        {/* Tools */}
                        {post.tools && (
                            <div className="modal_tools">
                                <h4>Tools Used - {post.tools}</h4>
                            </div>
                        )}

                        {/* Recommendations */}
                        <div className="modal__body">
                            <div className='modal__bodyPostMain'>
                                <h1>More Like This...</h1>
                                
                                {recommendationsLoading ? (
                                    <div className="recommendations-loading">
                                        <p>Loading recommendations...</p>
                                    </div>
                                ) : (
                                    <div className='modal__bodyPosts'>
                                        {posts.length > 0 ? (
                                            posts.map(recommendedPost => (
                                                <Post
                                                    key={recommendedPost._id}
                                                    post={recommendedPost} 
                                                />
                                            ))
                                        ) : (
                                            <p>No recommendations available</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyModal