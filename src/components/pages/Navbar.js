import * as React from 'react';

// Material component imported
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

import AfterLogin from './AfterLogin';
import "./css/Navbar.css"

import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { ChatState } from '../../context/ChatProvider';

function Navbar() {
    const { user } = ChatState();

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
                            <div className="nav-logo" title="Barter Home">
                                <NavLink to="/">
                                    <img
                                        className="nav-logo-img"
                                        src="./images/barter.png"
                                        alt=""
                                    />
                                </NavLink>
                            </div>

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
                            <MenuItem onClick={handleCloseNavMenu}>

                                <NavLink to="/explore">Explore</NavLink>
                                <NavLink to="/blog">Blog</NavLink>
                                <NavLink to="/learn">Learn</NavLink>

                            </MenuItem>

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

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

                    {user && <nav className="main-nav">
                        <div className="social-media">
                            <ul className="social-media-desktop">
                                <AfterLogin />
                            </ul>
                        </div>
                    </nav>}


                    {!user && <nav className="main-nav">
                        <div className="social-media">
                            <ul className="social-media-desktop">
                                <li>
                                    <NavLink to="/login">
                                        <button className="nav-btn-login">Login</button>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signup">
                                        <button className="nav-btn-signup">Get Started</button>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>}

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
