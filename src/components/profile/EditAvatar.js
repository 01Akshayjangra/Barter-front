import * as React from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import { ChatState } from '../context/ChatProvider';
import './css/EditAvatar.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import API_URL from '../api/Api';

const EditAvatar = () => {
    const { user } = ChatState();
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState("");
    const imageRef = React.useRef("null");

    function useDisplayImage() {
        const [result, setResult] = React.useState(false);

        function uploader(e) {
            const imageFile = e.target.files[0];

            const reader = new FileReader();
            reader.addEventListener("load", (e) => {
                setResult(e.target.result);
            });

            reader.readAsDataURL(imageFile);
        }

        return { result, uploader };
    }
    const { result, uploader } = useDisplayImage();

    console.log("------>", result)
    const handleProfilePic = async (e) => {
        e.preventDefault()
        setOpen(true)
        const data = {
            pic: result
        };
        console.log(data)
        if (!data) {
            alert('select image first')
            setOpen(false)
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.put(
                `${API_URL}/api/user/profileImage`,
                data,
                config
            );
            alert('profile image uploaded successfully')
            setOpen(false)
            return response.data;
        } catch (error) {
            alert('An error occured')
            setOpen(false)
        }
    };


    return (
        <>
            <div className='editAvatar__container'>
                <div className="editAvatar__main">
                    <h3>Profile Image</h3>
                    <div className="editAvatar__image_div">

                        {result ? <img ref={imageRef} src={result} /> :
                            <>
                                <div>Upload Image
                                    <input type="file" name="image" onChange={(e) => {
                                        setImage(e.target.files[0]);
                                        uploader(e);
                                    }} />
                                </div>
                                <p>Prefer size "500x450px"</p>
                                <p>Choose your Profile image</p>
                            </>
                        }

                    </div>
                    <div className="editAvatar__submit">
                        <button onClick={handleProfilePic}>Submit</button>
                    </div>
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleProfilePic}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default EditAvatar

