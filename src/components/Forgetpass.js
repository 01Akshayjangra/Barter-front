import React, { useState } from "react";
import "../css/Forgetpass.css"

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { Link } from 'react-router-dom'
const Forgetpass = () => {
    const [forgetPassAlert, setForgetPassAlert] = useState(!false);
    const handleClick = () => {
        // e.preventDefault;
        setForgetPassAlert(!forgetPassAlert)
    }
    return (
        <div className="main-forgetPass">
            <div className="forgetPass">

                <div className="forgetPass__left">
                    <div className="forgetPass__leftContent">
                        <Link to='/login' ><i className="fa-solid fa-arrow-left fa-fade"></i></Link>
                        <Link to='/login' >Back to Login</Link>
                    </div>
                    <h1>Don't worry your password will be reset</h1>
                    {/* <img src="./images/post2.webp" alt="" /> */}
                </div>

                <div className="forgetPass-right">
                    <div className={forgetPassAlert ? "forgetPass__Alert_hide" : "forgetPass__Alert"}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="success">Link to reset password sent to email</Alert>
                        </Stack>
                        {/* <p>Link to reset password<br/> sent to email</p> */}
                    </div>
                    {/* <div class="forgetpass_arrow_right">
                    <Link to='/login' ><i className="fa-solid fa-arrow-left fa-fade"></i></Link>
                    </div> */}
                    <div className="forgetPass__rightHead">
                        <h1>Forget Password ?</h1>
                    </div>
                    <form>
                        <div className="forgetPass__formContainer">

                            <h1 for="email">Enter email associated with your account</h1>
                            <input type="text" placeholder="Enter your email" name="email" required />

                            <button onClick={handleClick} type="submit" className="forgetPassbtn">Reset Password</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>

    )
}

export default Forgetpass
