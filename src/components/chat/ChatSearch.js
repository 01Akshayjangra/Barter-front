import React, { useEffect, useState } from 'react';
import './css/ChatSearch.css';
import ChatLoading from './ChatLoading';
import SidebarChat from './SidebarChat';
import API_URL from '../api/Api';
import { ChatState } from '../context/ChatProvider';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../miscelleneous/Spinner';
import { LinearProgress, Typography } from '@mui/material';

const MessageSearch = ({ openSearchModal, setOpenSearchModal }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    chats,
    setChats,
  } = ChatState();

  const handleSearch = async () => {
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
  useEffect(() => {
    handleSearch()
    // eslint-disable-next-line
  }, [search]);

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
      setOpenSearchModal(false)
    } catch (error) {
      toast.error("Failed to access the chat");
    }
  };

  return (
    <>
      <Toaster />
      <div className='chatSearch__container'>
        <div className="chatSearch__main">
          <h1>Search</h1>

          <div className="message-sidebar__search">
            <div className="message-sidebar__searchContainer">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                placeholder="Search or start new chat"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

      {loadingChat && <LinearProgress/>}

          <div className="chatSearch__chats scrollbar">
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map(user => (
                <SidebarChat
                  key={user._id}
                  user={user}
                  handleFunction={() => {
                    accessChat(user._id)
                  }}
                />
              ))
            )}
            <Typography
              style={{ display: 'flex',alignItems: 'center',justifyContent: 'center', fontSize: 16, height: '100%'}}
              component="span"
              variant="body2"
              color="text.primary"
            >

              {!searchResult.length && "No results Found"}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageSearch;
