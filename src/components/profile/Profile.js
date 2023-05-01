import * as React from 'react';
import { Avatar } from '@mui/material'
import './css/Profile.css'
import { useEffect, useState } from 'react';
import Spinner from '../miscelleneous/Spinner';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Post from './Post';
import axios from "axios";
import { ChatState } from '../../context/ChatProvider';

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
    
    const {user} = ChatState();

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
         alert("error occured")
        }
      };
    

    useEffect(() => {
        setLoading(true)
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchPosts()
        setLoading(false)
        
    }, []);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const [image, setImage] = React.useState("");
    const imageRef = React.useRef("null");

    function useDisplayImage() {
        const [result, setResult] = React.useState("./images/profile_logo.png");
        console.log(result.path)

        function uploader(e) {
            const imageFile = e.target.files[0];

            const reader = new FileReader();
            reader.addEventListener("load", (e) => {
                setResult(e.target.result);
            });

            reader.readAsDataURL(imageFile);
        }

        return { result, uploader };
    }

    const { result, uploader } = useDisplayImage();

    return (
        <div className='profile__container' >


            <div className="profile__banner">
                <div className="profile__bannerUpload">
                    <div className="profile__dropIcon">
                        <svg
                            svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.672 42.672" className="ProfileBanner-dropIcon-jnp"><path d="M31.654,10.075C19.884,10.075,10,19.322,10,31.092A21.9,2
                            1.9,0,0,0,31.654,52.747c11.77,0,21.017-9.884,21.017-21.654A20.807,20.807,0,0,0,31.654,10.075Zm10.19,24.2L31.654,43.83c-.156.156.22.637,0,.637s-.481-.481-.637-.637l-10.19-9.553c-.24-.239-.132-.325,0-.637s.3-.643.637-.637h6.369V18.992c0-.458.816-.637,1.274-.637h4.458c.458,0,1.274.179,1.274.637V33h6.369c.333,0,.512.328.637.637S42.081,34.041,41.845,34.277Z" transform="translate(-10 -10.075)"></path></svg>
                        <p>Add a Banner Image</p>
                        <p>Optimal dimensions 3200 x 410px</p>
                    </div>
                </div>
                
            </div>
            <div className="profile__mainContent">
                <div className="profile__content">
                    <div className="profile__Left">
                        <div className="profile__User">
                            <div className="profile__UserInfo">
                                
                                {result && <Avatar ref={imageRef} src={result} alt="" />}
                            
                                <div className="editor__imageContainer">
                                    <h3>Basic Information</h3>

                                    <input type="file" name="image" onChange={(e) => {
                                        setImage(e.target.files[0]);
                                        uploader(e);
                                    }} />
                                </div>


                                <h2>Akshay Kumar</h2>
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
                                    <a href="#" target="_blank"><i className="fa-brands fa-facebook" style={{ 'color': "blue" }} ></i></a>
                                    <a href="#" target="_blank"> <i className="fa-brands fa-linkedin" style={{ 'color': "#0077B5" }}></i></a>
                                    <a href="#" target="_blank"><i className="fa-brands fa-youtube" style={{ 'color': "red" }}></i></a>
                                    <a href="#" target="_blank"> <i className="fa-brands fa-twitter" style={{ 'color': `#1DA1F2` }}></i></a>

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
                                                <Post postImage={post.image.url} postName={post.title} hearts={post.hearts} views={post.views} shares={post.shares} />
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

