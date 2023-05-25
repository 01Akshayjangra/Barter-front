import React, { useState } from 'react';
import './css/ChatSearch.css';
import ChatLoading from './ChatLoading';
import SidebarChat from './SidebarChat';
import API_URL from '../api/Api';
import { ChatState } from '../context/ChatProvider';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../miscelleneous/Spinner';

const MessageSearch = ({ setOpenSearchModal }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  // const [userInfo, setUserInfo] = useState([]);

  const {
    setSelectedChat,
    user,
    chats,
    setChats,
  } = ChatState();

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please enter something");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${API_URL}/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to load the search results");
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${API_URL}/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toast.error("Failed to access the chat");
    }
  };

  return (
    <>
      <Toaster />
      <div className='chatSearch__container'>
        <div className="chatSearch__main">
          <h1>Search</h1> {loadingChat && <Spinner />}

          <div className="message-sidebar__search">
            <div className="message-sidebar__searchContainer" onClick={() => setOpenSearchModal(true)}>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                placeholder="Search or start new chat"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
              <i style={{ fontSize: 15,color: 'gray', backgroundColor: 'white', padding: 10,cursor: 'pointer', borderRadius: 50, marginLeft: 4  }} onClick={handleSearch} className="fa-sharp fa-solid fa-arrow-right"></i>
          </div>


          <div className="chatSearch__chats scrollbar">
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map(user => (
                <SidebarChat
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                  onClick={() => setOpenSearchModal(false)}
                />
              ))
            )}
            {loadingChat && <Spinner />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageSearch;
