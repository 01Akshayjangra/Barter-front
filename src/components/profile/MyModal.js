import React from 'react'
import "./css/Modal.css"
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';

const MyModal = (props) => {
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);
    const { closeModal, postImage, postName, views, hearts, shares } = props;

    return (
        <>
            <div className='popup__wrapper' onClick={closeModal}></div>

            <div className="modal__rightContent">
                <i className='fa-sharp fa-solid fa-xmark' onClick={closeModal} />

                <div className="modal__item">
                    <IconButton className='modal__itemIcon'>
                        <Link to='/explore'><Avatar src="./images/profile_logo.png" /></Link>
                    </IconButton>
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-regular fa-heart" />
                    </IconButton>
                    <span>{"24"}</span>
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="fa-sharp fa-regular fa-folder-open" />
                    </IconButton>
                    <span>{"24"}</span>
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-sharp fa-solid fa-eye" />
                    </IconButton>
                    <span>{'32423'}</span>
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-solid fa-share" />
                    </IconButton>
                    <span>{'234'}</span>
                </div>
            </div>
            <div className='popup__container'>

            <div className='modal__Main ModalScrollbar'>
                <div className="modal__header">
                    <Link to='/explore'><Avatar src="./images/profile_logo.png" /></Link>
                    <div className='modal__headerInfo'>
                        <h1>{"Akshay Jangra"}</h1>
                        <Link><p>{"Follow"}</p></Link>
                    </div>
                </div>
                <div className="modal__body">
                    <div className="modal__bodyImg">
                        <img src={postImage} alt="" />
                    </div>
                </div>/
            </div>

            </div>
        </>
    )
}

export default MyModal