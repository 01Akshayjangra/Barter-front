import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);

  const list = () => (
    <Box
      // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={setState(false)}
      onKeyDown={setState(false)}
    >
      Hello
    </Box>
  );

  return (
    <div>
     
        <React.Fragment>
          <Button onClick={setState(true)}>Open</Button>
          <Drawer
            open={state}
            onClose={setState(false)}
          >
            {list}
          </Drawer>
        </React.Fragment>
    </div>
  );
}