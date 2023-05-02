import React from 'react'
import {Link} from 'react-router-dom'
import Notification from '../profile/Notification';
import AccountMenu from "./AccountMenu";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useState} from "react";
const AfterLogin = () => {

    const [showNotification, setShowNotification] = useState(!false);

    const handleNotify = () => {
        if (showNotification === 'false') {
            <Notification />
        }
        else {
            <Notification />
        }
    }

    return (
        <>
            <ul className="social-media-desktop">

                <li className="nav-right-li">
                    <Link className="nav-link" to="/message">
                        <i className="fa-solid fa-message"></i>
                    </Link>
                </li>

                <li className="nav-right-li notify_li">
                    <Link className="nav-link notify_btn" to="#" onClick={() => setShowNotification(!showNotification)}>
                        <NotificationsIcon fontSize="large" />

                        <div
                            className={showNotification ? "div_notify_hide" : "div_notify"}>
                            <Notification />
                        </div>
                    </Link>
                </li>

                <li className="nav-right-li">
                    <Link className="nav-link nav-upload" to="/upload">
                        Upload
                    </Link>
                </li>

                <AccountMenu />

            </ul>
        </>
    )
}

export default AfterLogin
