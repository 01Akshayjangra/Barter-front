import React, { useEffect } from 'react'

import { Avatar, IconButton } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

import "./css/Post.css"
import "./css/Modal.css"

import MyModal from './MyModal';
import { ChatState } from '../context/ChatProvider';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import API_URL from '../api/Api';
import Spinner from '../miscelleneous/Spinner';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import PostLoading from '../miscelleneous/PostLoading';
import Skeleton from '@mui/material/Skeleton';


const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

const AvatarHover = (props) => {
    return (
        <><div style={{ backgroundColor: 'white', outline: 'none', border: '1px solid pink', color: 'black' }}>
            <h1>Profile</h1>
        </div>
        </>
    )
}

const Post = (props) => {
    const { post } = props;
    const { user, setUserId, filterLoading, postsLoading } = ChatState();
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);

    const [liked, setLiked] = useState(false);
    const [shared, setShared] = useState(false);
    const [viewed, setViewed] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    const navigate = useNavigate();

    const fetchLikesAndViews = async () => {
        setLikeLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const response = await axios.get(`${API_URL}/api/posts/checkLikes/${post._id}`, config);

            const { liked, likeCount, viewCount } = response.data;
            setLiked(liked);
            setLikeCount(likeCount);
            setViewCount(viewCount);
            setLikeLoading(false);
        } catch (error) {
            console.error('Error fetching likes and views:', error);
            setLikeLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchLikesAndViews();
        }
    }, [post._id, user]);

    // OPTIMISTIC UPDATE FOR LIKE
    const handleLike = async () => {
        if (!user) {
            navigate('/signup');
            return;
        }

        // Store previous state for rollback
        const previousLiked = liked;
        const previousLikeCount = likeCount;

        // Optimistically update UI immediately
        setLiked(!liked);
        setLikeCount(prevCount => liked ? prevCount - 1 : prevCount + 1);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const response = await axios.post(
                `${API_URL}/api/posts/like`, 
                { postId: post._id }, 
                config
            );

            if (response.status !== 200) {
                // Rollback on failure
                setLiked(previousLiked);
                setLikeCount(previousLikeCount);
                console.error('Failed to toggle like');
            }
            // Optionally sync with server response
            // const { liked: serverLiked, likeCount: serverLikeCount } = response.data;
            // setLiked(serverLiked);
            // setLikeCount(serverLikeCount);
        } catch (error) {
            // Rollback on error
            setLiked(previousLiked);
            setLikeCount(previousLikeCount);
            console.error('Error toggling like:', error);
        }
    };

    // OPTIMISTIC UPDATE FOR VIEW
    const handleView = async () => {
        if (!user) {
            navigate('/signup');
            return;
        }

        // Only increment view once per session (optional)
        if (viewed) return;

        // Store previous state
        const previousViewCount = viewCount;

        // Optimistically update UI
        setViewed(true);
        setViewCount(prevCount => prevCount + 1);

        try {
            const response = await axios.post(
                `${API_URL}/api/posts/view`, 
                { postId: post._id }
            );

            if (response.status !== 200) {
                // Rollback on failure
                setViewed(false);
                setViewCount(previousViewCount);
                console.error('Failed to register view');
            }
        } catch (error) {
            // Rollback on error
            setViewed(false);
            setViewCount(previousViewCount);
            console.error('Error while viewing post:', error);
        }
    }

    const handleUserProfile = () => {
        setUserId(post.userId._id)
    }

    if (postsLoading) {
        return <PostLoading />;
    }

    return (
        <div className="main-post">
            <div className="post-imgContainer" onClick={() => {
                setShowModal(true)
                handleView()
            }}>
                <img 
                    className='post-main-img' 
                    onContextMenu={(e) => e.preventDefault()} 
                    src={post.image.url} 
                    alt="" 
                />
            </div>

            {/* modal  */}
            {showModal && (
                <MyModal 
                    post={post} 
                    closeModal={closeModal} 
                    handleLike={handleLike} 
                    likeLoading={likeLoading} 
                    liked={liked} 
                    likeCount={likeCount} 
                    viewCount={viewCount} 
                />
            )}

            <div className="post-content">
                <div className="post-userInfo">
                    {user && (
                        <a href={(user._id === post.userId._id) ? `/profile` : `/user-profile?userId=${post.userId._id}`}>
                            <LightTooltip 
                                color='white' 
                                style={{ outline: 'none', backgroundColor: 'white' }} 
                                title={<AvatarHover />}
                            >
                                {post.userId.pic && (
                                    <Avatar src={post.userId.pic.url} onClick={handleUserProfile} />
                                )}
                            </LightTooltip>
                            <span>{post.userId.name}</span>
                        </a>
                    )}
                    {!user && (
                        <Link to={`/user-profile?userId=${post.userId._id}`}>
                            <LightTooltip 
                                color='white' 
                                style={{ outline: 'none', backgroundColor: 'white' }} 
                                title={<AvatarHover />}
                            >
                                {post.userId.pic && (
                                    <Avatar src={post.userId.pic.url} onClick={handleUserProfile} />
                                )}
                            </LightTooltip>
                            <span>{post.userId.name}</span>
                        </Link>
                    )}
                </div>

                <div className="post-statistics">
                    <div className="post-statsIcons post-heartStats">
                        <IconButton onClick={handleLike}>
                            <i className={
                                liked 
                                    ? 'stat-icons fa-solid fa-heart liked' 
                                    : 'stat-icons fa-regular fa-heart'
                            } />
                        </IconButton>
                        
                        {user ? (
                            !likeLoading ? (
                                <span>{likeCount}</span>
                            ) : (
                                <span>-</span>
                            )
                        ) : (
                            <span>{post.hearts.length}</span>
                        )}
                    </div>

                    <div className="post-statsIcons post-viewStats">
                        <IconButton>
                            <i className="stat-icons fa-sharp fa-solid fa-eye" />
                        </IconButton>
                        
                        {user ? (
                            !likeLoading ? (
                                <span>{viewCount}</span>
                            ) : (
                                <span>-</span>
                            )
                        ) : (
                            <span>{post.views}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post