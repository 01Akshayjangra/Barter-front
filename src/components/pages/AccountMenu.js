import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom'
import CreateIcon from '@mui/icons-material/Create';
import ChatIcon from '@mui/icons-material/Chat';
import swal from 'sweetalert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";


export default function AccountMenu() {
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

  return (
    <React.Fragment>
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
            <Avatar src="../images/akshay.enc" sx={{ width: 45, height: 45 }}/>
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
          <Avatar src="../images/akshay.enc" />  <Link to="/profile" >My Profile</Link>
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
        <MenuItem onClick={handleClose} style={{ fontSize: '14px' }}>
          <ListItemIcon>
            <Settings fontSize="large" />
          </ListItemIcon>
          <Link to="/" >Settings</Link>

        </MenuItem>
        <MenuItem onClick={logout} style={{ fontSize: '14px' }}>
          <ListItemIcon>
            <Logout fontSize="large" />
          </ListItemIcon>
          Logout

        </MenuItem>
      </Menu>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={logout}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
