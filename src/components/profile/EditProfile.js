import React from 'react'
import "./css/EditProfile.css"
import { Link } from 'react-router-dom'

const EditProfile = () => {
    
    return (
        <div>
            <div className="editor__head">
                <Link to="/profile">Back to Profile</Link>
            </div>
            <div className="editor__mainBody">


                <div className="editor__body">
                    <ul id="basicInfo" onClick="#basicInfo">
                        <li className='editor__activeKey' >
                            <Link to="#basicInfo">Basic Information</Link></li>
                        <li><Link to="#about">About</Link></li>
                        {/* <li onClick="customSection"><Link to="#customSection">+ Add a custom section </Link></li> */}

                    </ul>
                    <div className="editor__forContent">

                        <div class="editor__form-block">

                            <div className='editor__basicInfo' id="basicInfo">
                                <div className='editor__form-item' >
                                    <div >
                                        <label className="editor__label" for="first_name">First Name</label>
                                        <input className="editor__input " name="first_name" type="text" value="" data-validate="required, Generic" />
                                    </div>
                                    <div style={{ marginLeft: '4px' }}>
                                        <label className="editor__label" for="last_name">Last Name</label>
                                        <input className="editor__input " name="last_name" type="text" value="" data-validate="required, Generic" />
                                    </div>
                                </div>

                                <div >
                                    <label className="editor__label" for="occupation">Occupation</label>
                                    <input className="editor__input " name="occupation" type="text" placeholder="Ex: Senior Design, Art Director, Student" data-validate="optional,Generic" />
                                </div>
                                <div>
                                    <label className="editor__label" for="company">Company</label>
                                    <input className="editor__input" name="company" type="text" value="" maxlength="40" data-validate="optional,Generic" />
                                </div>
                                <div >
                                    <label className="editor__label" for="company">Country</label>
                                    <input style={{ width: '40%' }} className="editor__input" name="company" type="text" value="" maxlength="40" data-validate="optional,Generic" />
                                </div>
                                <div >
                                    <label className="editor__label" for="company">City</label>
                                     <input style={{ width: '40%' }} className="editor__input " name="company" type="text" value="" maxlength="40" data-validate="optional,Generic" />
                                </div>
                                <div>
                                    <div>
                                        <label className="editor__label" for="website">Website URL</label>
                                        <input className="editor__input " name="website" type="text" data-validate="optional,UrlExt" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="editor__form-block" id="about">
                            <span style={{top: '-164px', paddingTop: '164px'}}></span>
                            <h3 style={{marginBottom: "12px"}} class="form-block-title">About</h3>

                            <div class="js-custom-section soc-custom-section">
                                <div class="">
                                    <label className="editor__label" for="sections-title-0">Section Title</label>
                                    <input className="editor__input "  name="sections-title-0" type="text" value="" maxlength="40" data-validate="optional,Generic"/>
                                </div>
                                <div >
                                    <label className="editor__label" for="sections-body-0">Description</label>
                                    <textarea class="editor___form-textarea" id="sections-body-0" name="sections-body-0" data-validate="optional,Generic"></textarea>
                                </div>
                            </div>
                        </div>
                        {/* <div class="editor__form-block" id="customSection">
                            <span style={{top: '-164px', paddingTop: '164px'}}></span>
                            <h3 style={{marginBottom: "12px"}} class="form-block-title">Custom Section</h3>

                            <div class="js-custom-section soc-custom-section">
                                <div class="">
                                    <label className="editor__label" for="sections-title-0"> Title</label>
                                    <input className="editor__input "  name="sections-title-0" type="text" value="" maxlength="40" data-validate="optional,Generic"/>
                                </div>
                                <div >
                                    <label className="editor__label" for="sections-body-0">Description</label>
                                    <textarea class="editor___form-textarea" id="sections-body-0" name="sections-body-0" data-validate="optional,Generic"></textarea>
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
