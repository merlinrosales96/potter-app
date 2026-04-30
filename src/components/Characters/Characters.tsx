import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Grid, Typography, Pagination, Box, Container, Skeleton, Fade } from '@mui/material';
import CharacterCard from '../common/CharacterCard';
import { itemsPerPage } from '../../utils/Utils';
import { useCharacterList } from '../../hooks/useCharacter';
import { Character } from '../../utils/Types';

const Characters = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const page = useMemo(() => (id ? parseInt(id, 10) : 1), [id]);
  const { data = [], loading, responseCount = 0 } = useCharacterList(page);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/characters/${value}`);
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
            ✦ &nbsp; Wizards &amp; Witches &nbsp; ✦
          </Typography>
          <Typography variant="h2" sx={{
            fontFamily: '"Cinzel", serif', fontWeight: 700,
            color: '#e8dcc8', mb: 2, fontSize: { xs: '2rem', md: '2.8rem' },
            letterSpacing: '2px',
          }}>
            Characters
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Box sx={{ height: '1px', width: 60, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.35))' }} />
            <Typography sx={{ color: 'rgba(212,175,55,0.35)', fontSize: '10px' }}>✦</Typography>
            <Box sx={{ height: '1px', width: 60, background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.35))' }} />
          </Box>
        </Box>

        {/* Grid */}
        {loading ? (
          <Grid container spacing={2}>
            {Array.from({ length: itemsPerPage }, (_, i) => `skeleton-${i}`).map((skeletonKey) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={skeletonKey}>
                <Skeleton variant="rectangular" height={340} sx={{ borderRadius: '2px', bgcolor: 'rgba(212,175,55,0.05)' }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Fade in timeout={600}>
            <Box>
              <Grid container spacing={2}>
                {data.map((character: Character, index: number) => (
                  <Grid size={{ xs: 6, sm: 4, md: 3 }} key={`character-${character.id}`}>
                    <Link
                      to={`/character/${character.id}/${((page - 1) * itemsPerPage) + index + 1}`}
                      state={{ isHouse: false }}
                      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                    >
                      <CharacterCard house={character.house} name={character.name} image={character.image} />
                    </Link>
                  </Grid>
                ))}
              </Grid>

              {/* Paginación */}
              <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  count={totalPages} page={page}
                  onChange={handlePageChange}
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontFamily: '"Cinzel", serif',
                      fontSize: '0.75rem',
                      color: 'rgba(232,220,200,0.4)',
                      border: '1px solid rgba(212,175,55,0.1)',
                      borderRadius: '2px',
                      '&:hover': { color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)', bgcolor: 'rgba(212,175,55,0.05)' },
                      '&.Mui-selected': { color: '#d4af37', border: '1px solid rgba(212,175,55,0.4)', bgcolor: 'rgba(212,175,55,0.08)' },
                    },
                  }}
                />
              </Box>
            </Box>
          </Fade>
        )}

        {!loading && data.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography sx={{ fontFamily: '"Crimson Text", serif', fontStyle: 'italic', color: 'rgba(232,220,200,0.3)', fontSize: '1.2rem' }}>
              No wizards found in this parchment...
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Characters;
