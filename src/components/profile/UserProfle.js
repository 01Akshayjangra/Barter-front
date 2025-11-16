import * as React from 'react';
import { Avatar } from '@mui/material'
import './css/Profile.css'
import { useEffect, useState, useCallback } from 'react';
import Spinner from '../miscelleneous/Spinner';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Post from './Post';
import axios from "axios";
import { ChatState } from '../context/ChatProvider';
import { useLocation } from 'react-router-dom';
import ScrollTop from '../miscelleneous/ScrollTop';
import API_URL from '../api/Api';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Profile = (props) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    const [loading, setLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [following, setFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);
    const [value, setValue] = useState(0);
    
    const { user } = ChatState();

    // Fetch user posts
    const fetchPosts = useCallback(async () => {
        if (!userId) return;

        try {
            setPostsLoading(true);
            const response = await fetch(`${API_URL}/api/posts/getSomeonesUserPosts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: userId })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setPostsLoading(false);
        }
    }, [userId]);

    // Fetch user data
    const fetchUserData = useCallback(async () => {
        if (!userId) return;

        try {
            const response = await fetch(`${API_URL}/api/user/anotherUser?userId=${userId}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUserInfo(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    // Check follow status
    const checkFollowStatus = useCallback(async () => {
        if (!user || !userId) return;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const response = await axios.get(
                `${API_URL}/api/user/CheckFollow/${userId}`, 
                config
            );
            
            setFollowing(response.data.isFollowing);
        } catch (error) {
            console.error('Error checking follow status:', error);
        }
    }, [user, userId]);

    // OPTIMISTIC FOLLOW/UNFOLLOW UPDATE
    const handleToggleFollow = async () => {
        if (!user) return;

        // Store previous state for rollback
        const previousFollowing = following;
        const previousFollowerCount = userInfo.followers || 0;

        // Optimistically update UI immediately
        setFollowing(!following);
        setFollowLoading(true);
        
        // Update follower count optimistically
        setUserInfo(prev => ({
            ...prev,
            followers: following ? prev.followers - 1 : prev.followers + 1
        }));

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
                    `${API_URL}/api/user/unfollow/${userId}`, 
                    {}, 
                    config
                );

                if (response.status !== 200) {
                    // Rollback on failure
                    setFollowing(previousFollowing);
                    setUserInfo(prev => ({
                        ...prev,
                        followers: previousFollowerCount
                    }));
                }
            } else {
                // Follow the user
                const response = await axios.put(
                    `${API_URL}/api/user/follow/${userId}`, 
                    {}, 
                    config
                );

                if (response.status !== 200) {
                    // Rollback on failure
                    setFollowing(previousFollowing);
                    setUserInfo(prev => ({
                        ...prev,
                        followers: previousFollowerCount
                    }));
                }
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
            // Rollback on error
            setFollowing(previousFollowing);
            setUserInfo(prev => ({
                ...prev,
                followers: previousFollowerCount
            }));
        } finally {
            setFollowLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        const initializeProfile = async () => {
            setLoading(true);
            await Promise.all([
                fetchPosts(),
                fetchUserData(),
                checkFollowStatus()
            ]);
            setLoading(false);
        };

        if (userId) {
            initializeProfile();
        }
    }, [userId, fetchPosts, fetchUserData, checkFollowStatus]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <div className='profile__container'>
                {/* Banner */}
                <div className="profile__banner">
                    <div className="profile__bannerUpload">
                        {userInfo.banner?.url && (
                            <img src={userInfo.banner.url} alt="Profile banner" />
                        )}
                    </div>
                </div>

                <div className="profile__mainContent">
                    <div className="profile__content">
                        {/* Left Sidebar */}
                        <div className="profile__Left">
                            <div className="profile__User">
                                <div className="profile__UserInfo">
                                    {userInfo.pic?.url && (
                                        <Avatar 
                                            src={userInfo.pic.url} 
                                            style={{ cursor: 'default' }} 
                                            alt={userInfo.name}
                                        />
                                    )}
                                    <h2>{userInfo.name || 'Anonymous'}</h2>
                                    <h3>{userInfo.email}</h3>

                                    {/* Follow/Unfollow Button */}
                                    {user && (
                                        <div 
                                            className="profile__editInfo" 
                                            onClick={handleToggleFollow}
                                            style={{
                                                cursor: followLoading ? 'not-allowed' : 'pointer',
                                                marginTop: 20,
                                                opacity: followLoading ? 0.6 : 1
                                            }}
                                        >
                                            <p>{following ? 'Unfollow' : 'Follow'}</p>
                                        </div>
                                    )}

                                    {/* Message Button */}
                                    <Link to="/message">
                                        <div className="profile__createPost">
                                            <p>Message</p>
                                        </div>
                                    </Link>

                                    {/* Stats */}
                                    <div className="profile_statsMain">
                                        <ul>
                                            <li>
                                                <p>Project Views</p>
                                                <span>{userInfo.totalViews || 0}</span>
                                            </li>
                                            <li>
                                                <p>Likes</p>
                                                <span>{userInfo.totalLikes || 0}</span>
                                            </li>
                                            <li>
                                                <p>Followers</p>
                                                <span>{userInfo.followers || 0}</span>
                                            </li>
                                            <li>
                                                <p>Following</p>
                                                <span>{userInfo.following || 0}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Social Links */}
                                    <div className="profile_social">
                                        <a 
                                            href={userInfo.facebook || '#'} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            aria-label="Facebook"
                                        >
                                            <i className="fa-brands fa-facebook" style={{ color: "blue" }} />
                                        </a>
                                        <a 
                                            href={userInfo.linkedin || '#'} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            aria-label="LinkedIn"
                                        >
                                            <i className="fa-brands fa-linkedin" style={{ color: "#0077B5" }} />
                                        </a>
                                        <a 
                                            href={userInfo.youtube || '#'} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            aria-label="YouTube"
                                        >
                                            <i className="fa-brands fa-youtube" style={{ color: "red" }} />
                                        </a>
                                        <a 
                                            href={userInfo.twitter || '#'} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            aria-label="Twitter"
                                        >
                                            <i className="fa-brands fa-twitter" style={{ color: "#1DA1F2" }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content Area */}
                        <div className="profile__Right">
                            <div className="profile__mainUser">
                                <div className="profile__catogory">
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs 
                                                value={value} 
                                                onChange={handleChange} 
                                                aria-label="profile tabs"
                                            >
                                                <Tab label="Posts" {...a11yProps(0)} />
                                                <Tab label="About" {...a11yProps(1)} />
                                            </Tabs>
                                        </Box>

                                        {/* Posts Tab */}
                                        <TabPanel value={value} index={0}>
                                            {postsLoading ? (
                                                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                                    <Spinner />
                                                </div>
                                            ) : (
                                                <div className="profile__Post">
                                                    {posts.length > 0 ? (
                                                        posts.map(post => (
                                                            <Post key={post._id} post={post} />
                                                        ))
                                                    ) : (
                                                        <p style={{ textAlign: 'center', color: '#666' }}>
                                                            No posts yet
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </TabPanel>

                                        {/* About Tab */}
                                        <TabPanel value={value} index={1}>
                                            {userInfo.about ? (
                                                <div>
                                                    <p>{userInfo.about}</p>
                                                </div>
                                            ) : (
                                                <p>No about data found</p>
                                            )}
                                        </TabPanel>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollTop />
        </>
    );
}

export default Profile;