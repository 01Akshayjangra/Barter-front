import React from 'react'
import AccountMenu from "./AccountMenu";

import { Link } from 'react-router-dom'
import { ChatState } from '../context/ChatProvider';
import Drawer from '@mui/material/Drawer';
import Notification from '../profile/Notification';
const AfterLogin = () => {

    const { openNotify, setOpenNotify } = ChatState();

    const handleClick = () => {
        setOpenNotify(!openNotify);
    };
    const toggleDrawer = () => {
        setOpenNotify(false);
      };

    console.log(openNotify)

    return (
        <>
            <div>
                <Drawer
                    anchor='right'
                    open={openNotify}
                    onClose={toggleDrawer}
                >
                    <Notification/>
                </Drawer>
            </div>
            <ul className="afterLogin__ul">

                <li className="afterLogin__li  " onClick={handleClick}>
                    <Link to="#" >
                        <i className="fa-solid fa-bell" />
                    </Link>
                </li>
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
