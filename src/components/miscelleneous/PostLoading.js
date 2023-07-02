import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import "./css/PostLoading.css"

const PostLoading = () => {
    return (
        <>
            <div className="postLoading__postsContainer">
                <Skeleton variant="rectangular" width={300} height={218} style={{ borderRadius: '4px' }} />
                <Box sx={{ pt: 0.5 }}>
                    <Box>
                        <Skeleton width="100%" />
                        <Skeleton width="60%" />
                    </Box>
                </Box>
            </div>

        </>
    )
}

export default PostLoading

