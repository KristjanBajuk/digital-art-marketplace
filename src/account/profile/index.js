import React from "react";
import {Box, Container} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Avatar from '@mui/material/Avatar';

import Collected from '../collected';
import Created from '../created';

import Auth from "../../@components/auth";

const Index = React.memo(() => {
    const [, , userInfo] = Auth.useAuth();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <Container maxWidth={'xl'}>
        <Box sx={{textAlign: 'center', mt: '70px', display:'flex', justifyContent:'center'}}>
            <Avatar sx={{width: '120px', height: '120px'}} src={userInfo?.avatar} />
        </Box>
        <Box sx={{ width: '100%', mt:'30px', bgcolor: 'background.paper', fontFamily: 'Poppins, serif' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Collected" id={'trending'} />
                <Tab label="Created" id={'top'} />
                <Tab label="Favorited" />
                <Tab label="Hidden" />
                <Tab label="Activity" />
                <Tab label="Offers" />
            </Tabs>
        </Box>
        <Box>
            {value === 0 && <Collected/>}
            {value === 1 &&  <Created />}
            {value === 2 &&  <Collected />}
            {value === 3 &&  <Collected />}
            {value === 4 &&  <Collected />}
            {value === 5 &&  <Collected />}
        </Box>
    </Container>
});


export default Index;