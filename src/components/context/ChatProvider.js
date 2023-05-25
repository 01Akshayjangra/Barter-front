import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [aboutData, setAboutData] = useState(null);
  const [userId, setUserId] = useState();

  const [openNotify, setOpenNotify] = useState(false);
  
  const [userInformation, setUserInformation] = useState([]);


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    console.log("Chat token",user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        selectedCategory, 
        setSelectedCategory,
        aboutData, 
        setAboutData,
        userId, 
        setUserId,
        openNotify, 
        setOpenNotify,
        userInformation, 
        setUserInformation
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
