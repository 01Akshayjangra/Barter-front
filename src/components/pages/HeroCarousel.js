// import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MobileStepper from '@mui/material/MobileStepper';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import { useState } from "react";
// import "./css/HeroCarousel.css"
// const images = [
//     {
//         label: 'Animations',
//         imgPath:
//             'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//     },
//     {
//         label: 'Branding',
//         imgPath:
//             'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//     },
//     {label: 'Illustration'},
//     {   label: 'Mobile'},
//     {   label: 'Print'},
//     {   label: 'Product Design'},
//     {   label: 'Typography'},hec
//     {   label: 'Web Design'},
//     {   label: 'Discover'},
// ];

// function HeroCarousel() {
//     const theme = useTheme();
//     const [activeStep, setActiveStep] = useState(0);
//     const maxSteps = images.length;

//     const handleNext = () => {
//         setActiveStep((activeStep) => activeStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((activeStep) => activeStep - 1);
//     };

//     return (
//         <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
//             <Paper
//                 square
//                 elevation={0}
//                 sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     height: 50,
//                     pl: 2,
//                     bgcolor: 'background.default',
//                 }}
//             >
//                 <Typography>{images[activeStep].label}</Typography>
//             </Paper>

//             {/* <img src={images[activeStep].imgPath} alt={images[activeStep].label} /> */}



//             <div className="heroCorousel__Btn">

//                 <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
//                     {theme.direction === 'rtl' ? (
//                         <KeyboardArrowRight />
//                     ) : (
//                         <KeyboardArrowLeft />
//                     )}
//                     Back
//                 </Button>
//                 <Button
//                     size="small"
//                     onClick={handleNext}
//                     disabled={activeStep === maxSteps - 1}
//                 >
//                     Next
//                     {theme.direction === 'rtl' ? (
//                         <KeyboardArrowLeft />
//                     ) : (
//                         <KeyboardArrowRight />
//                     )}
//                 </Button>

//             </div>

//         </Box>
//     );
// }

// export default HeroCarousel;

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function HeroCarousel() {
    const [value, setValue] = React.useState(0);
    console.log(value)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
        
        <Box sx={{ maxWidth: { xs: 320, sm: 1000 }, bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab label="Art Direction" />
                <Tab label="Architecture" />
                <Tab label="Animations" />
                <Tab label="Branding" />
                <Tab label="Mobile" />
                <Tab label="Illustration" />
                <Tab label="Graphic Design" />
                <Tab label="Industrial Design" />
                <Tab label="Interaction Design" />
                <Tab label="Motion Graphics" />
                <Tab label="Fashion" />
                <Tab label="Product Design" />
                <Tab label="Photography" />
                <Tab label="Typography" />
                <Tab label="Web Design" />
                <Tab label="UI/UX" />
                <Tab label="Discover" />
            </Tabs>
        </Box>
        </>
    );
}
