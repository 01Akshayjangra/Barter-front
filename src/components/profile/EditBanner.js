import * as React from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import { ChatState } from '../context/ChatProvider';
import './css/EditAvatar.css';
import API_URL from '../api/Api';

const EditAvatar = () => {
    const { user } = ChatState();

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
        const data = {
            pic: result,
        };
        if (!result) {
            alert('select image first')
            return;
        }
        // console.log(pic);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `${API_URL}/api/user/`,
                data,
                config
            );
            alert('Profile picture changed successful')
        } catch (error) {
            alert("error occured")
        }
    };


    return (
        <>
            <div className='editAvatar__container'>
                <div className="editAvatar__main">
                    <h3>Profile Banner</h3>
                    <div className="editAvatar__image_div">

                            { result ? <img ref={imageRef} src={result}/> : 
                            <>
                                <div >Upload Image
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
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditAvatar

