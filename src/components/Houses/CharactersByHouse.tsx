import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Grid,
  Typography,
  Pagination,
  Box,
  Container,
  Snackbar,
  Alert,
  Fade,
  Skeleton,
  Stack
} from '@mui/material';
import CharacterCard from '../common/CharacterCard';
import { itemsPerPage } from '../../utils/Utils';
import { useCharacterByHouseList } from '../../hooks/useCharacterByHouse';
import { Character } from '../../utils/Types';

const CharactersByHouse = () => {
  const { id, index } = useParams<{ id: string, index: string }>();
  const navigate = useNavigate();

  const page = useMemo(() => (index ? parseInt(index, 10) : 1), [index]);

  const { data = [], loading, responseCount = 0 } = useCharacterByHouseList(page, id ?? '');

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/houses/characters/${id}/${value}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(responseCount / itemsPerPage);

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
      {/* Título dinámico */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            textTransform: 'capitalize',
            letterSpacing: '-1px'
          }}
        >
          {id} House
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {loading ? <Skeleton width={200} sx={{ mx: 'auto' }} /> : `Showing members of house ${id}`}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {loading
          ? // Estado de Carga con Skeletons
          Array.from(new Array(itemsPerPage)).map((_, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`skeleton-${idx}`}>
              <Stack spacing={2}>
                <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 4 }} />
                <Skeleton variant="text" width="80%" height={30} />
                <Skeleton variant="rounded" width="40%" height={24} />
              </Stack>
            </Grid>
          ))
          : // Lista de personajes una vez cargados
          data.map((character: Character, idx: number) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={character.id}>
              <Fade in timeout={300 + idx * 50}>
                <Box>
                  <Link
                    state={{ isHouse: true }}
                    to={`/character/${character.id}/${((page - 1) * itemsPerPage) + idx + 1}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <CharacterCard
                      house={character.house}
                      name={character.name}
                      image={character.image}
                    />
                  </Link>
                </Box>
              </Fade>
            </Grid>
          ))}
      </Grid>

      {/* Paginación: Solo visible cuando no está cargando */}
      {!loading && totalPages > 1 && (
        <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            color="primary"
            size="large"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      <Snackbar open={data.length === 0 && !loading} autoHideDuration={6000}>
        <Alert severity="info" variant="filled">
          No characters found for this house.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CharactersByHouse;