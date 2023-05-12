import React from 'react'
import "./css/SidebarChat.css"
// import { Avatar } from '@mui/material';
import { ChatState } from '../context/ChatProvider';
import ChatLoading from './ChatLoading';
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from '../config/ChatLogics';
import API_URL from '../api/Api';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${API_URL}/api/chat`, config);
      console.log(data)
      setChats(data);
    } catch (error) {
      alert('failed to load chats')
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {chats ? (
        chats.map((chat) => (

          <div className='sidebarChat'
            onClick={() => setSelectedChat(chat)}
            key={chat._id}
          >
            <div className="sidebarChat__info">
              <h2>
                {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users)
                  : chat.chatName}
              </h2>
            </div>
          </div>
        ))
      ) : (

        <ChatLoading />

      )}
    </>

  )
}


export default MyChats
