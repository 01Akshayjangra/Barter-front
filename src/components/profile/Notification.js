import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ChatState } from '../context/ChatProvider';
import { MenuItem } from '@mui/material';
import { getSender } from '../config/ChatLogics';

const Notification = () => {
  const { user, notification, setNotification, setSelectedChat } = ChatState();

  return (
    <>
      <List sx={{ width: '100%', width: 300, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start">
          <Typography
            style={{ display: 'inline', fontSize: 23, fontWeight: 'bold' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            Notifications
          </Typography>
        </ListItem>

        <Divider />

        <ListItem alignItems="flex-start">
          <Typography
            style={{ display: 'inline', fontSize: 16}}
            component="span"
            variant="body2"
            color="text.primary"
          >
             {!notification.length && "No new notifications"}
          </Typography>
        </ListItem>

        <Divider />

        {notification.map((notify) => (<>
          <ListItem alignItems='center' key={notify._id} onClick={()=>{
            setSelectedChat(notify.chat)
            setNotification(notification.filter((n) => n !== notify))
          }}>
            <Typography
              style={{ display: 'inline', fontSize: 16}}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {notify.chat.isGroupChat ? `New Messages in ${notify.chat.chatName}`
                : `New Message from ${getSender(user, notify.chat.users)}`}
            </Typography>

          </ListItem>
          <Divider />
        </>
        ))}
      </List>
    </>
  )
}

export default Notification
