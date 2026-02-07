import { useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Container, Grid, Box, Paper, Typography, Card,
  Chip, IconButton, Table, TableBody, TableCell,
  TableContainer, TableRow, Stack, Avatar, Divider, Skeleton
} from "@mui/material";
import { ArrowBack, AutoFixHigh, ColorLens, Visibility } from "@mui/icons-material";
import { typeColors, itemsPerPage } from "../../utils/Utils";
import { useCharacterById } from "../../hooks/useCharacter";
import defaultImage from '../../assets/images/logo-house.webp';

const CharacterInfo = () => {
  const { id, index } = useParams<{ id: string; index: string }>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, loading } = useCharacterById(id ?? "");

  const houseColor = useMemo(() => {
    const houseKey = data?.house?.toLowerCase() || "normal";
    return typeColors[houseKey] || typeColors.normal;
  }, [data?.house]);

  const handleBack = () => {
    const page = Math.ceil((index ? parseInt(index) : 1) / itemsPerPage);
    state?.isHouse
      ? navigate(`/houses/characters/${data.house}/${page}`)
      : navigate(`/characters/${page}`);
  };

  if (!data && !loading) return null;

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        py: 8,
        mt: { xs: 10, md: 14 },
        animation: 'fadeIn 0.8s ease-in-out',
        '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } }
      }}
    >
      {/* Botón de Regreso Estilizado */}
      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'flex-start' }}>
        <IconButton
          onClick={handleBack}
          sx={{
            bgcolor: 'background.paper',
            boxShadow: `0 0 15px rgba(0,0,0,0.2)`,
            border: '1px solid',
            borderColor: 'divider',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: houseColor,
              color: 'white',
              transform: 'translateX(-5px)',
              boxShadow: `0 0 20px ${houseColor}66`
            }
          }}
        >
          <ArrowBack />
        </IconButton>
      </Box>

      <Grid container spacing={5} alignItems="stretch">
        {/* Sección de Perfil / "Cromo Mágico" */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card
            elevation={0}
            sx={{
              p: 1, // Espacio para el borde doble
              height: '100%',
              borderRadius: 8,
              background: `linear-gradient(135deg, ${houseColor}22 0%, rgba(0,0,0,0) 100%)`,
              border: '2px solid',
              borderColor: 'divider',
              position: 'relative',
              overflow: 'visible'
            }}
          >
            <Box sx={{
              p: 4,
              bgcolor: 'background.paper',
              borderRadius: 7,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              border: '1px solid',
              borderColor: 'divider'
            }}>
              {loading ? (
                <Stack spacing={2} alignItems="center" sx={{ width: '100%' }}>
                  <Skeleton variant="circular" width={220} height={220} animation="wave" />
                  <Skeleton variant="text" width="80%" height={60} />
                  <Skeleton variant="rounded" width={140} height={32} />
                  <Divider sx={{ width: '100%', my: 2 }} />
                  <Stack direction="row" spacing={4}><Skeleton width={80} /><Skeleton width={80} /></Stack>
                </Stack>
              ) : (
                <>
                  <Avatar
                    src={data.image || defaultImage}
                    alt={data.name}
                    sx={{
                      width: 220,
                      height: 220,
                      mb: 3,
                      border: `8px double ${houseColor}`,
                      boxShadow: `0px 15px 35px -10px ${houseColor}99`,
                      bgcolor: 'background.default',
                      objectPosition: 'top',
                      transition: 'transform 0.5s ease',
                      '&:hover': { transform: 'scale(1.05) rotate(2deg)' }
                    }}
                  />
                  <Typography variant="h3" sx={{
                    fontWeight: 900,
                    mb: 1,
                    letterSpacing: '-1.5px',
                    fontFamily: '"HarryP", "Roboto", "Arial"', // Tipografía temática si está disponible
                    color: 'text.primary'
                  }}>
                    {data.name}
                  </Typography>

                  {data.house && (
                    <Chip
                      label={data.house}
                      sx={{
                        backgroundColor: houseColor,
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        borderRadius: '4px',
                        boxShadow: `0 4px 10px ${houseColor}44`
                      }}
                    />
                  )}

                  <Divider sx={{ width: '100%', my: 2, borderColor: `${houseColor}33` }} />

                  <Stack direction="row" spacing={5} justifyContent="center" sx={{ mt: 2 }}>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: houseColor, textTransform: 'uppercase', letterSpacing: '1px' }}>Hair</Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <ColorLens sx={{ fontSize: 18, opacity: 0.7 }} />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{data.hairColour || 'Unknown'}</Typography>
                      </Stack>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: houseColor, textTransform: 'uppercase', letterSpacing: '1px' }}>Eyes</Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Visibility sx={{ fontSize: 18, opacity: 0.7 }} />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{data.eyeColour || 'Unknown'}</Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </>
              )}
            </Box>
          </Card>
        </Grid>

        {/* Detalles Técnicos / "Grimorio" */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={4}>
            {/* Tarjeta de Varita */}
            <Paper
              variant="outlined"
              sx={{
                p: 4,
                borderRadius: 6,
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(to right, background.paper, transparent)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: '6px',
                  bgcolor: houseColor
                }
              }}
            >
              {loading ? (
                <Stack spacing={2}><Skeleton width="40%" height={40} /><Skeleton variant="rectangular" height={60} /></Stack>
              ) : (
                <>
                  <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, fontWeight: 800 }}>
                    <AutoFixHigh sx={{ color: houseColor, fontSize: 28 }} />
                    Wand Specifications
                  </Typography>
                  <Grid container spacing={3}>
                    {[
                      { label: 'Wood', value: data.wand.wood },
                      { label: 'Core', value: data.wand.core },
                      { label: 'Length', value: data.wand.length ? `${data.wand.length} cm` : 'Not specified' }
                    ].map((item) => (
                      <Grid size={{ xs: 4 }} key={item.label}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>{item.label}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, mt: 0.5, color: item.value ? 'text.primary' : 'text.disabled' }}>
                          {item.value || 'N/A'}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Paper>

            {/* Tabla de Nombres Alternativos */}
            {loading ? (
              <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 6 }} />
            ) : data.alternate_names?.length > 0 && (
              <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 6, bgcolor: 'transparent' }}>
                <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(0,0,0,0.02)' }}>
                  <Typography sx={{ fontWeight: 900, letterSpacing: '1px' }} variant="h6">ALIAS & TITLES</Typography>
                </Box>
                <Table>
                  <TableBody>
                    {data.alternate_names.map((name, i) => (
                      <TableRow key={name} sx={{ '&:last-child td': { border: 0 }, '&:hover': { bgcolor: `${houseColor}08` } }}>
                        <TableCell sx={{ width: 80, fontWeight: 900, color: houseColor, fontSize: '1.1rem' }}>
                          {String(i + 1).padStart(2, '0')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontStyle: 'italic', color: 'text.secondary' }}>
                          {name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CharacterInfo;