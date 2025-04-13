import { Link } from 'react-router-dom';
import { Grid, Typography, Box, Container, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { houses } from "../../utils/data/houses/houses";
import { typeColors } from '../../utils/Utils';


const Houses = () => {
    return (
        <Box component="section" id="characters" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 6 }}>
            <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 16, gap: 3 }}>
                <Box component="div">
                    <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h1" sx={{ pt: 12, pb: 8 }}>
                            Houses
                        </Typography>
                        <Grid container spacing={3}>
                            {
                                houses.map((item, index) => (
                                    <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
                                        <Link to={`/houses/characters/${item.name}/1`}>
                                            <Card sx={{ border: `2px solid ${typeColors[item.name]}` }}>
                                                <CardActionArea sx={{ height: '400px' }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <CardMedia
                                                            component="img"
                                                            sx={{
                                                                width: {
                                                                    xs: "90%",
                                                                },
                                                                height: {
                                                                    xs: "250px",
                                                                },
                                                                objectFit: "contain",
                                                            }}
                                                            image={item.image}
                                                            alt={item.name}
                                                        />
                                                    </Box>
                                                    <CardContent>
                                                        <Typography className='capitalize-text' variant="h4" color="text.secondary" display="block" gutterBottom>
                                                            {item.name}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Link>
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>
                </Box >
            </Container >
        </Box >
    );
}

export default Houses;