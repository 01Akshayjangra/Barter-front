import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import './css/Spinner.css'

const Spinner = () => {
    return (
        <div className="spinner__main">            
            <CircularProgress />
        </div>
    )
}

export default Spinner