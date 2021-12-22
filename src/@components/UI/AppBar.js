import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Logo from "../../static/logo.png";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import MoreIcon from "@mui/icons-material/MoreVert";
import {useHistory} from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SideDrawer from './SideDrawer';
import Auth from '../auth';
import Avatar from "@mui/material/Avatar";

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
    const {user} = Auth.useAuth();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
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
            <MenuItem onClick={()=>{history.push('/account'); handleMenuClose()}}>Profile</MenuItem>
            <MenuItem onClick={()=>{history.push('/account/settings'); handleMenuClose()}}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
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
            <MenuItem >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Avatar sx={{width: '20px', height: '20px'}} src={user?.avatar} />
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
                            // onClick={()=>history.push('/account')}
                            onClick={handleProfileMenuOpen}
                            sx={{mr: '20px'}}
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit"
                        >
                            {user?.avatar ? <Avatar sx={{width: '25px', height: '25px'}} src={user?.avatar} /> : <AccountCircleOutlinedIcon/>} 
                        </IconButton>
                        <IconButton
                            onClick={()=>setDrawerOpen(!drawerOpen)}
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <AccountBalanceWalletOutlinedIcon/>
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
            { drawerOpen && <SideDrawer open={true} onClose={()=>setDrawerOpen(false)} />}
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}

export default MaterialAppBar;