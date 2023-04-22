import React from 'react'
// import loading from './loading.gif'
import CircularProgress from '@mui/material/CircularProgress';


const Spinner = () => {
    return (
        <div className="text-center">
            {/* <img className="my-3" src={loading} alt="loading" /> */}
            
            <CircularProgress />
        </div>
    )
}

export default Spinner
