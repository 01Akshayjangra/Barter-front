import React from 'react'
import "./css/Messages.css"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Avatar, IconButton, LinearProgress } from '@mui/material';
import SidebarChat from './SidebarChat';
import Chat from './Chat';
import axios from "axios";
import { ChatState } from '../context/ChatProvider';
import ChatLoading from "./ChatLoading";
import Spinner from '../miscelleneous/Spinner';
import MyChats from './MyChats';
import { useEffect, useState } from "react";
import { getSender } from '../config/ChatLogics';
import API_URL from '../api/Api';

//Modal 
import Modal from '@mui/material/Modal';
import ChatSearch from './ChatSearch';

const Messages = () => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingChat, setLoadingChat] = useState(false);
	const [userInfo, setUserInfo] = useState([]);
	const [fetchAgain, setFetchAgain] = useState(false);

	const [openSearchModal, setOpenSearchModal] = React.useState(false);

	const {
		userInformation,
		setSelectedChat,
		selectedChat,
		user,
		notification,
		setNotification,
		chats,
		setChats,
	} = ChatState();

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
			// alert(error)
		}
	}
	const [loggedUser, setLoggedUser] = useState();

	const fetchChats = async () => {
		// console.log(user._id);
		try {
			setLoading(true)
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.get(`${API_URL}/api/chat`, config);
			// console.log(data)
			setChats(data);
		} catch (error) {
			// alert('failed to load chats')
		}
	};

	const handleUserInfo = async () => {
		try {
			if (!user.token) {
				alert("token not found")
				return;
			}
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.get(`${API_URL}/api/user/profile`, config);
			setLoading(false)
			setUserInfo(data);
		} catch (error) {
			// alert('failed to load user info')
		}
	}


	useEffect(() => {

		setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
		fetchChats();
		handleUserInfo()

		// eslint-disable-next-line
	}, []);
	// console.log(chats)

	if (loading) {
		return <>
			<LinearProgress />
			<Spinner />
		</>;
	}

	return (<>
		<div className="message">
			<div className="message-body">

				<div className="message-sidebar">
					<div className="message-sidebar__header">
						{userInformation.pic && <Avatar src={userInformation.pic.url} />}
					</div>

					<div className="message-sidebar__search">
						<div className="message-sidebar__searchContainer" onClick={() => setOpenSearchModal(true)}>
							<i className="fa-solid fa-magnifying-glass"></i>
							<p>Search or start a new chat</p>
						</div>

						<Modal
							open={openSearchModal}
							onClose={() => setOpenSearchModal(false)}
						>
							<ChatSearch />
						</Modal>
						{/* <button onClick={handleSearch} >Go</button> */}
					</div>

					<div className="message-sidebar_chats scrollbar">
						{chats ? (
							chats.map((chat) => (

								<div className='sidebarChat'
									onClick={() => setSelectedChat(chat)}
									key={chat._id}
								>
									{/* {console.log(chat)} */}
									{chat.users[0].pic && <Avatar src={chat.users[0].pic.url} />}
									<div className="sidebarChat__info">
										<h2>
											{!chat.isGroupChat
												? getSender(loggedUser, chat.users)
												: chat.chatName}
										</h2>
										<p>{chat.users[0].email}</p>
										{console.log(chat)}
									</div>
								</div>
							))
						) : (
							<ChatLoading />
						)}
					</div>
				</div>
				<Chat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>

			</div>
		</div>
		</>
	)
}

export default Messages
