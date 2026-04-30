import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid, Typography, Pagination, Box, Container,
  CardActionArea, Fade, Skeleton, Stack
} from '@mui/material';
import { itemsPerPage } from '../../utils/Utils';
import { useSpellList } from '../../hooks/useSpells';
import { Spell } from '../../utils/Types';

const Spells = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const page = useMemo(() => (id ? parseInt(id, 10) : 1), [id]);
  const { data = [], loading, responseCount = 0 } = useSpellList(page);

  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/spells/${value}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(responseCount / itemsPerPage);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#06040a' }}>
      <Container component="main" maxWidth="lg" sx={{ py: 8, mt: { xs: 10, md: 12 } }}>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography sx={{
            fontFamily: '"Cinzel", serif', fontSize: '9px',
            letterSpacing: '8px', color: 'rgba(212,175,55,0.4)',
            textTransform: 'uppercase', mb: 2,
          }}>
            ✦ &nbsp; Ancient Incantations &nbsp; ✦
          </Typography>
          <Typography variant="h2" sx={{
            fontFamily: '"Cinzel", serif', fontWeight: 700,
            color: '#e8dcc8', mb: 2, fontSize: { xs: '2rem', md: '2.8rem' },
            letterSpacing: '2px',
          }}>
            Magic Spells
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
            <Box sx={{ height: '1px', width: 60, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.35))' }} />
            <Typography sx={{ color: 'rgba(212,175,55,0.35)', fontSize: '10px' }}>✦</Typography>
            <Box sx={{ height: '1px', width: 60, background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.35))' }} />
          </Box>
          <Typography sx={{
            fontFamily: '"Crimson Text", serif', fontStyle: 'italic',
            fontSize: '1.1rem', color: 'rgba(232,220,200,0.35)',
          }}>
            "The wand chooses the wizard... but the wizard masters the spell"
          </Typography>
        </Box>

        {/* Grid */}
        <Grid container spacing={2}>
          {loading
            ? Array.from(new Array(itemsPerPage)).map((_, i) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={`sk-${i}`}>
                <Box sx={{
                  height: 130, border: '1px solid rgba(212,175,55,0.07)',
                  borderRadius: '2px', bgcolor: 'rgba(14,11,20,0.9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Stack spacing={1.5} alignItems="center" sx={{ width: '70%' }}>
                    <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: 'rgba(212,175,55,0.07)' }} />
                    <Skeleton variant="text" width="100%" height={20} sx={{ bgcolor: 'rgba(212,175,55,0.07)' }} />
                  </Stack>
                </Box>
              </Grid>
            ))
            : data.map((spell: Spell, index: number) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={spell.id}>
                <Fade in timeout={200 + index * 60}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 130,
                      border: '1px solid rgba(212,175,55,0.1)',
                      borderRadius: '2px',
                      background: 'rgba(14,11,20,0.9)',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0, left: 0, right: 0, height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
                        opacity: 0, transition: 'opacity 0.3s ease',
                      },
                      '&:hover': {
                        border: '1px solid rgba(212,175,55,0.25)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 30px -10px rgba(212,175,55,0.15)',
                        bgcolor: 'rgba(20,16,30,0.97)',
                        '&::before': { opacity: 1 },
                        '& .spell-rune': { opacity: 0.6, transform: 'rotate(15deg) scale(1.15)' },
                      },
                    }}
                    onClick={() => setSelectedSpell(spell)}
                  >
                    <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5, px: 2 }}>
                      {/* Runa decorativa SVG */}
                      <Box
                        className="spell-rune"
                        component="svg"
                        viewBox="0 0 24 24"
                        sx={{
                          width: 22, height: 22,
                          opacity: 0.25,
                          transition: 'all 0.3s ease',
                          color: '#d4af37',
                          flexShrink: 0,
                        }}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path d="M12 2L15 9H22L16.5 13.5L18.5 21L12 17L5.5 21L7.5 13.5L2 9H9L12 2Z" />
                      </Box>

                      <Typography sx={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        color: '#e8dcc8',
                        textAlign: 'center',
                        lineHeight: 1.4,
                        textTransform: 'capitalize',
                      }}>
                        {spell.name}
                      </Typography>
                    </CardActionArea>
                  </Box>
                </Fade>
              </Grid>
            ))}
        </Grid>

        {/* Paginación */}
        {!loading && totalPages > 1 && (
          <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages} page={page}
              onChange={handlePageChange}
              sx={{
                '& .MuiPaginationItem-root': {
                  fontFamily: '"Cinzel", serif', fontSize: '0.7rem',
                  color: 'rgba(232,220,200,0.4)',
                  border: '1px solid rgba(212,175,55,0.1)', borderRadius: '2px',
                  '&:hover': { color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)', bgcolor: 'rgba(212,175,55,0.05)' },
                  '&.Mui-selected': { color: '#d4af37', border: '1px solid rgba(212,175,55,0.4)', bgcolor: 'rgba(212,175,55,0.08)' },
                },
              }}
            />
          </Box>
        )}

        {/* Modal de detalle — estilo pergamino */}
        {selectedSpell && (
          <Box
            onClick={() => setSelectedSpell(null)}
            sx={{
              position: 'fixed', inset: 0, zIndex: 1300,
              bgcolor: 'rgba(6,4,10,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              px: 2,
              animation: 'fadeIn 0.2s ease',
              '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
            }}
          >
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                width: '100%', maxWidth: 440,
                background: '#0e0b17',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '2px',
                position: 'relative',
                animation: 'slideUp 0.25s ease',
                '@keyframes slideUp': { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
              }}
            >
              {/* Borde superior dorado */}
              <Box sx={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }} />

              {/* Botón cerrar */}
              <Box
                onClick={() => setSelectedSpell(null)}
                sx={{
                  position: 'absolute', top: 14, right: 14,
                  width: 24, height: 24,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(232,220,200,0.25)', cursor: 'pointer', fontSize: '14px',
                  border: '1px solid rgba(212,175,55,0.1)', borderRadius: '2px',
                  transition: 'all 0.2s ease',
                  '&:hover': { color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)' },
                }}
              >
                ✕
              </Box>

              <Box sx={{ px: 4, pt: 4, pb: 4, textAlign: 'center' }}>
                {/* Label */}
                <Typography sx={{
                  fontFamily: '"Cinzel", serif', fontSize: '8px',
                  letterSpacing: '4px', color: 'rgba(212,175,55,0.4)',
                  textTransform: 'uppercase', mb: 1.5,
                }}>
                  Ancient Incantation
                </Typography>

                {/* Nombre del hechizo */}
                <Typography sx={{
                  fontFamily: '"Cinzel", serif', fontWeight: 700,
                  fontSize: { xs: '1.3rem', md: '1.6rem' },
                  color: '#e8dcc8', letterSpacing: '1px',
                  textTransform: 'capitalize', mb: 3,
                }}>
                  {selectedSpell.name}
                </Typography>

                {/* Divider con runa */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(212,175,55,0.1)' }} />
                  <Typography sx={{ color: 'rgba(212,175,55,0.3)', fontSize: '10px' }}>✦</Typography>
                  <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(212,175,55,0.1)' }} />
                </Box>

                {/* Descripción */}
                <Typography sx={{
                  fontFamily: '"Crimson Text", serif',
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: 'rgba(232,220,200,0.55)',
                }}>
                  "{selectedSpell.description}"
                </Typography>
              </Box>

              {/* Ornamentos esquina */}
              {[
                { pos: { top: 8, left: 8 }, corner: 'tl' },
                { pos: { top: 8, right: 8 }, corner: 'tr' },
                { pos: { bottom: 8, left: 8 }, corner: 'bl' },
                { pos: { bottom: 8, right: 8 }, corner: 'br' },
              ].map(({ pos, corner }) => (
                <Box key={corner} sx={{ position: 'absolute', ...pos, width: 6, height: 6, border: '1px solid rgba(212,175,55,0.2)' }} />
              ))}
            </Box>
          </Box>
        )}

      </Container>
    </Box>
  );
};

export default Spells;
