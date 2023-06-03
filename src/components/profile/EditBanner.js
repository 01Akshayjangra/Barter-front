import * as React from 'react';
import axios from "axios";
import { ChatState } from '../context/ChatProvider';
import './css/EditAvatar.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import API_URL from '../api/Api';
import toast, { Toaster } from 'react-hot-toast';

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

    const handleProfilePic = async (e) => {
        e.preventDefault()
        setOpen(true)
        const data = {
            banner: result,
        };
        if (!data) {
            alert('select banner first')
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
                `${API_URL}/api/user/profileBanner`,
                data,
                config
            );
            toast.success('Profile Banner uploaded successfully');
            setOpen(false)
            window.location.reload();
            return response.data;
        } catch (error) {
            toast.error('File size must be less than 70kb');
            setOpen(false)
        }
    };


    return (
        <>
         <Toaster />
            <div className='editAvatar__container'>
                <div className="editAvatar__main">
                    <h3>Profile Banner</h3>
                    <div className="editAvatar__image_div">

                            { result ? <img ref={imageRef} src={result}/> : 
                            <>
                                <div >Upload Banner
                                    <input type="file" name="image" onChange={(e) => {
                                        setImage(e.target.files[0]);
                                        uploader(e);
                                    }} />
                                </div>
                                <p>Prefer size "3080x450px"</p>
                                <p>Choose your Profile Banner</p>
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

