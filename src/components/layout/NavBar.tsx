import { useState } from 'react';
import { Box, AppBar, Toolbar, Container, Avatar, IconButton, Drawer, Divider, MenuItem, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import logo from '../../assets/LOGO.png';
import { Link, useNavigate } from 'react-router-dom';
import { NavButtons } from '../../utils/data/layout/layout';


function NavBar() {


    const [open, setOpen] = useState(false);

    const navigate = useNavigate();


    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };


    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '20px',
                            bgcolor: 'rgba(201, 166, 107, 0.7)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            <Link to="/">
                                <Avatar src={logo} sx={{ marginLeft: 2, marginRight: 2, width: 36, height: 36 }} />
                            </Link>

                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {NavButtons.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={() => navigate(item.path ?? '/')}
                                        sx={{ py: '6px', px: '12px' }}
                                    >
                                        <Typography variant="h6" color="text.secondary">
                                            {item.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'flex' },
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                        </Box>


                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            <IconButton
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ minWidth: '30px', p: '4px' }}
                            >
                                <Menu />
                            </IconButton>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        minWidth: '60dvw',
                                        p: 2,
                                        backgroundColor: 'background.paper',
                                        flexGrow: 1,
                                    }}
                                >
                                    {
                                        NavButtons.map((item, index) => (
                                            <Link to={item.path} onClick={toggleDrawer(false)}>
                                                <MenuItem
                                                    key={index}
                                                >
                                                    <Typography variant='h5' color='text.secondary'>
                                                        {item.name}
                                                    </Typography>
                                                </MenuItem>
                                            </Link>
                                        ))
                                    }
                                    <Divider />
                                </Box>
                            </Drawer>

                        </Box>
                    </Toolbar>
                </Container>

            </AppBar>
        </div>
    );
}

export default NavBar;