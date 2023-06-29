import React, { useEffect, useState } from 'react'
import "./css/EditProfile.css"
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ChatState } from '../context/ChatProvider';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import API_URL from '../api/Api';

const EditProfile = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [occupation, setOccupation] = useState('');
    const [company, setCompany] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [open, setOpen] = React.useState(false);
    const { user } = ChatState();
    
    const [aboutData, setAboutData] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpen(true);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        };
        const data = {
            firstname,
            lastname,
            occupation,
            company,
            country,
            city,
            title,
            description,
        };
        try {
            const res = await axios.post(`${API_URL}/api/user/about`, data, config);
            // console.log(res.data);
            setOpen(false);
            navigate('/profile')
        } catch (err) {
            setOpen(false);
            console.error(err);
        }
    };
    useEffect(() => {
        const fetchAboutData = async () => {
          try {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
            };
    
            const response = await axios.get(`${API_URL}/api/user/about`, config);
            const data = response.data;
    
            // setAboutData(data);
            setFirstname(data.firstname);
            setLastname(data.lastname) 
            setOccupation(data.occupation);
            setCompany(data.company)
            setCountry(data.country)
            setCity(data.city)
            setTitle(data.title)
            setDescription(data.description)
            // setLoading(false);
          } catch (error) {
            console.error('Error fetching user about data:', error);
            // setLoading(false);
          }
        };
    
        fetchAboutData();
      }, []);
    return (
        <div>
           
            <div className="editor__head">
                <Link to="/profile">Back to Profile</Link>
                <div onClick={handleSubmit} ><p>Save</p> <i className="fa-solid fa-arrow-up-from-bracket"></i></div>
            </div>
            <div className="editor__mainBody">


                <div className="editor__body">
                    <ul id="basicInfo">
                        <li>
                            <Link to="#basicInfo">Basic Information</Link></li>
                        <li><Link to="#about">About</Link></li>
                        {/* <li onClick="customSection"><Link to="#customSection">+ Add a custom section </Link></li> */}

                    </ul>
                    <div className="editor__forContent">

                        <div className="editor__form-block">

                            <div className='editor__basicInfo' id="basicInfo">
                                <div className='editor__form-item' >
                                    <div >
                                        <label className="editor__label">First Name</label>
                                        <input
                                            className="editor__input "
                                            type="text"
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)} />
                                    </div>
                                    <div style={{ marginLeft: '4px' }}>
                                        <label className="editor__label">Last Name</label>
                                        <input
                                            className="editor__input "
                                            type="text"
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div >
                                    <label className="editor__label">Occupation</label>
                                    <input
                                        className="editor__input "
                                        type="text"
                                        placeholder="Ex: Senior Design, Art Director, Student"
                                        value={occupation}
                                        onChange={(e) => setOccupation(e.target.value)} />
                                </div>
                                <div>
                                    <label className="editor__label">Company</label>
                                    <input
                                        className="editor__input"
                                        type="text"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)} />
                                </div>
                                <div >
                                    <label className="editor__label">Country</label>
                                    <input style={{ width: '40%' }} className="editor__input"
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)} />
                                </div>
                                <div >
                                    <label
                                        className="editor__label">City</label>
                                    <input style={{ width: '40%' }} className="editor__input "
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="editor__form-block" id="about">
                            <span style={{ top: '-164px', paddingTop: '164px' }}></span>
                            <h3 style={{ marginBottom: "12px" }} className="form-block-title">About</h3>

                            <div className="js-custom-section soc-custom-section">
                                <div className="">
                                    <label className="editor__label">Section Title</label>
                                    <input className="editor__input "
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div >
                                    <label className="editor__label">Description</label>
                                    <textarea
                                        className="editor___form-textarea"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleSubmit}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default EditProfile
