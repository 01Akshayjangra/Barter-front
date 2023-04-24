import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import swal from 'sweetalert';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

import { useState, useEffect } from "react";

import { NavLink, Link } from "react-router-dom";
import Notification from './Notification';
import AccountMenu from "./AccountMenu";
import "../css/Navbar.css"
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';

const pages = ['Profile', 'Pricing', 'Blog'];





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
                        <i class="fa-solid fa-message"></i>
                    </Link>
                </li>

                <li className="nav-right-li notify_li">
                    <Link className="nav-link notify_btn" to="#" onClick={() => setShowNotification(!showNotification)}>
                            <NotificationsIcon fontSize="large"/>

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








function Navbar() {

    const [showMediaIcons, setShowMediaIcons] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

 

    useEffect(() => {
        checkStorage();
        return () => { };
    }, [isLogged]);

    function checkStorage() {
        if (localStorage.getItem("user")) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: "white" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 400, 
                            color: 'black',
                            textDecoration: 'none',
                        }}

                    >
                        <nav className="main-nav">
                            {/* 1st logo part  */}
                            {/* <div className="logo"> */}
                                <div className="nav-logo" title="Barter Home">
                                    <NavLink to="/">
                                        <img
                                            className="nav-logo-img"
                                            src="./images/barter.png"
                                            alt=""
                                        />
                                    </NavLink>
                                </div>
                            {/* </div> */}

                            {/* 2st Pages part  */}
                            <div className="menu-link">
                                <ul>
                                    <li>
                                        <NavLink to="/explore">Explore</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/blog">Blog</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/learn">Learn</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                        <DensityMediumIcon onClick={handleOpenNavMenu} style={{ color: 'black' }} />



                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        <nav className="main-nav">
                            <div className="logo">
                                <div className="nav-logo" title="Barter Home">
                                    <NavLink to="/">
                                        <img
                                            className="nav-logo-img"
                                            src="./images/barter.png"
                                            alt=""
                                            style={{ height: '18px' }}
                                        />
                                    </NavLink>
                                </div>
                            </div>
                        </nav>

                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    </Box>



                    <nav className="main-nav">
                        <div className="social-media">
                            <ul className="social-media-desktop">
                                <li>
                                    <NavLink to="/login">
                                        {!isLogged && <button className="nav-btn-login">Login</button>}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signup">
                                        {!isLogged && <button className="nav-btn-signup">Get Started</button>}
                                    </NavLink>
                                </li>
                                {isLogged && <AfterLogin />}
                            </ul>
                        </div>
                    </nav>


                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
