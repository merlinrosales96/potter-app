import { useState } from 'react';
import { PaletteMode } from '@mui/material';
import { Box, AppBar, Toolbar, Container, Avatar, IconButton, Drawer, Divider } from '@mui/material';
import { Menu } from '@mui/icons-material';
import logo from '../../assets/LOGO.png';
import { Link } from 'react-router-dom';

const logoStyle = {
    width: '15%',
    height: '15%',
    cursor: 'pointer',
};

interface NavBarProps {
    mode: PaletteMode;
}

function NavBar({ mode }: NavBarProps) {


    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId: string) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
            setOpen(false);
        }
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
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '20px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(103, 26, 148, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                        })}
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

                            {location.pathname === "/"
                                ?
                                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    {/*NavButtons.map((item) => (
                                        <MenuItem
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            sx={{ py: '6px', px: '12px' }}
                                        >
                                            <Typography variant="body2" color="text.primary">
                                                {item.name}
                                            </Typography>
                                        </MenuItem>
                                    ))*/}
                                </Box>
                                :
                                <></>
                            }
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'flex' },
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                        </Box>

                        {
                            location.pathname === '/' ?

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
                                            {/*location.pathname === "/"
                                                ?
                                                NavButtons.map((item) => (
                                                    <MenuItem
                                                        key={item.id}
                                                        onClick={() => scrollToSection(item.id)}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                ))
                                                :
                                                <Link to="/">
                                                    <MenuItem

                                                    >
                                                        Inicio
                                                    </MenuItem>
                                                </Link>
                                            */}
                                            <Divider />
                                        </Box>
                                    </Drawer>

                                </Box>
                                :
                                <></>
                        }
                    </Toolbar>
                </Container>

            </AppBar>
        </div>
    );
}

export default NavBar;