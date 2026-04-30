import { useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Grid, Box, Typography, IconButton, Skeleton, Stack, Divider } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { itemsPerPage } from "../../utils/Utils";
import { useCharacterById } from "../../hooks/useCharacter";
import defaultImage from '../../assets/images/logo-house.webp';

const houseAccents: { [key: string]: { border: string; glow: string; text: string; bg: string } } = {
  gryffindor: { border: '#ae0001', glow: 'rgba(174,0,1,0.3)', text: '#e8a0a0', bg: 'rgba(174,0,1,0.08)' },
  slytherin: { border: '#2a6e42', glow: 'rgba(26,71,42,0.35)', text: '#5a9e6f', bg: 'rgba(26,71,42,0.1)' },
  ravenclaw: { border: '#222e9e', glow: 'rgba(14,26,143,0.3)', text: '#7b8fe8', bg: 'rgba(14,26,143,0.08)' },
  hufflepuff: { border: '#d4a020', glow: 'rgba(212,160,20,0.3)', text: '#f0c040', bg: 'rgba(212,160,20,0.08)' },
  normal: { border: 'rgba(212,175,55,0.4)', glow: 'rgba(212,175,55,0.2)', text: '#d4af37', bg: 'rgba(212,175,55,0.06)' },
};

const StatRow = ({ label, value, }: { label: string; value: string; accent: typeof houseAccents.normal }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', py: 1.5, borderBottom: '1px solid rgba(212,175,55,0.07)' }}>
    <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.62rem', letterSpacing: '1.5px', color: 'rgba(232,220,200,0.35)', textTransform: 'uppercase' }}>
      {label}
    </Typography>
    <Typography sx={{ fontFamily: '"Crimson Text", serif', fontSize: '1rem', color: value ? '#e8dcc8' : 'rgba(232,220,200,0.2)', fontStyle: value ? 'normal' : 'italic', textTransform: 'capitalize' }}>
      {value || 'Unknown'}
    </Typography>
  </Box>
);

