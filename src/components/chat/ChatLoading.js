import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const ChatLoading = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" style={{width: '99%', marginLeft: '2px'}} height={80} />
      <Skeleton variant="rounded" style={{width: '99%', marginLeft: '2px'}} height={80} />
      <Skeleton variant="rounded" style={{width: '99%', marginLeft: '2px'}} height={80} />
      <Skeleton variant="rounded" style={{width: '99%', marginLeft: '2px'}} height={80} />
      <Skeleton variant="rounded" style={{width: '99%', marginLeft: '2px'}} height={80} />
      <Skeleton variant="rounded" style={{width: '99%', marginLeft: '2px'}} height={80} />
    </Stack>
  );
};

export default ChatLoading;
