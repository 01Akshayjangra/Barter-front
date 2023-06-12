import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react'
import "./css/Filter.css"
import { ChatState } from '../context/ChatProvider';

const Filters = () => {
    const {postSort, setPostSort}= ChatState();

    const handleChange = (event) => {
        setPostSort(event.target.value);
    };

    return (
        <div className='filter'>
            
            <div className="filter__right">
            <FormControl sx={{ m: 1, minWidth: 150, color: 'black', fontSize: 43 }}>
                    <Select
                        value={postSort}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem className='filter__menu' value=""> Filter</MenuItem>
                        <MenuItem className='filter__menu' value={'hearts'}>Most hearts</MenuItem>
                        <MenuItem className='filter__menu' value={'views'}>Most Viewed</MenuItem>
                        {/* <MenuItem className='filter__menu' value={'latest'}>Latest Posts</MenuItem> */}
                        {/* <MenuItem className='filter__menu' value={'oldest'}>Oldest Posts</MenuItem> */}
                        <MenuItem className='filter__menu' value={'shuffle'}>Shuffle</MenuItem>
                    </Select>
                </FormControl>

            </div>
        </div>
    )
}

export default Filters
