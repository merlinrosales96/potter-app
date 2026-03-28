import { useState, useEffect } from 'react';
import {
  Box, AppBar, Toolbar, Container, Avatar, IconButton,
  Drawer, Divider, Typography, Button, Stack
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, AutoFixHigh } from '@mui/icons-material'; // Icono de varita para el toque mágico
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/LOGO.webp';
import { NavButtons } from '../../utils/data/layout/layout';

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Efecto para cambiar el estilo al hacer scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: scrolled ? 1 : 2, // Se pega más arriba al bajar
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: scrolled ? '15px' : '999px', // De cápsula a rectángulo redondeado
            bgcolor: scrolled ? 'rgba(15, 15, 25, 0.85)' : 'rgba(201, 166, 107, 0.2)',
            backdropFilter: 'blur(16px)',
            border: '1px solid',
            borderColor: scrolled ? 'rgba(201, 166, 107, 0.3)' : 'rgba(255, 255, 255, 0.1)',
            px: { xs: 2, sm: 4 },
            height: scrolled ? 60 : 70,
            transition: 'all 0.4s ease',
            boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
          }}
        >
          {/* Logo Section con Brillo Mágico */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box sx={{
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: '50%',
                boxShadow: scrolled ? '0 0 15px #C9A66B' : 'none',
                transition: '0.3s'
              }
            }}>
              <Avatar
                src={logo}
                sx={{
                  width: 45, height: 45,
                  border: '1px solid rgba(201, 166, 107, 0.5)',
                  transition: '0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  '&:hover': { transform: 'rotate(360deg) scale(1.15)' }
                }}
              />
            </Box>
          </Link>

          {/* Desktop Navigation - Estilo Grimorio */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {NavButtons.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.name}
                  onClick={() => navigate(item.path ?? '/')}
                  sx={{
                    color: isActive ? '#C9A66B' : 'text.primary',
                    fontWeight: isActive ? 800 : 500,
                    fontSize: '0.85rem',
                    letterSpacing: '1.5px', // Estilo pergamino antiguo
                    textTransform: 'uppercase',
                    px: 2,
                    position: 'relative',
                    transition: '0.3s',
                    '&::after': { // Línea mágica inferior
                      content: '""',
                      position: 'absolute',
                      bottom: 5,
                      left: '20%',
                      width: isActive ? '60%' : '0%',
                      height: '2px',
                      bgcolor: '#C9A66B',
                      boxShadow: '0 0 8px #C9A66B',
                      transition: '0.3s',
                    },
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: '#E8C07C',
                      '&::after': { width: '60%' }
                    },
                  }}
                >
                  {item.name}
                </Button>
              );
            })}
          </Stack>

          {/* Botón de Modo Mágico (Mobile toggle con estilo) */}
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              display: { md: 'none' },
              color: '#C9A66B',
              border: '1px solid rgba(201, 166, 107, 0.3)'
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile Drawer Estilo "Mapa del Merodeador" */}
          <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                width: '100%',
                maxWidth: 320,
                bgcolor: 'rgba(18, 18, 28, 0.98)',
                backgroundImage: 'radial-gradient(circle at top right, rgba(201, 166, 107, 0.1), transparent)',
                backdropFilter: 'blur(10px)',
                borderLeft: '2px solid #C9A66B',
              }
            }}
          >
            <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                <Typography variant="h6" sx={{ color: '#C9A66B', fontWeight: 900, letterSpacing: 2 }}>
                  LUMOS
                </Typography>
                <IconButton onClick={toggleDrawer(false)} sx={{ color: '#C9A66B' }}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Stack spacing={3}>
                {NavButtons.map((item) => (
                  <Button
                    key={item.name}
                    fullWidth
                    onClick={() => {
                      navigate(item.path);
                      setOpen(false);
                    }}
                    startIcon={<AutoFixHigh sx={{ fontSize: 14 }} />}
                    sx={{
                      justifyContent: 'flex-start',
                      color: location.pathname === item.path ? '#C9A66B' : '#F5F5F5',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      letterSpacing: 2,
                      '&:hover': { color: '#C9A66B', bgcolor: 'rgba(201, 166, 107, 0.05)' }
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Stack>

              <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                <Divider sx={{ my: 3, borderColor: 'rgba(201, 166, 107, 0.2)' }} />
                <Typography variant="caption" sx={{ color: 'rgba(201, 166, 107, 0.6)', letterSpacing: 1 }}>
                  Mischief Managed
                </Typography>
              </Box>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;