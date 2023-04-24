import React from 'react'
import "../css/Messages.css"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, IconButton} from '@mui/material';
import SidebarChat from './SidebarChat';
import Chat from './Chat';
const Messages = () => {
	return (
		<div className="message">
			<div className="message-body">

				<div className="message-sidebar">
					<div className="message-sidebar__header">
						<Avatar src="../images/barter.jpeg"/>
						<div className="message-sidebar__headerRight">
							<IconButton>
								<DonutLargeIcon/>
							</IconButton>
							<IconButton>
								<ChatIcon/>
							</IconButton>
							<IconButton>
								<i className="fa-solid fa-ellipsis-vertical"></i>
							</IconButton>			
						</div>
					</div>
					<div className="message-sidebar__search">
						<div className="message-sidebar__searchContainer">
							<i className="fa-solid fa-magnifying-glass"></i>
							<input placeholder="Search or start new search" type="text" />
						</div>
					</div>
					<div className="message-sidebar_chats scrollbar">
						<SidebarChat personName={'Akshay'} lastMessage={'We can talk later'}/>
						<SidebarChat personName={'Akshay'} lastMessage={'We can talk later'}/>
						<SidebarChat personName={'Akshay'} lastMessage={'We can talk later'}/>
						<SidebarChat personName={'Akshay'} lastMessage={'We can talk later'}/>
						<SidebarChat personName={'Akshay'} lastMessage={'We can talk later'}/>
						<SidebarChat personName={'Akshay'} lastMessage={'We can talk later'}/>
						<SidebarChat personName={'Akshay'} lastMessage={'We can talk later'}/>
						<SidebarChat personName={'Akshay'} lastMessage={'We can talk later'}/>
						<SidebarChat personName={'Akshay'} lastMessage={'We can talk later'}/>
					</div>
				</div>
					<Chat/>

			</div>
		</div>
	)
}

export default Messages
