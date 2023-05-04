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
    const { post, closeModal } = props;

    return (
        <>
            <div className='popup__wrapper' onClick={closeModal}></div>

            <div className="modal__rightContent">
                <i className='fa-sharp fa-solid fa-xmark' onClick={closeModal} />

                <div className="modal__item">
                    <IconButton className='modal__itemIcon'>
                        <Link to='/explore'><Avatar src={post.userId.pic} /></Link>
                    </IconButton>
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-regular fa-heart" />
                    </IconButton>
                    <span>{post.hearts}</span>
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-sharp fa-solid fa-eye" />
                    </IconButton>
                    <span>{post.views}</span>
                </div>
                <div className="modal__item">
                    <IconButton className="modal__itemIcon">
                        <i className="stat-icons fa-solid fa-share" />
                    </IconButton>
                    <span>{post.shares}</span>
                </div>
            </div>
            <div className='popup__container'>

            <div className='modal__Main ModalScrollbar'>
                <div className="modal__header">
                    <Link to='/explore'><Avatar src={post.userId.pic} /></Link>
                    <div className='modal__headerInfo'>
                        <h1>{post.userId.name}</h1>
                        <Link><p>{"Follow"}</p></Link>
                    </div>
                </div>
                <div className="modal__body">
                    <div className="modal__bodyImg">
                        <img src={post.image.url} alt="" />
                    </div>
                </div>/
            </div>

            </div>
        </>
    )
}

export default MyModal