import React from 'react'
import "./css/SidebarChat.css"
import { Avatar } from '@mui/material';

const SidebarChat = ({user, handleFunction}) => {

  return (
    <div className='sidebarChat' onClick={handleFunction}>
        {user.pic && <Avatar src={user.pic.url}/>}
        <div className="sidebarChat__info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    </div>
  )
}

export default SidebarChat
