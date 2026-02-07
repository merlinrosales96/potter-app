import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid, 
  Typography, Pagination, Box, Container,
  Card, CardContent, CardActionArea,
  Dialog, DialogTitle, DialogContent, IconButton, Fade,
  Snackbar, Alert, Skeleton, Stack, useTheme
} from '@mui/material';
import { Close as CloseIcon, AutoFixHigh } from '@mui/icons-material';
import { itemsPerPage } from '../../utils/Utils';
import { useSpellList } from '../../hooks/useSpells';
import { Spell } from '../../utils/Types';

const Spells = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const page = useMemo(() => (id ? parseInt(id, 10) : 1), [id]);
  const { data = [], loading, responseCount = 0 } = useSpellList(page);

  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [errorOpen, setErrorOpen] = useState(false);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/spells/${value}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(responseCount / itemsPerPage);

  // Estilo común para los Skeletons mágicos
  const skeletonMagicSx = {
    bgcolor: 'rgba(201, 166, 107, 0.08)',
    borderRadius: 4
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        py: 8,
        mt: { xs: 10, md: 14 },
        minHeight: '100vh'
      }}
    >
      <Snackbar open={errorOpen} autoHideDuration={5000} onClose={() => setErrorOpen(false)}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          Spell not found
        </Alert>
      </Snackbar>

      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 900, 
            letterSpacing: '-1px',
            textShadow: '0 0 20px rgba(201, 166, 107, 0.3)' 
          }}
        >
          Magic Spells
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontStyle: 'italic', opacity: 0.8 }}>
          "The wand chooses the wizard... but the wizard masters the spell"
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(itemsPerPage)).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`spell-skeleton-${index}`}>
              <Card sx={{ ...skeletonMagicSx, height: '160px', border: '1px solid rgba(201, 166, 107, 0.1)' }}>
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                  <Stack spacing={2} alignItems="center" sx={{ width: '100%' }}>
                    <Skeleton variant="circular" width={45} height={45} animation="wave" sx={{ bgcolor: 'rgba(201, 166, 107, 0.15)' }} />
                    <Skeleton variant="text" width="70%" height={30} animation="wave" sx={{ bgcolor: 'rgba(201, 166, 107, 0.15)' }} />
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))
          : data.map((spell: Spell, index: number) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={spell.id}>
              <Fade in timeout={300 + index * 100}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 5,
                    background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(0, 0, 0, 0) 100%)',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      borderColor: 'primary.main',
                      boxShadow: `0 12px 30px -10px ${theme.palette.primary.main}66`,
                      '& .magic-icon': {
                        transform: 'rotate(15deg) scale(1.2)',
                        filter: `drop-shadow(0 0 8px ${theme.palette.primary.main})`
                      }
                    }
                  }}
                >
                  <CardActionArea
                    onClick={() => setSelectedSpell(spell)}
                    sx={{ height: '160px' }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <AutoFixHigh 
                        className="magic-icon"
                        sx={{ 
                          mb: 2, 
                          fontSize: 40, 
                          color: 'primary.main',
                          transition: 'all 0.4s ease'
                        }} 
                      />
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 800, 
                          textTransform: 'capitalize',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {spell.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Fade>
            </Grid>
          ))}
      </Grid>

      {!loading && totalPages > 1 && (
        <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                fontWeight: 'bold',
                border: '1px solid rgba(201, 166, 107, 0.2)'
              }
            }}
          />
        </Box>
      )}

      {/* Spell Detail Dialog - Grimorio Style */}
      <Dialog
        open={Boolean(selectedSpell)}
        onClose={() => setSelectedSpell(null)}
        fullWidth
        maxWidth="xs"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 400 }}
        PaperProps={{
          sx: { 
            borderRadius: 6, 
            p: 1, 
            position: 'relative',
            background: 'linear-gradient(180deg, background.paper 0%, rgba(201, 166, 107, 0.05) 100%)',
            border: '2px solid rgba(201, 166, 107, 0.2)'
          }
        }}
      >
        <IconButton
          onClick={() => setSelectedSpell(null)}
          sx={{ position: 'absolute', right: 16, top: 16, color: 'text.secondary', zIndex: 1 }}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle sx={{ pt: 4, pb: 1, textAlign: 'center' }}>
          <Typography 
            variant="caption" 
            sx={{ 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: 2,
              color: 'primary.main',
              display: 'block',
              mb: 1
            }}
          >
            Ancient Incantation
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'capitalize' }}>
            {selectedSpell?.name}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ textAlign: 'center', pb: 4 }}>
          <Box sx={{ 
            py: 3, 
            px: 2,
            mt: 2,
            borderTop: '1px solid', 
            borderBottom: '1px solid',
            borderColor: 'divider',
            position: 'relative'
          }}>
            {/* Decoración tipo pergamino */}
            <AutoFixHigh sx={{ 
              position: 'absolute', 
              top: -12, 
              left: '50%', 
              transform: 'translateX(-50%)', 
              bgcolor: 'background.paper',
              px: 1,
              fontSize: 24,
              color: 'rgba(201, 166, 107, 0.4)'
            }} />
            
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: '1.2rem', 
                lineHeight: 1.7, 
                color: 'text.secondary',
                fontStyle: 'italic'
              }}
            >
              "{selectedSpell?.description}"
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Spells;