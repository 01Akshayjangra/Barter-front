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
        setLikeLoading(true); // Set loading state to
        try {
            // console.log("running fetch like and views");
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
            // console.log("response",response);
            // console.log('liked',liked);
            // console.log('Counting like', likeCount, 'and views', viewCount);
            setLikeLoading(false); // Set loading state to false
        } catch (error) {
            console.error('Error fetching likes and views:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchLikesAndViews();
        }
    }, [post._id, user]);

    const handleLike = async () => {
        if (user) {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                const response = await axios.post(`${API_URL}/api/posts/like`, { postId: post._id }, config);

                if (response.status === 200) {
                    fetchLikesAndViews()
                } else {
                    console.error('Failed to toggle like');
                }
            } catch (error) {
                console.error('Error toggling like:', error);
            }
        }
        else {
            navigate('/signup');
        }
    };

    const handleView = async () => {
        if (user) {
            try {
                const response = await axios.post(`${API_URL}/api/posts/view`, { postId: post._id });

                if (response.status === 200) {
                    fetchLikesAndViews()
                }
                else {
                    console.error('Failed to veiws in post');
                }
            } catch (error) {
                console.error('Error while viewing post:', error);
            }
        } else {
            navigate('/signup');
        }
    }

    const handleUserProfile = () => {
        setUserId(post.userId._id)
    }

    if (postsLoading) {
        return <>
            <PostLoading />
        </>;
    }

    return (
        <div className="main-post">
            {/* {!filterLoading ? ( */}
            <div className="post-imgContainer" onClick={() => {
                setShowModal(true)
                handleView()
            }}>
                <img className='post-main-img' onContextMenu={(e) => e.preventDefault()} src={post.image.url} alt="" />
            </div>
            {/* // ) : (
                //      <Skeleton variant="rectangular" width={300} height={218} style={{borderRadius: '4px'}}/>
                // )} */}

            {/* modal  */}
            {showModal && <MyModal post={post} closeModal={closeModal} handleLike={handleLike} likeLoading={likeLoading} liked={liked} likeCount={likeCount} viewCount={viewCount} />}

            <div className="post-content">

                <div className="post-userInfo">
                    {user && <a href={(user._id === post.userId._id) ? `/profile` : `/user-profile?userId=${post.userId._id}`}>
                        <LightTooltip color='white' style={{ outline: 'none', backgroundColor: 'white' }} title={<AvatarHover />}>
                            {post.userId.pic && <Avatar src={post.userId.pic.url} onClick={handleUserProfile} />}
                        </LightTooltip>
                        <span>{post.userId.name}</span>
                    </a>}
                    {!user && <Link to={`/user-profile?userId=${post.userId._id}`}>
                        <LightTooltip color='white' style={{ outline: 'none', backgroundColor: 'white' }} title={<AvatarHover />}>
                            {post.userId.pic && <Avatar src={post.userId.pic.url} onClick={handleUserProfile} />}
                        </LightTooltip>
                        <span>{post.userId.name}</span>
                    </Link>}

                </div>

                <div className="post-statistics">
                    <div className="post-statsIcons post-heartStats">
                        {user ? (
                            <IconButton onClick={handleLike}>
                                <i className={liked ? 'stat-icons fa-solid fa-heart liked' : 'stat-icons fa-regular fa-heart'} />
                            </IconButton>

                        ) : (
                            <IconButton onClick={() => { navigate('/signup') }}>
                                <i className={liked ? 'stat-icons fa-solid fa-heart liked' : 'stat-icons fa-regular fa-heart'} />
                            </IconButton>
                            // <Link to='/signup' style={{}} >

                            // </Link>

                        )}
                        {user ? (<>
                            {!likeLoading ? (
                                <span>{likeCount}</span>
                            ) : ('-')}
                        </>) : (
                            <span>{post.hearts.length}</span>
                        )}

                    </div>
                    <div className="post-statsIcons post-viewStats">
                        <IconButton>
                            <i className="stat-icons fa-sharp fa-solid fa-eye" />
                        </IconButton>
                        {user ? (<>
                            {!likeLoading ? (
                                <span>{viewCount}</span>
                            ) : ('-')}
                        </>) : (
                            <span>{post.views}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
