import React from 'react'
import "./css/Chat.css"
import { Avatar, IconButton } from '@mui/material';

const Chat = () => {
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar /> 

                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>last seen at..</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body scrollbar">
                <p className='chat__messsage'>
                    <span className='chat__name'>Akshay</span>
                    This is a message
                    <span className='chat__timestamp'>{new Date().toUTCString()}</span>
                </p>
                <p className='chat__messsage chat__reciever'>
                    <span className='chat__name'>Akshay</span>
                    This is a message
                    <span className='chat__timestamp'>{new Date().toUTCString()}</span>
                </p>
                <p className='chat__messsage'>
                    <span className='chat__name'>Akshay</span>
                    This is a message
                    <span className='chat__timestamp'>{new Date().toUTCString()}</span>
                </p>
            </div>

            <div className="chat__footer">
                <i className="fa-solid fa-face-smile"></i>
                <form >
                    <input placeholder='Type a message' type="text" />
                    <button type="submit">Send a mmessage</button>
                </form>
                <i className="fa-solid fa-microphone"></i>
            </div>
        </div>
    )
}

export default Chat
