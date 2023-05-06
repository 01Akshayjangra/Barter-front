import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./css/HeroCarousel.css"
import { ChatState } from '../context/ChatProvider';
import CircularProgress from '@mui/material/CircularProgress';

export default function HeroCarousel() {
    const {selectedCategory, setSelectedCategory, loadingPosts } = ChatState();

    console.log(selectedCategory)
    const handleChange = (event, newValue) => {
        setSelectedCategory(newValue);
    };

    return (
        <>
        
        <Box sx={{ maxWidth: { xs: 250, sm: 1000 }, bgcolor: 'background.paper' }} style={{height: '50px', borderRadius: '20px'}}>
            <Tabs
                value={selectedCategory}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                style={{height: '50px', display: 'flex', alignItems: 'center',fontSize: '20px' }}
            > 
                <Tab label="All" value="" />
                <Tab label="Branding" value="Branding"/>
                <Tab label="Fashion Design" value="Fashion Design"/>
                <Tab label="Graphic Design" value="Graphic Design"/>
                <Tab label="Interior Design" value="Interior Design"/>
                <Tab label="Illustration" value="Illustration"/>
                <Tab label="Mobile" value="Mobile"/>
                <Tab label="Product Design"value="Product Design"/>
                <Tab label="Print" value="Print"/>
                <Tab label="Typography" value="Typography"/>
                <Tab label="UI Design" value="UI Design"/>
                <Tab label="UX Design" value="UX Design"/>
                <Tab label="Web Design" value="Web Design"/>
            </Tabs>
            {loadingPosts && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
        </>
    );
}
