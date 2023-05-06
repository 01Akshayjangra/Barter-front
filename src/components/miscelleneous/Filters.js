import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react'
import "./css/Filter.css"

const Filters = () => {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className='filter'>
            
            <div className="filter__right">
            <FormControl sx={{ m: 1, minWidth: 150, color: 'black', fontSize: 43 }}>
                    <Select
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem className='filter__menu' value=""> Filter</MenuItem>
                        <MenuItem className='filter__menu' value={10}>Most Liked</MenuItem>
                        <MenuItem className='filter__menu' value={20}>Most Viewed</MenuItem>
                        <MenuItem className='filter__menu' value={30}>Trending</MenuItem>
                        <MenuItem className='filter__menu' value={40}>Latest Posts</MenuItem>
                    </Select>
                </FormControl>

            </div>
        </div>
    )
}

export default Filters
