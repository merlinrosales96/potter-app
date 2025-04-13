import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Grid, Typography, Pagination, Box, Container, CircularProgress } from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CharacterCard from '../common/CharacterCard';
import { itemsPerPage } from '../../utils/Utils';
import { useCharacterByHouseList } from '../../hooks/useCharacterByHouse';
import { Character } from '../../utils/Types';

const CharactersByHouse = () => {

    const { id, index } = useParams<{ id: string, index: string }>();
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(index ? parseInt(index) : 1);
    const [open, setOpen] = React.useState(false);
    const { data, loading, responseCount } = useCharacterByHouseList(page, id ?? '');

    useEffect(() => {

    }, []);

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        navigate(`/houses/characters/${id}/${value}`);
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
        <Box component="section" id="characters" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 6 }}>
            <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 16, gap: 3 }}>
                <Box component="div">
                    <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                        <Typography variant="h1" sx={{ pt: 12, pb: 8 }}>
                            Characters
                        </Typography>
                        <Grid container spacing={3}>
                            {data.map((character: Character, index) => (
                                <Grid size={{ xs: 12, md: 6, lg: 3 }} key={character.id}>
                                    <Link state={{ isHouse: true }} to={`/character/${character?.id}/${((page - 1) * itemsPerPage) + index + 1}`}>
                                        <CharacterCard house={character.house} name={character.name} image={character.image} />
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

export default CharactersByHouse;