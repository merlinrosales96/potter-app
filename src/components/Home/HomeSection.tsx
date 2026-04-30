import { Box, Typography, Button, Container } from "@mui/material";
import hogwarts from '../../assets/images/banner.webp';

export default function HomeSection() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Imagen de fondo */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${hogwarts})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          filter: 'brightness(0.3) saturate(0.7)',
          transform: 'scale(1.05)',
          zIndex: 0,
        }}
      />

      {/* Gradientes de velo */}
      <Box sx={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(6,4,10,0.3) 0%, rgba(6,4,10,0.1) 40%, rgba(6,4,10,0.7) 80%, rgba(6,4,10,1) 100%)',
      }} />
      <Box sx={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at center 30%, rgba(80,40,120,0.15) 0%, transparent 70%)',
      }} />

      {/* Contenido */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, px: 3 }}>

        {/* Ornamento superior */}
        <Typography sx={{
          fontFamily: '"Cinzel", serif',
          fontSize: { xs: '9px', md: '10px' },
          letterSpacing: '8px',
          color: 'rgba(212,175,55,0.5)',
          mb: 3,
          textTransform: 'uppercase',
        }}>
          ✦ &nbsp; Est. 990 D.C. &nbsp; ✦
        </Typography>

        {/* Título principal con fuente Harry P */}
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"HarryP", "Cinzel", serif',
            fontSize: { xs: '3.5rem', sm: '5rem', md: '7rem' },
            fontWeight: 400,
            color: '#d4af37',
            textShadow: '0 0 60px rgba(212,175,55,0.25), 0 2px 4px rgba(0,0,0,0.8)',
            lineHeight: 1.1,
            mb: 1,
            letterSpacing: '4px',
          }}
        >
          Hogwarts
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Cinzel", serif',
            fontSize: { xs: '0.7rem', md: '0.8rem' },
            letterSpacing: { xs: '4px', md: '8px' },
            color: 'rgba(232,220,200,0.55)',
            textTransform: 'uppercase',
            mb: 4,
          }}
        >
          School of Witchcraft &amp; Wizardry
        </Typography>

        {/* Línea decorativa */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Box sx={{ height: '1px', width: 80, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4))' }} />
          <Typography sx={{ color: 'rgba(212,175,55,0.5)', fontSize: '12px' }}>✦</Typography>
          <Box sx={{ height: '1px', width: 80, background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.4))' }} />
        </Box>

        <Typography
          sx={{
            fontFamily: '"Crimson Text", serif',
            fontSize: { xs: '1.1rem', md: '1.35rem' },
            fontStyle: 'italic',
            color: 'rgba(232,220,200,0.65)',
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.7,
            mb: 5,
          }}
        >
          Explore the heroes, villains, and ancient magic of the Wizarding World.
          Discover the characters and spells that shaped a generation.
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Crimson Text", serif',
            fontSize: '1rem',
            fontStyle: 'italic',
            color: 'rgba(212,175,55,0.5)',
            mb: 5,
          }}
        >
          "Hogwarts will always be there to welcome you home."
        </Typography>

        {/* Botones */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            href="/characters/1"
            variant="outlined"
            sx={{
              px: 5, py: 1.5,
              borderColor: 'rgba(212,175,55,0.5)',
              color: '#d4af37',
              fontSize: '0.75rem',
              fontFamily: '"Cinzel", serif',
              letterSpacing: '3px',
              borderRadius: '2px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'rgba(212,175,55,0)',
                transition: 'background 0.4s ease',
              },
              '&:hover': {
                borderColor: '#d4af37',
                color: '#0e0b17',
                '&::before': { background: 'rgba(212,175,55,0.9)' },
                boxShadow: '0 0 30px rgba(212,175,55,0.2)',
              },
              '& span': { position: 'relative', zIndex: 1 },
            }}
          >
            <span>Characters</span>
          </Button>

          <Button
            href="/houses"
            variant="text"
            sx={{
              px: 5, py: 1.5,
              color: 'rgba(232,220,200,0.55)',
              fontSize: '0.75rem',
              fontFamily: '"Cinzel", serif',
              letterSpacing: '3px',
              borderRadius: '2px',
              border: '1px solid rgba(232,220,200,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'rgba(232,220,200,0.9)',
                border: '1px solid rgba(232,220,200,0.3)',
                bgcolor: 'rgba(232,220,200,0.04)',
              },
            }}
          >
            Houses
          </Button>
        </Box>

      </Container>

      {/* Indicador de scroll */}
      <Box sx={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
      }}>
        <Typography sx={{
          fontFamily: '"Cinzel", serif', fontSize: '8px',
          letterSpacing: '3px', color: 'rgba(212,175,55,0.3)',
          textTransform: 'uppercase',
        }}>Scroll</Typography>
        <Box sx={{
          width: '1px', height: 32,
          background: 'linear-gradient(to bottom, rgba(212,175,55,0.3), transparent)',
        }} />
      </Box>
    </Box>
  );
}
