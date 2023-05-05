import React from 'react'

import Notification from '../profile/Notification';
import AccountMenu from "./AccountMenu";

import { Link } from 'react-router-dom'
import { useState } from "react";

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
            <ul className="afterLogin__ul">

                <li className="afterLogin__li  ">
                    <Link to="/message">
                        <i className="fa-solid fa-message" />
                    </Link>
                </li>
                <li className="afterLogin__li">
                    <div>

                        <Link to="/upload">
                            Upload
                        </Link>
                    </div>
                </li>

                <AccountMenu />

            </ul>
        </>
    )
}

export default AfterLogin

{/* <ul className='afterLogin__ul'>

<li className="nav-right-li">
    <Link className="nav-link nav-upload" to="/upload">
        Upload
    </Link>
</li>

<AccountMenu />

</ul> */}
