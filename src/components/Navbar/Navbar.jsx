import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoMC from '../../assets/images/mc-logo.png';
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from '@mui/material';
import './Navbar.css';

import { t } from 'i18next';
// import { useTranslation } from 'react-i18next';
// const lngs = {
//     en: { nativeName: 'English' },
//     es: { nativeName: 'Español' }
// };

const Navbar = () => {
    // const { t, i18n } = useTranslation;

    const [anchorElList, setAnchorElList] = useState(null);
    const [anchorElAccount, setAnchorElAccount] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const openList = Boolean(anchorElList);
    const openAccount = Boolean(anchorElAccount);
    const navigate = useNavigate();

    const options = [
        { abr: 'En', lang: 'English' },
        { abr: 'Es', lang: 'Español' }
    ];

    const handleClickListItem = (event) => {
        setAnchorElList(event.currentTarget);
    };
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        // setAnchorElAccount(null);
    };
    const handleCloseList = () => {
        setAnchorElList(null);
    };
    const handleClickAccount = (event) => {
        setAnchorElAccount(event.currentTarget);
    };
    const handleCloseAccount = () => {
        setAnchorElAccount(null);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="navbar">
            <div className="navbar__logo">
                <MenuIcon />
                <img src={LogoMC} alt="Miami Carga Logo" className="logo" />
            </div>
            <div className="navbar__menu">
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title={t('Language')}>
                        <IconButton
                            onClick={handleClickListItem}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'language-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}>
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: '1rem',
                                    backgroundColor: '#7b7b7b'
                                }}>
                                {options[selectedIndex].abr}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorElList}
                    id="language-menu"
                    open={openList}
                    onClose={handleCloseList}
                    onClick={handleCloseList}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0
                            }
                        }
                    }}
                    className="language-menu"
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                    {options.map(({ abr, lang }, index) => (
                        <MenuItem
                            key={abr}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}>
                            {lang}
                        </MenuItem>
                    ))}
                </Menu>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title={t('Account settings')}>
                        <IconButton
                            onClick={handleClickAccount}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={openAccount ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openAccount ? 'true' : undefined}>
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: '1rem',
                                    backgroundColor: '#7b7b7b'
                                }}>
                                P
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorElAccount}
                    id="account-menu"
                    open={openAccount}
                    onClose={handleCloseAccount}
                    onClick={handleCloseAccount}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            pt: 0.75,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0
                            }
                        }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                    <Avatar
                        sx={{ width: '40px', height: '40px', backgroundColor: '#2097E3' }}
                        className="avatar">
                        P
                    </Avatar>
                    <Typography
                        sx={{
                            width: '100%',
                            fontSize: '26px',
                            textAlign: 'center',
                            paddingTop: '10px'
                        }}>
                        Paola Rivero
                    </Typography>
                    <Typography
                        sx={{
                            width: '100%',
                            fontSize: '12px',
                            textAlign: 'center',
                            paddingX: 6,
                            paddingBottom: 2
                        }}>
                        info@trackingpremium.com
                    </Typography>
                    <Divider />
                    <MenuItem sx={{ paddingTop: 2, paddingLeft: 9 }} onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        {t('Sign out')}
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
};

export default Navbar;
