import { Link } from 'react-router-dom';
import { Grid, Typography, Box, Container, Fade } from '@mui/material';
import { houses } from "../../utils/data/houses/houses";

const houseData: { [key: string]: { border: string; glow: string; text: string; badge: string; motto: string } } = {
  gryffindor: { border: '#ae0001', glow: 'rgba(174,0,1,0.3)', text: '#e8a0a0', badge: 'rgba(174,0,1,0.12)', motto: 'Courage & Bravery' },
  slytherin:  { border: '#2a6e42', glow: 'rgba(26,71,42,0.35)', text: '#5a9e6f', badge: 'rgba(26,71,42,0.18)', motto: 'Ambition & Cunning' },
  ravenclaw:  { border: '#222e9e', glow: 'rgba(14,26,143,0.3)', text: '#7b8fe8', badge: 'rgba(14,26,143,0.12)', motto: 'Wisdom & Wit' },
  hufflepuff: { border: '#d4a020', glow: 'rgba(212,160,20,0.3)', text: '#f0c040', badge: 'rgba(212,160,20,0.12)', motto: 'Loyalty & Patience' },
};

const Houses = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#06040a' }}>
      <Container component="main" maxWidth="lg" sx={{ py: 8, mt: { xs: 10, md: 12 } }}>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography sx={{
            fontFamily: '"Cinzel", serif', fontSize: '9px',
            letterSpacing: '8px', color: 'rgba(212,175,55,0.4)',
            textTransform: 'uppercase', mb: 2,
          }}>
            ✦ &nbsp; Founded by the Four &nbsp; ✦
          </Typography>
          <Typography variant="h2" sx={{
            fontFamily: '"Cinzel", serif', fontWeight: 700,
            color: '#e8dcc8', mb: 2, fontSize: { xs: '2rem', md: '3rem' },
            letterSpacing: '2px',
          }}>
            Hogwarts Houses
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
            <Box sx={{ height: '1px', width: 60, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.35))' }} />
            <Typography sx={{ color: 'rgba(212,175,55,0.35)', fontSize: '10px' }}>✦</Typography>
            <Box sx={{ height: '1px', width: 60, background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.35))' }} />
          </Box>
          <Typography sx={{
            fontFamily: '"Crimson Text", serif', fontStyle: 'italic',
            fontSize: '1.1rem', color: 'rgba(232,220,200,0.4)',
          }}>
            Select a house to explore its members
          </Typography>
        </Box>

        {/* Grid */}
        <Grid container spacing={3}>
          {houses.map((item, index) => {
            const key = item.name.toLowerCase();
            const accent = houseData[key] || { border: 'rgba(212,175,55,0.3)', glow: 'rgba(212,175,55,0.2)', text: '#d4af37', badge: 'rgba(212,175,55,0.1)', motto: '' };

            return (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={item.name}>
                <Fade in timeout={400 + index * 150}>
                  <Link to={`/houses/characters/${item.name}/1`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <Box sx={{
                      position: 'relative',
                      height: 360,
                      border: '1px solid rgba(212,175,55,0.1)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      background: 'rgba(14,11,20,0.9)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0, left: 0, right: 0, height: '2px',
                        background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)`,
                        opacity: 0, transition: 'opacity 0.4s ease',
                        zIndex: 3,
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute', inset: 0,
                        background: `radial-gradient(ellipse at center, ${accent.badge} 0%, transparent 70%)`,
                        opacity: 0, transition: 'opacity 0.4s ease',
                        zIndex: 0,
                      },
                      '&:hover': {
                        border: `1px solid ${accent.border}44`,
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 50px -15px ${accent.glow}`,
                        '&::before': { opacity: 1 },
                        '&::after': { opacity: 1 },
                        '& .house-crest': { transform: 'scale(1.08)', filter: 'brightness(1.1) saturate(1.1)' },
                        '& .house-name-text': { color: accent.text },
                      },
                    }}>
                      {/* Imagen del escudo */}
                      <Box sx={{ position: 'relative', zIndex: 1, mb: 3, flex: 1, display: 'flex', alignItems: 'center' }}>
                        <Box
                          className="house-crest"
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{
                            maxHeight: 200,
                            maxWidth: 160,
                            objectFit: 'contain',
                            filter: 'brightness(0.85)',
                            transition: 'all 0.4s ease',
                          }}
                        />
                      </Box>

                      {/* Nombre y motto */}
                      <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', pb: 3 }}>
                        <Typography
                          className="house-name-text"
                          sx={{
                            fontFamily: '"Cinzel", serif',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            letterSpacing: '3px',
                            color: '#e8dcc8',
                            textTransform: 'uppercase',
                            mb: 0.5,
                            transition: 'color 0.4s ease',
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography sx={{
                          fontFamily: '"Crimson Text", serif',
                          fontStyle: 'italic',
                          fontSize: '0.8rem',
                          color: 'rgba(232,220,200,0.3)',
                          letterSpacing: '0.5px',
                        }}>
                          {accent.motto}
                        </Typography>
                      </Box>

                      {/* Ornamentos de esquina */}
                      {['tl','tr','bl','br'].map((corner) => <Box key={corner} />)}
                    </Box>
                  </Link>
                </Fade>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Houses;
