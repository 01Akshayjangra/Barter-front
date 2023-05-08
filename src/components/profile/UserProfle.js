import * as React from 'react';
import { Avatar } from '@mui/material'
import './css/Profile.css'
import { useEffect, useState } from 'react';
import Spinner from '../miscelleneous/Spinner';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Post from './Post';
import axios from "axios";
import { ChatState } from '../context/ChatProvider';
import { useLocation } from 'react-router-dom';

//modal
import Modal from '@mui/material/Modal';
import EditAvatar from './EditAvatar';
import EditBanner from './EditBanner';
import About from './About';

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

const Profile = (props) => {
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
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    var userId = searchParams.get('userId');
    console.log(userId);  

    const [loggedUser, setLoggedUser] = useState();
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    // http://localhost:5000/api/user/anotherUser?userId=64563929988f1add7a3ee334

    const fetchPosts = async (Id) => {
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };


            fetch("/api/posts/getSomeonesUserPosts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: userId })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setPosts(data);
                })
                .catch(error => console.error(error));


        } catch (error) {
          console.error(error.message);
          // Handle the error appropriately
        }
      };
      
      function fetchUserData(userId) {
        fetch(`/api/user/anotherUser?userId=${userId}`)
          .then((response) => response.json())
          .then((data) => {
            // Handle the response data
            setUserInfo(data);
          })
          .catch((error) => {
            // Handle any errors
            console.error(error);
          });
      }
      
    useEffect(() => {
        fetchPosts(userId)
        fetchUserData(userId)
    }, []);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    if (loading) {
        return <Spinner />;
    }

    console.log("eske badd");
    console.log(posts);
    return (
        <div className='profile__container' >
            <div className="profile__banner">
                <div className="profile__bannerUpload">
                    <img src="./images/banner.jpg" alt="banner" />
                </div>
            </div>
            <div className="profile__mainContent">
                <div className="profile__content">
                    <div className="profile__Left">
                        <div className="profile__User">
                            <div className="profile__UserInfo">
                                <Avatar src={userInfo.pic} style={{ cursor: 'default' }} />
                                <h2>{userInfo.name}</h2>
                                <h3>{userInfo.email}</h3>

                                <Link to="#" >
                                    <div className="profile__editInfo">
                                        {/* <EditIcon /> */}
                                        <p>Follow</p>
                                    </div>
                                </Link>
                                <Link to="#" >
                                    <div className="profile__createPost">
                                        <EditIcon />
                                        <p>Message</p>
                                    </div>
                                </Link>
                                <div className="profile_statsMain">
                                    <ul>
                                        <li><p>Project Views</p><span>8745</span></li>
                                        <li><p>Likes</p><span>2369</span></li>
                                        <li><p>Followers</p><span>560</span></li>
                                        <li><p>Following</p><span>94</span></li>
                                    </ul>
                                </div>
                                <div className="profile_social">
                                    <a target="_blank"><i className="fa-brands fa-facebook" style={{ 'color': "blue" }} ></i></a>
                                    <a target="_blank"> <i className="fa-brands fa-linkedin" style={{ 'color': "#0077B5" }}></i></a>
                                    <a target="_blank"><i className="fa-brands fa-youtube" style={{ 'color': "red" }}></i></a>
                                    <a target="_blank"> <i className="fa-brands fa-twitter" style={{ 'color': `#1DA1F2` }}></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile__Right">
                        <div className="profile__mainUser">
                            <div className="profile__catogory">

                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="My posts" {...a11yProps(0)} />
                                            <Tab label="About" {...a11yProps(1)} />

                                        </Tabs>
                                    </Box>

                                    <TabPanel value={value} index={0}>
                                        <div style={{ textAlign: 'center', marginTop: '10px' }} >
                                            {loading && <Spinner />}
                                        </div>
                                        <div className="profile__Post">


                                            {posts.map(post => (
                                                <Post key={post._id} post={post} />
                                            ))}

                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <About />
                                    </TabPanel>

                                </Box>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Profile

