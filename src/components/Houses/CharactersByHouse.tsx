import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Grid, Typography, Pagination, Box, Container, Fade, Skeleton } from '@mui/material';
import CharacterCard from '../common/CharacterCard';
import { itemsPerPage } from '../../utils/Utils';
import { useCharacterByHouseList } from '../../hooks/useCharacterByHouse';
import { Character } from '../../utils/Types';

const houseAccents: { [key: string]: { border: string; text: string; bg: string } } = {
  gryffindor: { border: '#ae0001', text: '#e8a0a0', bg: 'rgba(174,0,1,0.08)' },
  slytherin:  { border: '#2a6e42', text: '#5a9e6f', bg: 'rgba(26,71,42,0.1)' },
  ravenclaw:  { border: '#222e9e', text: '#7b8fe8', bg: 'rgba(14,26,143,0.08)' },
  hufflepuff: { border: '#d4a020', text: '#f0c040', bg: 'rgba(212,160,20,0.08)' },
};

const CharactersByHouse = () => {
  const { id, index } = useParams<{ id: string; index: string }>();
  const navigate = useNavigate();

  const page = useMemo(() => (index ? parseInt(index, 10) : 1), [index]);
  const { data = [], loading, responseCount = 0 } = useCharacterByHouseList(page, id ?? '');

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/houses/characters/${id}/${value}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(responseCount / itemsPerPage);
  const accent = houseAccents[id?.toLowerCase() ?? ''] ?? { border: 'rgba(212,175,55,0.4)', text: '#d4af37', bg: 'rgba(212,175,55,0.06)' };

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
            ✦ &nbsp; Hogwarts Houses &nbsp; ✦
          </Typography>

          <Typography variant="h2" sx={{
            fontFamily: '"Cinzel", serif', fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.8rem' },
            letterSpacing: '2px', textTransform: 'capitalize',
            color: accent.text, mb: 1,
          }}>
            {id} House
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ height: '1px', width: 60, background: `linear-gradient(to right, transparent, ${accent.border}55)` }} />
            <Typography sx={{ color: `${accent.border}88`, fontSize: '10px' }}>✦</Typography>
            <Box sx={{ height: '1px', width: 60, background: `linear-gradient(to left, transparent, ${accent.border}55)` }} />
          </Box>

          <Typography sx={{
            fontFamily: '"Crimson Text", serif', fontStyle: 'italic',
            fontSize: '1rem', color: 'rgba(232,220,200,0.3)',
          }}>
            {loading
              ? <Skeleton width={180} sx={{ mx: 'auto', bgcolor: 'rgba(212,175,55,0.05)' }} />
              : `${responseCount} members found`}
          </Typography>
        </Box>

        {/* Grid */}
        <Grid container spacing={2}>
          {loading
            ? Array.from(new Array(itemsPerPage)).map((_, i) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={`sk-${i}`}>
                <Skeleton variant="rectangular" height={340} sx={{ borderRadius: '2px', bgcolor: 'rgba(212,175,55,0.05)' }} />
              </Grid>
            ))
            : data.map((character: Character, idx: number) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={character.id}>
                <Fade in timeout={200 + idx * 50}>
                  <Box>
                    <Link
                      state={{ isHouse: true }}
                      to={`/character/${character.id}/${((page - 1) * itemsPerPage) + idx + 1}`}
                      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                    >
                      <CharacterCard house={character.house} name={character.name} image={character.image} />
                    </Link>
                  </Box>
                </Fade>
              </Grid>
            ))}
        </Grid>

        {/* Estado vacío */}
        {!loading && data.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 12 }}>
            <Typography sx={{
              fontFamily: '"Crimson Text", serif', fontStyle: 'italic',
              fontSize: '1.2rem', color: 'rgba(232,220,200,0.25)',
            }}>
              No members found for this house...
            </Typography>
          </Box>
        )}

        {/* Paginación */}
        {!loading && totalPages > 1 && (
          <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages} page={page}
              onChange={handleChange}
              showFirstButton showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  fontFamily: '"Cinzel", serif', fontSize: '0.7rem',
                  color: 'rgba(232,220,200,0.4)',
                  border: '1px solid rgba(212,175,55,0.1)', borderRadius: '2px',
                  '&:hover': { color: accent.text, border: `1px solid ${accent.border}55`, bgcolor: accent.bg },
                  '&.Mui-selected': { color: accent.text, border: `1px solid ${accent.border}66`, bgcolor: accent.bg },
                },
              }}
            />
          </Box>
        )}

      </Container>
    </Box>
  );
};

export default CharactersByHouse;
