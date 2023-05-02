import React, { useState } from 'react'
import "./css/UploadDes.css"
import { Link } from 'react-router-dom'
import axios from "axios";
import { ChatState } from '../../context/ChatProvider';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const toolNames = [
    'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Adobe Premiere Pro', 'Adobe After Effects', 'CorelDRAW', 'Blender', 'Procreate', 'Canva', 'Figma', 'Sketch'
];

function getToolStyles(toolName, tools, theme) {
    return {
        fontWeight:
            tools.indexOf(toolName) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const UploadSettings = (props) => {
    const { refImg, srcImg, result, setImage, uploader } = props;
    const { user } = ChatState();
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = React.useState([]);
    const [tools, setTools] = React.useState([]);
    const [category, setCategory] = useState([]);
    const [formData, setFormData] = useState({
        image: srcImg,
    });

    const handleCheckboxChange = (e) => {
        const itemId = e.target.value;
        if (e.target.checked) {
            setCategory((prevSelectedItems) => [...prevSelectedItems, itemId]);
        } else {
            setCategory((prevSelectedItems) =>
                prevSelectedItems.filter((id) => id !== itemId)
            );
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setOpen(true);
        const data = {
            title: title,
            description: description,
            image: formData.image,
            tags: tags.split(',').map((tag) => tag.trim()),
            tools: tools,
            category: category
        };
        if (!title || !description || !formData.image || !tags || !tools || !category) {
            setOpen(false);
            alert("fill all fields")
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const response = await axios.post(
                "/api/post",
                data,
                config
            );
            setOpen(false);
            alert('Post successful')
            return response.data;
        } catch (error) {
            setOpen(false);
            alert("error occured")
        }
    };

    const theme = useTheme();

    const handleToolsChange = (event) => {
        const {
            target: { value },
        } = event;
        setTools(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            {/* <div className="settings_outer_div"> */}
           
            <div className="setting_body">

                <div className="setting_mainBody">

                    <div className="settings_left_div">
                        <h3>Project Cover <span>(required)</span></h3>
                        <div className="settings_image_div">

                            {result ? <img ref={refImg} src={srcImg} /> : <>
                                <div >Upload Image
                                    <input type="file" name="image" onChange={(e) => {
                                        setImage(e.target.files[0]);
                                        uploader(e);
                                    }} />
                                </div>
                                <p>Minimum size of "808x632px"</p>
                                <p>GIF file will not animate</p>

                            </>}

                        </div>
                    </div>

                    <div className="settings_right_div">
                        <div className="settings_rightInput">
                            <p className="">Project Title</p>
                            <TextField
                                id="outlined-controlled"
                                placeholder="Title"
                                value={title}
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                }}
                            />

                        </div>
                        <div className="settings_rightInput">
                            <p className="">Project Description<span>(up to 150)</span></p>
                            <TextField
                                id="outlined-controlled"
                                placeholder="Give Description to your Project"
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                        </div>

                        <div className="settings_rightInput">
                            <p className="">Project Tags <span>(up to 10)</span></p>
                            <TextField
                                id="outlined-controlled"
                                placeholder="Enter Tags for your project"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}

                            />

                        </div>
                        <div className="settings_rightInput">
                            <p className="">Tools Used</p>
                            <FormControl>
                                <InputLabel id="demo-multiple-name-label">tools</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={tools}
                                    onChange={handleToolsChange}
                                    input={<OutlinedInput label="Name" />}
                                    MenuProps={MenuProps}
                                >
                                    {toolNames.map((toolName) => (
                                        <MenuItem
                                            key={toolName}
                                            value={toolName}
                                            style={getToolStyles(toolName, tools, theme)}
                                        >
                                            {toolName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="settings_rightCheckbox">
                            <p>How would you categorize this Project? <span>(required)</span></p>
                            <ul>
                                <li>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={"Graphic Design"}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>Graphic Design</p>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={"UI Design"}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>UI Design</p>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={"UX Design"}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>UX Design</p>
                                    </div>

                                </li>
                                <li>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={"Web Design"}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>Web Design</p>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={"Product Design"}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>Product Design</p>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={"Fashion Design"}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>Fashion Design</p>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={"Interior Design"}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>Interior Design</p>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={"Animation"}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>Animation</p>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={"Branding"}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>Branding</p>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={"Print"}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>Print</p>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={"Typography"}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>Typography</p>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={"Illustration"}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>Illustration</p>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <input
                                            type="checkbox"
                                            value={"Mobile"}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>Mobile</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="settings_mainButton">
                    <div className="settings_btn3">
                        <Link>
                            <button className="setting_btnPublish" type="button" target="_self" onClick={handleFormSubmit} role="button">Publish</button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* </div> */}
             <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleFormSubmit}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default UploadSettings