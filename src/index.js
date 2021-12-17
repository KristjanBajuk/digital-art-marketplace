import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import reportWebVitals from './reportWebVitals';
import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {BrowserRouter, Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Logo from './static/logo.png';


import Marketplace from './marketplace';
import Create from './create';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${alpha(theme.palette.common.black, 0.15)}`,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const MaterialAppBar = () => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar  position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'white', color: 'rgb(53, 56, 64)'}}>
                <Toolbar>
                    <Box onClick={()=>history.push('/')} sx={{mr: '20px', cursor:'pointer'}}>
                        <img src={Logo} width={'40px'} height={'40px'} alt={'logo'} />

                    </Box>
                    <Typography
                        onClick={()=>history.push('/')}
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}, color:'black', cursor:'pointer', fontWeight: 'bolder', fontSize: '30px'}}
                    >
                        DigitalArt
                    </Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{flexGrow: 4}}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{'aria-label': 'search'}}
                            />
                        </Search>
                    </Box>
                 
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            key={'explore'}
                            onClick={()=>{}}
                            sx={{ my: 2,padding: '0px 20px', fontSize:'16px', color: 'rgb(53, 56, 64)', fontWeight: '600', fontFamily:'Poppins, serif', textTransform:'unset', display: 'block' }}
                        >
                            Explore
                        </Button>
                        <Button
                            key={'stats'}
                            onClick={()=>{}}
                            sx={{ my: 2,padding: '0px 20px', fontSize:'16px', color: 'rgb(53, 56, 64)', fontWeight: '600', fontFamily:'Poppins, serif', textTransform:'unset', display: 'block' }}
                        >
                            Stats
                        </Button>
                        <Button
                            key={'resources'}
                            onClick={()=>{}}
                            sx={{ my: 2,padding: '0px 20px', fontSize:'16px', color: 'rgb(53, 56, 64)', fontWeight: '600', fontFamily:'Poppins, serif', textTransform:'unset', display: 'block' }}
                        >
                            Resources
                        </Button>
                            <Button
                                key={'create'}
                                onClick={()=>history.push('/create')}
                                sx={{
                                    my: 2,
                                    padding: '0px 20px',
                                    fontSize: '16px',
                                    color: 'rgb(53, 56, 64)',
                                    fontWeight: '600',
                                    fontFamily: 'Poppins, serif',
                                    textTransform: 'unset',
                                    display: 'block'
                                }}
                            >
                                Create
                            </Button>
                        <IconButton
                            sx={{mr: '20px'}}
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <AccountBalanceWalletIcon/>
                        </IconButton>
                    </Box>
                    
                  
                    
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}

const Index = () => {
    return (
        <Box>
            <MaterialAppBar />
            <Toolbar variant="dense" />
            <Switch>
                <Route path="/create" component={Create} />
                <Route path="/" component={Marketplace} />
                <Redirect from='*' to="/" />
            </Switch>
        </Box>
    )
}



ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename={''}>
            <Index/>
        </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
