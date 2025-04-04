import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, CardActionArea, Typography, Pagination, Box, CardMedia, Chip, Container, Skeleton, Paper, CircularProgress, TextField } from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { typeColors, itemsPerPage } from '../../utils/Utils';
import { userCharacterList } from '../../hooks/useCharacter';
import { Character } from '../../utils/Types';
import image from '../../assets/images/anonimus.jpg'

const Characters: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(id ? parseInt(id) : 1);
    const [searchText, setSearchText] = useState<string>('');
    const [open, setOpen] = React.useState(false);
    const { data, loading, responseCount } = userCharacterList(page);

    useEffect(() => {

    }, []);

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        navigate(`/characters/${value}`);
    };

    if (loading) {
        return (
            <Box sx={{ pt: 16, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleClose = (
        _?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Box component="section" id="projects" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 6 }}>
            <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 16, gap: 3 }}>
                <Box component="div">
                    <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ pb: 8 }}>
                            Characters
                        </Typography>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert
                                onClose={handleClose}
                                severity="error"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                Character not found
                            </Alert>
                        </Snackbar>
                        <Typography variant="h1" sx={{ pb: 8 }}>
                            Characters
                        </Typography>
                        <Grid container spacing={3}>
                            {data.map((character: Character, index) => (
                                <Grid size={{ xs: 12, md: 6, lg: 3 }} key={character.id}>
                                    <Link to={`/character/${character?.id}/${((page - 1) * itemsPerPage) + index + 1}`}>
                                        <Card sx={{ border: `2px solid ${typeColors[character.house === "" ? "normal" : character.house.toLowerCase()]}` }}>
                                            <CardActionArea sx={{ height: '400px' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    {loading ? (
                                                        <Skeleton variant="rectangular" width={140} height={140} />
                                                    ) : (
                                                        <CardMedia
                                                            className=''
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
                                                            image={character.image === "" ? image : character.image}
                                                            alt={character.name}
                                                        />
                                                    )}
                                                </Box>
                                                {loading ? (
                                                    <Skeleton variant="text" width="60%" />
                                                ) : (
                                                    <CardContent>
                                                        <Typography className='capitalize-text' variant="h4" color="text.primary" display="block" gutterBottom>
                                                            {character.name}
                                                        </Typography>
                                                        {character.house !== "" ? <Chip
                                                            label={character.house}
                                                            sx={{
                                                                backgroundColor: `${typeColors[character.house.toLowerCase()]}`,
                                                                color: '#FFFFFF',
                                                                fontSize: '24px'
                                                            }}
                                                        />
                                                            :
                                                            <></>}

                                                    </CardContent>

                                                )}
                                            </CardActionArea>
                                        </Card>

                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                        <Pagination
                            count={Math.ceil(responseCount / itemsPerPage)}
                            page={page}
                            onChange={handleChange}
                            sx={{ marginTop: 2 }}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Characters;