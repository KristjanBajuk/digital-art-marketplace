import React from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TokenIcon from '@mui/icons-material/Token';
import HardwareIcon from '@mui/icons-material/Hardware';
import PersonIcon from '@mui/icons-material/Person';

import {useHistory, Route, Switch, Redirect} from 'react-router-dom';
import Marketplace from "../marketplace";
import Mint from './mint';

const drawerWidth = 240;



const Index = React.memo(() => {
    const history = useHistory();
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                            <ListItem onClick={()=>history.push('/mint')} button key={"Mint Tokens"}>
                                <ListItemIcon>
                                    <HardwareIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Mint Tokens"}/>
                            </ListItem>
                        <ListItem button key={"My NFTs"}>
                            <ListItemIcon>
                                <TokenIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"My NFTs"}/>
                        </ListItem>
                        <ListItem button key={"Account Dashboard"}>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Account Dashboard"}/>
                        </ListItem>
                </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Switch>
                    <Route path="/" component={Mint} />
                    <Redirect from='*' to="/" />
                </Switch>
            </Box>
        </Box>
    );
});

export default Index;