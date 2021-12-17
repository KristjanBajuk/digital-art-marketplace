import React from "react";
import {Box, Container} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Trending from "./trending";
    

const Index = React.memo(() => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <Container maxWidth={'xl'}>
        <Box sx={{textAlign: 'center', mt: '100px'}}>
            <h1 style={{fontWeight: 600, fontSize: '40px', letterSpacing: '0px', color: 'rgb(4, 17, 29)'}}>Explore Marketplace</h1>
        </Box>
        <Box sx={{ width: '100%', mt:'30px', bgcolor: 'background.paper', fontFamily: 'Poppins, serif' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Trending" id={'trending'} />
                <Tab label="Top" id={'top'} />
                <Tab label="Art" />
                <Tab label="Music" />
                <Tab label="Domain Names" />
                <Tab label="Virtual Worlds" />
                <Tab label="Trading Cards" />
                <Tab label="Collectibles" />
                <Tab label="Sports" />
                <Tab label="Utillity" />
            </Tabs>
        </Box>
        <Box>
            {value === 0 && <Trending.List />}
            {value === 1 &&  <Trending.List />}
            {value === 2 &&  <Trending.List />}
            {value === 3 &&  <Trending.List />}
            {value === 4 &&  <Trending.List />}
            {value === 5 &&  <Trending.List />}
            {value === 6 &&  <Trending.List />}
            {value === 7 &&  <Trending.List />}
            {value === 8 &&  <Trending.List />}
            {value === 9 &&  <Trending.List />}
        </Box>
    </Container>
});

export default Index;