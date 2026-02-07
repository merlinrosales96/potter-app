import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, Chip } from "@mui/material";
import { typeColors } from "../../utils/Utils";
import defaultImage from '../../assets/images/logo-house.webp';

type CharacterCardProps = {
  house: string;
  image: string;
  name: string;
};

const CharacterCard = ({ house, image, name }: CharacterCardProps) => {
  const houseKey = house?.toLowerCase() || "normal";
  const houseColor = typeColors[houseKey] || typeColors.normal;

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.paper',
        border: '2px solid',
        borderColor: 'divider', // Borde inicial sutil
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        // ESTO ES LO QUE ARREGLA EL HOVER:
        '&:hover': {
          transform: 'translateY(-10px)',
          borderColor: houseColor, // El borde cambia al color de la casa
          boxShadow: `0 10px 30px -5px ${houseColor}88`, // Brillo del color de la casa
          '& .magic-image': {
            transform: 'scale(1.1)',
            filter: 'sepia(0%) brightness(1.1)',
          },
          '& .house-overlay': {
            opacity: 1, // Mostramos el degradado de color
          }
        },
      }}
    >
      <CardActionArea sx={{ height: '100%' }}>
        {/* Contenedor de Imagen */}
        <Box sx={{ position: 'relative', overflow: 'hidden', height: '300px', bgcolor: 'rgba(0,0,0,0.05)' }}>

          {/* Capa de color de la casa (Overlay) */}
          <Box
            className="house-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(to top, ${houseColor}66, transparent)`,
              zIndex: 2, // Por encima de la imagen
              opacity: 0, // Oculto por defecto
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none', // No interfiere con clics
            }}
          />

          <CardMedia
            className="magic-image"
            component="img"
            image={image || defaultImage}
            alt={name}
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              filter: 'sepia(30%) brightness(0.8)', // Estilo antiguo
              transition: 'transform 0.6s ease, filter 0.6s ease',
              zIndex: 1,
            }}
          />
        </Box>

        <CardContent sx={{ textAlign: 'center', p: 3, bgcolor: 'background.paper' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              mb: 1.5,
              color: 'text.primary',
              // Aseguramos que el nombre resalte
              textShadow: (theme) => theme.palette.mode === 'dark' ? '0 2px 4px rgba(0,0,0,0.5)' : 'none'
            }}
          >
            {name}
          </Typography>

          <Box
            className="house-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(to top, ${houseColor}44, transparent)`,
              zIndex: 1,
              opacity: 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          {house ? (
            <Chip
              label={house}
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
          ) : (
            <Chip
              label="No House"
              variant="outlined"
              sx={{ 
                fontSize: '0.7rem', 
                fontWeight: 'bold',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                borderRadius: '4px'
              }}
            />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CharacterCard;