const CharacterInfo = () => {
  const { id, index } = useParams<{ id: string; index: string }>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, loading } = useCharacterById(id ?? "");

  const accent = useMemo(() => {
    const k = data?.house?.toLowerCase() || "normal";
    return houseAccents[k] || houseAccents.normal;
  }, [data?.house]);

  const handleBack = () => {
    const page = Math.ceil((index ? parseInt(index) : 1) / itemsPerPage);
    state?.isHouse ? navigate(`/houses/characters/${data.house}/${page}`) : navigate(`/characters/${page}`);
  };

  if (!data && !loading) return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#06040a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{
          fontFamily: '"Cinzel", serif', fontSize: '9px',
          letterSpacing: '8px', color: 'rgba(212,175,55,0.3)',
          textTransform: 'uppercase', mb: 3,
        }}>
          ✦ &nbsp; Not Found &nbsp; ✦
        </Typography>
        <Typography sx={{
          fontFamily: '"Cinzel", serif', fontWeight: 700,
          fontSize: '1.6rem', color: '#e8dcc8', letterSpacing: '2px', mb: 1,
        }}>
          Character Not Found
        </Typography>
        <Typography sx={{
          fontFamily: '"Crimson Text", serif', fontStyle: 'italic',
          fontSize: '1.1rem', color: 'rgba(232,220,200,0.35)', mb: 5,
        }}>
          This wizard does not exist in our records...
        </Typography>
        <Box
          onClick={() => navigate('/characters/1')}
          sx={{
            display: 'inline-block', px: 4, py: 1.5,
            border: '1px solid rgba(212,175,55,0.3)', borderRadius: '2px',
            color: '#d4af37', fontFamily: '"Cinzel", serif',
            fontSize: '0.65rem', letterSpacing: '3px', cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': { bgcolor: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.5)' },
          }}
        >
          Back to Characters
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#06040a' }}>
      <Container component="main" maxWidth="lg" sx={{ py: 8, mt: { xs: 10, md: 12 } }}>

        {/* Back button */}
        <Box sx={{ mb: 5, textAlign: 'left' }}>
          <IconButton
            onClick={handleBack}
            sx={{
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: '2px',
              color: 'rgba(232,220,200,0.35)',
              p: 1,
              transition: 'all 0.3s ease',
              '&:hover': { color: '#d4af37', border: `1px solid ${accent.border}55`, bgcolor: accent.bg },
            }}
          >
            <ArrowBack sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        <Grid container spacing={5} alignItems="flex-start">

          {/* Columna izquierda - Perfil */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{
              position: 'relative',
              border: '1px solid rgba(212,175,55,0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
              background: 'rgba(14,11,20,0.95)',
            }}>
              {/* Borde superior de color */}
              <Box sx={{
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)`,
              }} />

              {loading ? (
                <Box sx={{ p: 3 }}>
                  <Skeleton variant="rectangular" height={320} sx={{ bgcolor: 'rgba(212,175,55,0.05)', borderRadius: '2px', mb: 2 }} />
                  <Skeleton variant="text" height={40} sx={{ bgcolor: 'rgba(212,175,55,0.05)' }} />
                  <Skeleton variant="text" width="60%" height={28} sx={{ bgcolor: 'rgba(212,175,55,0.05)', mx: 'auto' }} />
                </Box>
              ) : (
                <>
                  {/* Imagen */}
                  <Box sx={{ position: 'relative', height: 340, overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={data.image || defaultImage}
                      alt={data.name}
                      sx={{
                        width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'top',
                        filter: 'sepia(20%) brightness(0.8)',
                      }}
                    />
                    <Box sx={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
                      background: 'linear-gradient(to top, rgba(14,11,20,1) 0%, transparent 100%)',
                    }} />
                  </Box>

                  {/* Nombre */}
                  <Box sx={{ px: 3, pb: 3, pt: 0.5, textAlign: 'center' }}>
                    <Typography sx={{
                      fontFamily: '"Cinzel", serif', fontWeight: 700,
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      color: '#e8dcc8', mb: 1, letterSpacing: '1px',
                      lineHeight: 1.3,
                    }}>
                      {data.name}
                    </Typography>

                    {data.house && (
                      <Box sx={{
                        display: 'inline-block', px: 2, py: '4px',
                        background: accent.bg,
                        border: `1px solid ${accent.border}44`,
                        borderRadius: '2px', mb: 2,
                      }}>
                        <Typography sx={{
                          fontFamily: '"Cinzel", serif', fontSize: '0.6rem',
                          letterSpacing: '2px', color: accent.text, textTransform: 'uppercase',
                        }}>
                          {data.house}
                        </Typography>
                      </Box>
                    )}

                    <Divider sx={{ borderColor: 'rgba(212,175,55,0.08)', mb: 2 }} />

                    {/* Hair / Eyes */}
                    <Stack direction="row" spacing={3} justifyContent="center">
                      {[
                        { label: 'Hair', value: data.hairColour },
                        { label: 'Eyes', value: data.eyeColour },
                      ].map((item) => (
                        <Box key={item.label} sx={{ textAlign: 'center' }}>
                          <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.55rem', letterSpacing: '1.5px', color: accent.text, textTransform: 'uppercase', mb: 0.3 }}>
                            {item.label}
                          </Typography>
                          <Typography sx={{ fontFamily: '"Crimson Text", serif', fontSize: '0.9rem', color: item.value ? '#e8dcc8' : 'rgba(232,220,200,0.25)', fontStyle: item.value ? 'normal' : 'italic', textTransform: 'capitalize' }}>
                            {item.value || 'Unknown'}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </>
              )}
            </Box>
          </Grid>

          {/* Columna derecha - Detalles */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>

              {/* Sección: Información general */}
              <Box sx={{ border: '1px solid rgba(212,175,55,0.1)', borderRadius: '2px', overflow: 'hidden', background: 'rgba(14,11,20,0.95)' }}>
                <Box sx={{ px: 3, py: 2, borderBottom: '1px solid rgba(212,175,55,0.07)', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 3, height: 16, background: `linear-gradient(to bottom, ${accent.border}, transparent)`, flexShrink: 0 }} />
                  <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.65rem', letterSpacing: '3px', color: accent.text, textTransform: 'uppercase' }}>
                    Profile
                  </Typography>
                </Box>
                <Box sx={{ px: 3, pb: 1 }}>
                  {loading ? (
                    Array.from({ length: 4 }, (_, i) => `profile-stat-${i}`).map((skeletonKey) => (
                      <Skeleton key={skeletonKey} height={40} sx={{ bgcolor: 'rgba(212,175,55,0.04)' }} />
                    ))
                  ) : (
                    <>
                      <StatRow label="Species" value={data.species} accent={accent} />
                      <StatRow label="Gender" value={data.gender} accent={accent} />
                      <StatRow label="Ancestry" value={data.ancestry.replace('-', ' ')} accent={accent} />
                      <StatRow label="Date of Birth" value={data.dateOfBirth || ''} accent={accent} />
                      <StatRow label="Patronus" value={data.patronus} accent={accent} />
                    </>
                  )}
                </Box>
              </Box>

              {/* Sección: Varita */}
              <Box sx={{ border: '1px solid rgba(212,175,55,0.1)', borderRadius: '2px', overflow: 'hidden', background: 'rgba(14,11,20,0.95)' }}>
                <Box sx={{ px: 3, py: 2, borderBottom: '1px solid rgba(212,175,55,0.07)', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 3, height: 16, background: `linear-gradient(to bottom, ${accent.border}, transparent)`, flexShrink: 0 }} />
                  <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.65rem', letterSpacing: '3px', color: accent.text, textTransform: 'uppercase' }}>
                    Wand Specifications
                  </Typography>
                </Box>
                <Box sx={{ px: 3, pb: 1 }}>
                  {loading ? (
                    Array.from({ length: 3 }, (_, i) => `wand-stat-${i}`).map((skeletonKey) => (
                      <Skeleton key={skeletonKey} height={40} sx={{ bgcolor: 'rgba(212,175,55,0.04)' }} />
                    ))
                  ) : (
                    <>
                      <StatRow label="Wood" value={data.wand?.wood} accent={accent} />
                      <StatRow label="Core" value={data.wand?.core} accent={accent} />
                      <StatRow label="Length" value={data.wand?.length ? `${data.wand.length} inches` : ''} accent={accent} />
                    </>
                  )}
                </Box>
              </Box>

              {/* Sección: Alias */}
              {!loading && data.alternate_names?.length > 0 && (
                <Box sx={{ border: '1px solid rgba(212,175,55,0.1)', borderRadius: '2px', overflow: 'hidden', background: 'rgba(14,11,20,0.95)' }}>
                  <Box sx={{ px: 3, py: 2, borderBottom: '1px solid rgba(212,175,55,0.07)', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 3, height: 16, background: `linear-gradient(to bottom, ${accent.border}, transparent)`, flexShrink: 0 }} />
                    <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.65rem', letterSpacing: '3px', color: accent.text, textTransform: 'uppercase' }}>
                      Alias &amp; Titles
                    </Typography>
                  </Box>
                  <Box sx={{ px: 3, pb: 1 }}>
                    {data.alternate_names.map((name: string, i: number) => (
                      <Box key={name} sx={{ display: 'flex', alignItems: 'baseline', gap: 2.5, py: 1.5, borderBottom: '1px solid rgba(212,175,55,0.07)' }}>
                        <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.6rem', color: accent.text, minWidth: 24, opacity: 0.6 }}>
                          {String(i + 1).padStart(2, '0')}
                        </Typography>
                        <Typography sx={{ fontFamily: '"Crimson Text", serif', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(232,220,200,0.65)' }}>
                          {name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CharacterInfo;
