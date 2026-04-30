import { useState, useEffect } from 'react';
import { Box, Container, IconButton, Drawer, Typography, Button, Stack } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/LOGO.webp';
import { NavButtons } from '../../utils/data/layout/layout';

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1100,
        pt: scrolled ? 0 : 1,
        transition: 'padding 0.4s ease',
      }}
    >
      {/* Fondo del navbar */}
      <Box sx={{
        position: 'absolute', inset: 0,
        background: scrolled
          ? 'rgba(6,4,10,0.92)'
          : 'linear-gradient(to bottom, rgba(6,4,10,0.8), transparent)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.12)' : 'none',
        transition: 'all 0.4s ease',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: scrolled ? 56 : 70,
          transition: 'height 0.4s ease',
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <Box
              component="img"
              src={logo}
              alt="Hogwarts"
              sx={{
                width: scrolled ? 34 : 40,
                height: scrolled ? 34 : 40,
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.3))',
                transition: 'all 0.4s ease',
                '&:hover': { filter: 'drop-shadow(0 0 14px rgba(212,175,55,0.6))' },
              }}
            />
            <Typography sx={{
              fontFamily: '"Cinzel", serif',
              fontSize: scrolled ? '0.8rem' : '0.9rem',
              fontWeight: 700,
              letterSpacing: '3px',
              color: '#d4af37',
              transition: 'all 0.4s ease',
              display: { xs: 'none', sm: 'block' },
            }}>
              HOGWARTS
            </Typography>
          </Link>

          {/* Desktop Nav */}
          <Stack direction="row" spacing={0} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {NavButtons.map((item) => {
              const isActive = location.pathname.startsWith(item.path ?? '/') && item.path !== '/';
              const isHome = item.path === '/' && location.pathname === '/';
              const active = isActive || isHome;
              return (
                <Button
                  key={item.name}
                  onClick={() => navigate(item.path ?? '/')}
                  sx={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: '0.65rem',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: active ? '#d4af37' : 'rgba(232,220,200,0.5)',
                    fontWeight: active ? 700 : 400,
                    px: 2.5, py: 1,
                    borderRadius: '2px',
                    position: 'relative',
                    transition: 'color 0.3s ease',
                    bgcolor: 'transparent',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 4, left: '20%',
                      width: active ? '60%' : '0%',
                      height: '1px',
                      bgcolor: '#d4af37',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover': {
                      color: '#d4af37',
                      bgcolor: 'transparent',
                      '&::after': { width: '60%' },
                    },
                  }}
                >
                  {item.name}
                </Button>
              );
            })}
          </Stack>

          {/* Mobile toggle */}
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              display: { md: 'none' },
              color: 'rgba(212,175,55,0.7)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '2px',
              p: 0.75,
              '&:hover': { color: '#d4af37', border: '1px solid rgba(212,175,55,0.5)' },
            }}
          >
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: '100%', maxWidth: 300,
            bgcolor: '#0a0810',
            borderLeft: '1px solid rgba(212,175,55,0.15)',
          },
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
            <Typography sx={{
              fontFamily: '"Cinzel", serif', fontSize: '0.75rem',
              letterSpacing: '4px', color: '#d4af37', textTransform: 'uppercase',
            }}>
              Lumos
            </Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: 'rgba(212,175,55,0.4)', p: 0.5 }}>
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          <Stack spacing={0}>
            {NavButtons.map((item) => (
              <Button
                key={item.name}
                fullWidth
                onClick={() => { navigate(item.path); setOpen(false); }}
                sx={{
                  justifyContent: 'flex-start',
                  color: location.pathname === item.path ? '#d4af37' : 'rgba(232,220,200,0.45)',
                  fontFamily: '"Cinzel", serif',
                  fontSize: '0.8rem',
                  letterSpacing: '3px',
                  py: 1.5,
                  borderRadius: 0,
                  borderBottom: '1px solid rgba(212,175,55,0.06)',
                  '&:hover': { color: '#d4af37', bgcolor: 'rgba(212,175,55,0.03)' },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Stack>

          <Box sx={{ mt: 'auto', textAlign: 'center' }}>
            <Typography sx={{
              fontFamily: '"Crimson Text", serif', fontStyle: 'italic',
              fontSize: '0.85rem', color: 'rgba(212,175,55,0.25)', letterSpacing: '1px',
            }}>
              Mischief Managed
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

export default NavBar;
