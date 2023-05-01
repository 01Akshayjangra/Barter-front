import React from 'react'
import "./css/SidebarChat.css"
import { Avatar } from '@mui/material';
import { ChatState } from '../../context/ChatProvider';

const SidebarChat = ({user, handleFunction}) => {
  // const {user} = ChatState();

  return (
    <div className='sidebarChat' onClick={handleFunction}>
        <Avatar src={user.pic}/>
        <div className="sidebarChat__info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    </div>
  )
}

export default SidebarChat
