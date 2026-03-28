import { Link } from 'react-router-dom';
import {
    Grid,
    Typography,
    Box,
    Container,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Fade,
    Skeleton,
} from '@mui/material';
import { houses } from "../../utils/data/houses/houses";
import { typeColors } from '../../utils/Utils';

const Houses = () => {
    const loading = houses.length === 0;

    return (
        <Container
            component="main"
            maxWidth="lg"
            sx={{
                py: 8,
                mt: { xs: 10, md: 14 }
            }}
        >
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 900,
                        mb: 2,
                        letterSpacing: '-1px'
                    }}
                >
                    Hogwarts Houses
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Select a house to explore its members
                </Typography>
            </Box>

            {/* Grid de Casas */}
            <Grid container spacing={4}>
                {loading ? (
                    Array.from(new Array(4)).map((_, index) => (
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={`house-skeleton-${index}`}>
                            <Card sx={{ borderRadius: 5, border: '2px solid', borderColor: 'divider' }}>
                                <Skeleton
                                    variant="rectangular"
                                    height={280}
                                    animation="wave"
                                    sx={{ bgcolor: 'rgba(201, 166, 107, 0.08)' }}
                                />
                                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                    <Skeleton
                                        variant="text"
                                        width="60%"
                                        height={32}
                                        sx={{ mx: 'auto', bgcolor: 'rgba(201, 166, 107, 0.08)' }}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    houses.map((item, index) => {
                        const houseColor = typeColors[item.name.toLowerCase()] || typeColors.normal;

                        return (
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={item.name}>
                                <Fade in timeout={500 + index * 200}>
                                    <Card
                                        sx={{
                                            borderRadius: 5,
                                            border: '2px solid',
                                            borderColor: 'divider',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            '&:hover': {
                                                transform: 'translateY(-12px)',
                                                borderColor: houseColor,
                                                boxShadow: `0 20px 40px -15px ${houseColor}88`,
                                                '& .house-image': {
                                                    transform: 'scale(1.1)',
                                                    filter: 'sepia(0%) brightness(1.1)',
                                                },
                                                '& .house-overlay': {
                                                    opacity: 1,
                                                }
                                            }
                                        }}
                                    >
                                        <Link
                                            to={`/houses/characters/${item.name}/1`}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            <CardActionArea sx={{ height: '100%' }}>
                                                {/* Contenedor de Imagen con Efecto de Baño de Color */}
                                                <Box
                                                    sx={{
                                                        height: '280px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        p: 4,
                                                        bgcolor: 'background.neutral',
                                                        overflow: 'hidden',
                                                        position: 'relative'
                                                    }}
                                                >
                                                    {/* Overlay de color de la casa */}
                                                    <Box 
                                                        className="house-overlay"
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            height: '100%',
                                                            background: `linear-gradient(to top, ${houseColor}66, transparent)`,
                                                            zIndex: 2,
                                                            opacity: 0,
                                                            transition: 'opacity 0.4s ease',
                                                            pointerEvents: 'none',
                                                        }}
                                                    />

                                                    <CardMedia
                                                        className="house-image"
                                                        component="img"
                                                        image={item.image}
                                                        alt={item.name}
                                                        sx={{
                                                            height: '100%',
                                                            width: 'auto',
                                                            objectFit: 'contain',
                                                            transition: 'all 0.5s ease',
                                                            filter: 'brightness(0.9)',
                                                            zIndex: 1
                                                        }}
                                                    />
                                                </Box>

                                                <CardContent sx={{ textAlign: 'center', py: 3, bgcolor: 'background.paper' }}>
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            fontWeight: 800,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '1px',
                                                            color: houseColor,
                                                            textShadow: (theme) => theme.palette.mode === 'dark' ? '0 2px 4px rgba(0,0,0,0.5)' : 'none'
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Link>
                                    </Card>
                                </Fade>
                            </Grid>
                        );
                    })
                )}
            </Grid>
        </Container>
    );
}

export default Houses;