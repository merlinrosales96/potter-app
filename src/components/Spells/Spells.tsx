import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardActionArea, Typography, Pagination, Box, Container, Skeleton, CircularProgress, Modal, Divider } from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { typeColors, itemsPerPage } from '../../utils/Utils';
import { useSpellList } from '../../hooks/useSpells';
import { Spell } from '../../utils/Types';

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const Spells = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(id ? parseInt(id) : 1);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { data, loading, responseCount } = useSpellList(page);
    const [description, setDescription] = useState('');

    useEffect(() => {

    }, []);

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        navigate(`/spells/${value}`);
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

    const handleOpenModal = (desc: string) => {
        setOpenModal(true);
        setDescription(desc);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <Box component="section" id="projects" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 6 }}>
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
                                Spell not found
                            </Alert>
                        </Snackbar>
                        <Typography variant="h1" sx={{ pt: 12, pb: 8 }}>
                            Spells
                        </Typography>
                        <Grid container spacing={3}>
                            {data.map((spell: Spell) => (
                                <Grid size={{ xs: 12, md: 6, lg: 3 }} key={spell.id}>
                                    <Card sx={{ border: `2px solid ${typeColors["normal"]}` }}>
                                        <CardActionArea sx={{ height: '200px' }} onClick={() => handleOpenModal(spell.description)}>
                                            {
                                                loading ? (
                                                    <Skeleton variant="text" width="60%" />
                                                ) : (
                                                    <CardContent>
                                                        <Typography className='capitalize-text' variant="h4" color="text.secondary" display="block" gutterBottom>
                                                            {spell.name}
                                                        </Typography>
                                                    </CardContent>

                                                )}
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Pagination
                            count={Math.ceil(responseCount / itemsPerPage)}
                            page={page}
                            onChange={handleChange}
                            sx={{ marginTop: 2 }}
                        />
                        <Modal open={openModal} onClose={handleCloseModal}>
                            <Box sx={modalStyle}>
                                <Typography variant="h4" color='text.secondary' component="h2">
                                    Description
                                </Typography>
                                <Divider sx={{ backgroundColor: '#2B2B2B' }} />
                                <Typography variant="h5" color='text.secondary' sx={{ mt: 2 }}>
                                    {description}
                                </Typography>
                            </Box>
                        </Modal>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Spells;