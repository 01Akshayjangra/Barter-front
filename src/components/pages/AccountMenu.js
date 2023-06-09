import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom'
import CreateIcon from '@mui/icons-material/Create';
import ChatIcon from '@mui/icons-material/Chat';
import { useEffect, useState } from 'react';
import axios from "axios";
import { ChatState } from '../context/ChatProvider';
import API_URL from '../api/Api';
import toast, { Toaster } from 'react-hot-toast';

export default function AccountMenu() {

  const { user , userInformation, setUserInformation} = ChatState()
  const [loadingOpen, setLoadingOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };
  const handleuserInfo= async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${API_URL}/api/user/profile`, config);
      setUserInformation(data);
    } catch (error) {
      toast.error('failed to load user info')
    }
  }

  useEffect(() => {
    handleuserInfo()
  }, []);

  return (
    <React.Fragment>
      <Toaster />
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title="Account settings" >
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {userInformation.pic && <Avatar src={userInformation.pic.url} sx={{ width: 45, height: 45 }}  alt="User Profile" />}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 35,
              height: 35,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} style={{ fontSize: '17px', fontWeight: '400' }}>
        {userInformation.pic && <Avatar src={userInformation.pic.url} sx={{ width: 45, height: 45 }}  alt="User Profile" />}  <Link to="/profile" >My Profile</Link>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose} style={{ fontSize: '14px' }}>
          <ListItemIcon>

            <CreateIcon fontSize="large" />
          </ListItemIcon>
          <Link to="/upload" >Create New Post</Link>

        </MenuItem>
        <MenuItem onClick={handleClose} style={{ fontSize: '14px' }}>
          <ListItemIcon>
            <ChatIcon fontSize="large" />
          </ListItemIcon>
          <Link to="/message" >Messages</Link>

        </MenuItem>
        {/* <MenuItem onClick={handleClose} style={{ fontSize: '14px' }}>
          <ListItemIcon>
            <Settings fontSize="large" />
          </ListItemIcon>
          <Link to="/" >Settings</Link>
        </MenuItem> */}
        <MenuItem onClick={logout} style={{ fontSize: '14px' }}>
          <ListItemIcon>
            <Logout fontSize="large" />
          </ListItemIcon>
          Logout

        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
