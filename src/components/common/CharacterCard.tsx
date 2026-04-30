import { Box, Typography } from "@mui/material";
import defaultImage from '../../assets/images/logo-house.webp';

type CharacterCardProps = {
  house: string;
  image: string;
  name: string;
};

const houseAccents: { [key: string]: { border: string; glow: string; badge: string; text: string } } = {
  gryffindor: { border: '#ae0001', glow: 'rgba(174,0,1,0.35)', badge: 'rgba(174,0,1,0.15)', text: '#e8a0a0' },
  slytherin:  { border: '#2a6e42', glow: 'rgba(26,71,42,0.4)',  badge: 'rgba(26,71,42,0.2)',  text: '#5a9e6f' },
  ravenclaw:  { border: '#222e9e', glow: 'rgba(14,26,143,0.35)', badge: 'rgba(14,26,143,0.15)', text: '#7b8fe8' },
  hufflepuff: { border: '#d4a020', glow: 'rgba(212,160,20,0.35)', badge: 'rgba(212,160,20,0.15)', text: '#f0c040' },
  normal:     { border: 'rgba(212,175,55,0.3)', glow: 'rgba(212,175,55,0.2)', badge: 'rgba(212,175,55,0.1)', text: '#d4af37' },
};

const CharacterCard = ({ house, image, name }: CharacterCardProps) => {
  const houseKey = house?.toLowerCase() || "normal";
  const accent = houseAccents[houseKey] || houseAccents.normal;

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        borderRadius: '2px',
        overflow: 'hidden',
        border: '1px solid rgba(212,175,55,0.12)',
        background: 'rgba(14,11,20,0.9)',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)`,
          opacity: 0,
          transition: 'opacity 0.35s ease',
          zIndex: 3,
        },
        '&:hover': {
          border: `1px solid ${accent.border}55`,
          transform: 'translateY(-6px)',
          boxShadow: `0 16px 40px -10px ${accent.glow}`,
          '&::before': { opacity: 1 },
          '& .char-image': { transform: 'scale(1.06)', filter: 'sepia(0%) brightness(1.05)' },
          '& .image-veil': { opacity: 0.6 },
        },
      }}
    >
      {/* Imagen */}
      <Box sx={{ position: 'relative', height: 280, overflow: 'hidden', bgcolor: '#070510' }}>
        <Box
          component="img"
          className="char-image"
          src={image || defaultImage}
          alt={name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            filter: 'sepia(25%) brightness(0.75)',
            transition: 'transform 0.5s ease, filter 0.5s ease',
          }}
        />
        {/* Velo de color de casa */}
        <Box
          className="image-veil"
          sx={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to top, ${accent.border} 0%, transparent 60%)`,
            opacity: 0.3,
            transition: 'opacity 0.4s ease',
          }}
        />
        {/* Gradiente inferior */}
        <Box sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(to top, rgba(14,11,20,1) 0%, transparent 100%)',
          zIndex: 2,
        }} />
      </Box>

      {/* Contenido */}
      <Box sx={{ px: 2.5, pt: 1.5, pb: 2.5, position: 'relative' }}>
        <Typography
          sx={{
            fontFamily: '"Cinzel", serif',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#e8dcc8',
            mb: 1,
            lineHeight: 1.3,
            letterSpacing: '0.3px',
          }}
        >
          {name}
        </Typography>

        {house ? (
          <Box
            sx={{
              display: 'inline-block',
              px: 1.5, py: '3px',
              background: accent.badge,
              border: `1px solid ${accent.border}55`,
              borderRadius: '2px',
            }}
          >
            <Typography sx={{
              fontFamily: '"Cinzel", serif',
              fontSize: '0.6rem',
              letterSpacing: '1.5px',
              color: accent.text,
              textTransform: 'uppercase',
            }}>
              {house}
            </Typography>
          </Box>
        ) : (
          <Box sx={{
            display: 'inline-block', px: 1.5, py: '3px',
            border: '1px solid rgba(212,175,55,0.15)', borderRadius: '2px',
          }}>
            <Typography sx={{
              fontFamily: '"Cinzel", serif', fontSize: '0.6rem',
              letterSpacing: '1.5px', color: 'rgba(232,220,200,0.3)',
              textTransform: 'uppercase',
            }}>
              No House
            </Typography>
          </Box>
        )}
      </Box>

      {/* Ornamento esquina */}
      <Box sx={{
        position: 'absolute', top: 8, right: 8, zIndex: 4,
        width: 6, height: 6, border: `1px solid ${accent.border}66`,
        '&::before': {
          content: '""', position: 'absolute',
          top: -4, right: -4, width: 4, height: 4,
          border: `1px solid ${accent.border}44`,
        },
      }} />
    </Box>
  );
};

export default CharacterCard;
