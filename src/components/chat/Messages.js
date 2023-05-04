import React from 'react'
import "./css/Messages.css"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, IconButton } from '@mui/material';
import SidebarChat from './SidebarChat';
import Chat from './Chat';
import axios from "axios";
import { ChatState } from '../context/ChatProvider';
import ChatLoading from "./ChatLoading";
import Spinner from '../miscelleneous/Spinner';
import MyChats from './MyChats';
import { useEffect, useState } from "react";
import { getSender } from '../config/ChatLogics';

const Messages = () => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingChat, setLoadingChat] = useState(false);
	const {
		setSelectedChat,
		user,
		notification,
		setNotification,
		chats,
		setChats,
	} = ChatState();

	const handleSearch = async () => {
		if (!search) {
			alert("please enter something")
			return;
		}
		try {
			setLoading(true)
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.get(`/api/user?search=${search}`, config);

			setLoading(false);
			setSearchResult(data);
		} catch (error) {
			alert("Failed to load the search Results")
		}
	}

	const accessChat = async (userId) => {
		try {
			setLoadingChat(true);
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.post(`/api/chat`, { userId }, config);

			if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
			setSelectedChat(data);
			setLoadingChat(false);
		} catch (error) {
			alert(error)
		}
	}
	const [loggedUser, setLoggedUser] = useState();

	// const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

	const fetchChats = async () => {
		// console.log(user._id);
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.get("/api/chat", config);
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
		<div className="message">
			<div className="message-body">

				<div className="message-sidebar">
					<div className="message-sidebar__header">
						<Avatar src="../images/barter.png" />
						<div className="message-sidebar__headerRight">
							<IconButton>
								<DonutLargeIcon />
							</IconButton>
							<IconButton>
								<ChatIcon />
							</IconButton>
							<IconButton>
								<i className="fa-solid fa-ellipsis-vertical"></i>
							</IconButton>
						</div>
					</div>

					<div className="message-sidebar__search">
						<div className="message-sidebar__searchContainer">
							<i className="fa-solid fa-magnifying-glass"></i>
							<input
								placeholder="Search or start new search"
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
						<button onClick={handleSearch} >Go</button>
					</div>

					<div className="message-sidebar_chats scrollbar">
						{loading ? (
							<ChatLoading />
						) : (
							searchResult?.map(user => (
								<SidebarChat
									key={user._id}
									user={user}
									handleFunction={() => accessChat(user._id)}
								/>))
						)}
						{loadingChat && <Spinner />}
						{console.log(chats)}
						{chats ? (
							chats.map((chat) => (

								<div className='sidebarChat'
									onClick={() => setSelectedChat(chat)}
									key={chat._id}
								>
									<Avatar src={chat.users[0].pic} />
									<div className="sidebarChat__info">
										<h2>
											{!chat.isGroupChat
												? getSender(loggedUser, chat.users)
												: chat.chatName}
										</h2>
										<p>last message</p>
									</div>
								</div>
							))
						) : (

							<ChatLoading />

						)}
					</div>
				</div>
				<Chat />

			</div>
		</div>
	)
}

export default Messages
