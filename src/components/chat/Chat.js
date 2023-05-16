import React, { useState } from 'react'
import "./css/Chat.css"
import { Avatar, IconButton } from '@mui/material';
import Spinner from '../miscelleneous/Spinner';
import { ChatState } from '../context/ChatProvider';
import API_URL from '../api/Api';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const {user, selectedChat} = ChatState();

    const sendMessage = async (e) => {
        if(e.key === "Enter" && newMessage){
            try {
                const config = {
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
    
                setNewMessage("");
                const { data } = await axios.post(`${API_URL}/api/message`,{
                    content: newMessage,
                    // chatId: selectedChat._id
                    chatId: "6450d34b6edf6002058d3898"
                },config);
                console.log("sab badhiya h ",data)
                
                setMessages([...messages, data]);
            } catch (error) {
                alert("failed to sent message")
            }
        }
    }
    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    }

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


            {loading ? (
                <Spinner />
            ) : (
                <div className="chat__body scrollbar">
                    <p className='chat__messsage'>
                        <span className='chat__name'>Name</span>
                        This is a message
                        <span className='chat__timestamp'>{new Date().toUTCString()}</span>
                    </p>
                    <p className='chat__messsage chat__reciever'>
                        <span className='chat__name'>Name</span>
                        This is a message
                        <span className='chat__timestamp'>{new Date().toUTCString()}</span>
                    </p>
                </div>
            )}

            <div className="chat__footer">
                <i className="fa-solid fa-face-smile"></i>
                <form >
                    <input
                        placeholder='Type a message'
                        type="text"
                        onChange={typingHandler}
                        value={newMessage}
                    />
                    <button type="submit" onKeyDown={sendMessage}>Send a mmessage</button>
                </form>
                <i className="fa-solid fa-microphone"></i>
            </div>
        </div>
    )
}

export default Chat
