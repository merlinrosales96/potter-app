import { FC } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/404.webp';

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#06040a', display: 'flex', alignItems: 'center' }}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          py: 8,
        }}
      >
        {/* Ornamento superior */}
        <Typography sx={{
          fontFamily: '"Cinzel", serif',
          fontSize: '9px',
          letterSpacing: '8px',
          color: 'rgba(212,175,55,0.3)',
          textTransform: 'uppercase',
          mb: 4,
        }}>
          ✦ &nbsp; Error &nbsp; ✦
        </Typography>

        {/* Imagen */}
        <Box
          component="img"
          src={logo}
          alt="Página no encontrada"
          sx={{
            maxWidth: '55%',
            height: 'auto',
            mb: 5,
            filter: 'sepia(30%) brightness(0.75)',
            transition: 'filter 0.4s ease',
            '&:hover': { filter: 'sepia(10%) brightness(0.9)' },
          }}
        />

        {/* Título */}
        <Typography sx={{
          fontFamily: '"Cinzel", serif',
          fontSize: { xs: '1.6rem', md: '2rem' },
          fontWeight: 700,
          color: '#e8dcc8',
          letterSpacing: '2px',
          mb: 1,
        }}>
          Page Not Found
        </Typography>

        {/* Subtítulo */}
        <Typography sx={{
          fontFamily: '"Crimson Text", serif',
          fontStyle: 'italic',
          fontSize: '1.25rem',
          color: 'rgba(232,220,200,0.4)',
          mb: 5,
        }}>
          By Merlin's beard...
        </Typography>

        {/* Línea decorativa */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
          <Box sx={{ height: '1px', width: 50, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3))' }} />
          <Typography sx={{ color: 'rgba(212,175,55,0.3)', fontSize: '10px' }}>✦</Typography>
          <Box sx={{ height: '1px', width: 50, background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.3))' }} />
        </Box>

        {/* Botón */}
        <Box
          onClick={() => navigate('/')}
          sx={{
            px: 5, py: 1.5,
            border: '1px solid rgba(212,175,55,0.35)',
            borderRadius: '2px',
            color: '#d4af37',
            fontFamily: '"Cinzel", serif',
            fontSize: '0.7rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.35s ease',
            userSelect: 'none',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: 'rgba(212,175,55,0)',
              transition: 'background 0.35s ease',
            },
            '&:hover': {
              borderColor: '#d4af37',
              color: '#06040a',
              boxShadow: '0 0 25px rgba(212,175,55,0.2)',
              '&::before': { background: 'rgba(212,175,55,0.92)' },
            },
            '& span': { position: 'relative', zIndex: 1 },
          }}
        >
          <span>Return Home</span>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
