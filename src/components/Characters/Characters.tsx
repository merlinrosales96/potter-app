import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Grid,
  Typography,
  Pagination,
  Box,
  Container,
  Skeleton,
  Fade
} from '@mui/material';
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

  // Renderizamos Skeletons mientras carga
  const renderSkeletons = () => (
    <Grid container spacing={4}>
      {[...Array(itemsPerPage)].map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`skeleton-${index}`}>
          <Skeleton
            variant="rectangular"
            height={400}
            sx={{ borderRadius: 4, bgcolor: 'rgba(201, 166, 107, 0.1)' }}
          />
          <Skeleton variant="text" sx={{ mt: 1, fontSize: '2rem', width: '80%' }} />
          <Skeleton variant="text" sx={{ width: '40%' }} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        py: 8,
        // Añade esta línea:
        mt: { xs: 10, md: 14 }
      }}
    >
      <Typography
        variant="h2"
        align="center"
        sx={{
          fontWeight: 900,
          mb: 6,
          color: 'primary.main',
          textShadow: '0 0 20px rgba(201, 166, 107, 0.3)'
        }}
      >
        Characters
      </Typography>

      {loading ? (
        renderSkeletons()
      ) : (
        <Fade in timeout={800}>
          <Box>
            <Grid container spacing={4}>
              {data.map((character: Character, index: number) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={character.id}>
                  <Link
                    to={`/character/${character.id}/${((page - 1) * itemsPerPage) + index + 1}`}
                    state={{ isHouse: false }}
                    style={{ textDecoration: 'none' }}
                  >
                    <CharacterCard
                      house={character.house}
                      name={character.name}
                      image={character.image}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>

            {/* Paginación */}
            <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                shape="rounded"
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'primary.main',
                    borderColor: 'rgba(201, 166, 107, 0.5)',
                    fontSize: '1.1rem'
                  }
                }}
              />
            </Box>
          </Box>
        </Fade>
      )}

      {/* Manejo de estado vacío */}
      {!loading && data.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h5" color="text.secondary">
            No wizards found in this parchment...
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Characters;