import React, { useEffect, useState } from 'react'
import "./css/Chat.css"
import { Avatar, IconButton, LinearProgress, Tooltip, Typography } from '@mui/material';
import Spinner from '../miscelleneous/Spinner';
import { ChatState } from '../context/ChatProvider';
import API_URL from '../api/Api';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics';
import io from 'socket.io-client'
import { useRef } from 'react';
import { Link } from 'react-router-dom';

var socket, selectedChatCompare;

const Chat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const [newPic, setNewPic] = useState(false);

    const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);

            const { data } = await axios.get(
                `${API_URL}/api/message/${selectedChat._id}`,
                config
            );
            setMessages(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast.error("Failed to Load the Messages");
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        if (newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                setNewMessage("");
                const { data } = await axios.post(`${API_URL}/api/message`, {
                    content: newMessage,
                    chatId: selectedChat
                }, config);
                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                toast.error("failed to sent message");
            }
        }
    }

    useEffect(() => {
        socket = io(API_URL);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
        // eslint-disable-next-line
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
                if (!notification.includes(newMessageRecieved)) {
                    setNotification([newMessageRecieved, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };
    const chatRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };

    return (
        <div className="chat">
            <Toaster />
            {!selectedChat &&
                <Typography
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, height: '100%' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >

                    {'No Chat Selected'}
                </Typography>}

            {selectedChat && <div className="chat__header">
                {console.log(selectedChat.users[0]._id)}

                <a href={`/user-profile?userId=${selectedChat.users[0]._id}`}>
                    <Avatar src={selectedChat.users[0].pic.url} />
                </a>

                <div className="chat__headerInfo">
                    <h3>{selectedChat.users[0].name}</h3>
                    <p>{selectedChat.users[0].email}</p>
                </div>

            </div>}
            {loading ? (
                <Spinner style={{ height: '100%' }} />
                // <LinearProgress style={{height: '100%'}} />
            ) : (

                <div className="chat__body scrollbar" style={{ height: '100%' }} ref={chatRef}>


                    {messages && messages.map((m, i) => (
                        <div style={{ display: 'flex' }} key={m._id}>
                            {(isSameSender(messages, m, i, user._id) ||
                                isLastMessage(messages, i, user._id)) && (
                                    <Tooltip title={m.sender.name} placement="bottom-start" hasArrow>
                                        <Avatar
                                            style={{ height: 25, width: 25 }}
                                            src={m.sender.pic.url}
                                        />
                                    </Tooltip>
                                )}
                            <span
                                style={{
                                    backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                                        }`,
                                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                    marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                                    borderRadius: "20px",
                                    padding: "5px 15px",
                                    maxWidth: "75%",
                                }}
                            >
                                {m.content}
                            </span>
                        </div>
                    ))}

                    {istyping ? <div>
                        {/* <img style={{
                            height: 30, marginLeft: 24, marginBottom
                                : 10
                        }} src="./images/anime.gif" alt="" /> */}
                        <p>Typing...</p>
                    </div> : (<></>)}
                </div>
            )}

            {selectedChat &&
                <div className="chat__footer">
                    {/* <i className="fa-solid fa-face-smile"></i> */}
                    <form onSubmit={sendMessage}>
                        <input
                            placeholder='Type a message'
                            type="text"
                            onChange={typingHandler}
                            value={newMessage}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage(e);
                                }
                            }}
                        />
                        <button type="submit">Send a message</button>
                    </form>
                    {/* <i className="fa-solid fa-microphone"></i> */}
                </div>}

        </div>
    )
}

export default Chat
