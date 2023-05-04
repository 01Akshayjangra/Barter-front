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
import { ChatState } from '../../context/ChatProvider';

//modal
import Modal from '@mui/material/Modal';
import EditAvatar from './EditAvatar';

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

    const [loggedUser, setLoggedUser] = useState();
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([]);
    const { user } = ChatState();

    const fetchPosts = async () => {
        // console.log(user._id);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/posts/user", config);
            setPosts(data);
        } catch (error) {
            alert("error occured while fetching posts")
        }
    };
    const [userInfo, setUserInfo] = useState([]);
    const handleUserInfo = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/user/info", config);
            setUserInfo(data);
        } catch (error) {
            alert('failed to load user info')
        }
    }

    useEffect(() => {
        setLoading(true)
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchPosts()
        handleUserInfo()
        setLoading(false)

    }, []);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    //Avatar upload modal
    const [openEditAvatar, setOpenEditAvatar] = React.useState(false);
    const handleOpeEditAvatar = () => setOpenEditAvatar(true);
    const handleCloseEditAvatar = () => setOpenEditAvatar(false);

    return (
        <div className='profile__container' >
            <div className="profile__banner">
                <div className="profile__bannerUpload">
                    <img src="./images/banner.jpg" alt="banner" />
                    {/* <div className="profile__dropIcon">
                        <div>
                            <UploadIcon style={{ fontSize: '30px' }} />
                        </div>
                        <p>Optimal dimensions 3200 x 410px</p>
                    </div> */}
                </div>
            </div>
            <div className="profile__mainContent">
                <div className="profile__content">
                    <div className="profile__Left">
                        <div className="profile__User">
                            <div className="profile__UserInfo">
                                <Avatar src={userInfo.pic} onClick={handleOpeEditAvatar}/>
                                {/* <div className="profile__editIcon" >
                                    <i class="fa-sharp fa-solid fa-pen"></i>
                                </div> */}
                                <div className='profile__editIconAvatar'>
                                    <Modal
                                        open={openEditAvatar}
                                        onClose={handleCloseEditAvatar}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <EditAvatar />
                                    </Modal>
                                </div>

                                <h2>{userInfo.name}</h2>
                                <h3>{userInfo.email}</h3>
                                <div className="profile__userLocation">
                                    <i className="fa-solid fa-location-dot" />
                                    <p>Location</p>
                                </div>
                                <Link to="/editor" >
                                    <div className="profile__editInfo">
                                        {/* <EditIcon /> */}
                                        <p>Edit Your Profile</p>
                                    </div>
                                </Link>
                                <Link to="/upload" >
                                    <div className="profile__createPost">
                                        {/* <EditIcon /> */}
                                        <p>Create New Post</p>
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
                                                <Post post={post} postImage={post.image.url} postName={post.title} hearts={post.hearts} views={post.views} shares={post.shares} />
                                            ))}


                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        About Section coming sunday
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

