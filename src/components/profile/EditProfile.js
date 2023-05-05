import React, { useState } from 'react'
import "./css/EditProfile.css"
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ChatState } from '../context/ChatProvider';

const EditProfile = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [occupation, setOccupation] = useState('');
    const [company, setCompany] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { user } = ChatState();


    const handleSubmit = async (e) => {
        e.preventDefault();
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
            const res = await axios.post('/api/user/about', data, config);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };
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
                        {/* <div className="editor__form-block" id="customSection">
                            <span style={{top: '-164px', paddingTop: '164px'}}></span>
                            <h3 style={{marginBottom: "12px"}} className="form-block-title">Custom Section</h3>

                            <div className="js-custom-section soc-custom-section">
                                <div className="">
                                    <label className="editor__label" for="sections-title-0"> Title</label>
                                    <input className="editor__input "  name="sections-title-0" type="text" value="" maxlength="40" data-validate="optional,Generic"/>
                                </div>
                                <div >
                                    <label className="editor__label" for="sections-body-0">Description</label>
                                    <textarea className="editor___form-textarea" id="sections-body-0" name="sections-body-0" data-validate="optional,Generic"></textarea>
                                </div>
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditProfile
