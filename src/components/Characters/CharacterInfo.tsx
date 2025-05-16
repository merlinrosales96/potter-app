import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
    Container, Grid, Box, Paper, Typography, Card, CardMedia,
    CardContent, Skeleton, Chip, IconButton,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    CircularProgress, Stack, List, ListItem, ListItemAvatar, ListItemText, Avatar,
    Divider
} from "@mui/material";
import { ArrowBack, AutoFixHigh } from "@mui/icons-material";
import { typeColors, itemsPerPage } from "../../utils/Utils";
import { useCharacterById } from "../../hooks/useCharacter";
import image from '../../assets/images/anonimus.png';


const CharacterInfo = () => {
    const location = useLocation();
    const { id, index } = useParams<{ id: string; index: string }>();
    const navigate = useNavigate();
    const { data, loading } = useCharacterById(id ?? "");
    const isHouse = location.state?.isHouse;

    const goCharacters = () => {
        if (!isHouse)
            navigate(`/characters/${Math.ceil((index ? parseInt(index) : 1) / itemsPerPage)}`);
        else
            navigate(`/houses/characters/${data.house}/${Math.ceil((index ? parseInt(index) : 1) / itemsPerPage)}`);
    };

    useEffect(() => {

    }, []);

    if (loading) {
        return (
            <Box sx={{ pt: 16, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box component="section" id="character" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Container maxWidth="sm" component="main" className="text-left"
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 8, py: 6 }}>
                <Grid container spacing={6} alignItems="flex-start">
                    <Grid size={{ xs: 12 }}>
                        <IconButton onClick={() => goCharacters()}>
                            <ArrowBack />
                        </IconButton>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Card sx={{ border: `3px solid ${data ? typeColors[data?.house === "" ? "normal" : data?.house.toLowerCase()] : "normal"}` }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                    image={data?.image === "" ? image : data?.image}
                                    alt={data.name}
                                />
                            </Box>
                            {
                                loading ? (
                                    <Skeleton variant="text" width="60%" />
                                ) : (
                                    <CardContent>
                                        <Typography className='capitalize-text text-center' variant="h3" color="text.secondary">
                                            {data.name}
                                        </Typography>
                                        {
                                            data.house !== "" ? <Chip
                                                label={data?.house}
                                                sx={{
                                                    backgroundColor: `${typeColors[data ? data.house.toLowerCase() : "normal"]}`,
                                                    color: '#FFFFFF',
                                                    fontSize: '24px'
                                                }}
                                            />
                                                :
                                                <></>
                                        }
                                        <Divider sx={{ backgroundColor: '#2B2B2B', mt: 2, mb: 2 }} />
                                        {
                                            <Stack
                                                direction="row"
                                                spacing={3}
                                                sx={{
                                                    justifyContent: "flex-start",
                                                    alignItems: "flex-start",
                                                }}
                                            >
                                                {
                                                    data.hairColour !== "" ?
                                                        <Typography sx={{ whiteSpace: 'pre-line' }} className='capitalize-text' variant="h4" color="text.secondary">
                                                            {`Hair Color: \n ${data.hairColour}`}
                                                        </Typography>
                                                        : <></>
                                                }
                                                {
                                                    data.eyeColour !== "" ?
                                                        <Typography sx={{ whiteSpace: 'pre-line' }} className='capitalize-text' variant="h4" color="text.secondary">
                                                            {`Eyes Color: \n ${data.eyeColour}`}
                                                        </Typography>
                                                        : <></>
                                                }
                                            </Stack>
                                        }
                                    </CardContent>
                                )}
                        </Card>
                    </Grid>


                    {
                        data?.wand.core !== "" && data?.wand.wood !== "" && data?.wand.length !== null ?
                            <Grid size={data?.alternate_names.length > 0 ? { xs: 12, md: 6 } : { xs: 12 }}>
                                <Paper elevation={3}>
                                    <List sx={{ width: '100%', maxWidth: 360 }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'background.default', color: '#FFFFFF' }}>
                                                    <AutoFixHigh />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText sx={{ whiteSpace: 'pre-line' }} primary={<Typography sx={{ whiteSpace: 'pre-line' }} className='capitalize-text' variant="h4" color="text.secondary">
                                                Wand
                                            </Typography>} secondary={<Typography sx={{ whiteSpace: 'pre-line' }} className='capitalize-text' variant="h6" color="text.secondary">{`Wood: ${data.wand.wood} \n Core: ${data.wand.core} \n Length: ${data.wand.length} cm.`}</Typography>} />
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
                            :
                            <></>
                    }

                    {
                        data?.alternate_names.length > 0 ?
                            <Grid size={data?.wand.core !== "" && data?.wand.wood !== "" && data?.wand.length !== null ? { xs: 12, md: 6 } : { xs: 12 }}>
                                <Paper elevation={3}>
                                    <Typography sx={{ p: 1 }} className='capitalize-text text-center' variant="h4" color="text.secondary">
                                        Alternate Names
                                    </Typography>
                                    <TableContainer component={Paper} sx={{ height: 400, padding: 2 }}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        <Typography variant="h6" color="text.secondary">
                                                            #
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="h6" color="text.secondary">
                                                            Names
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data?.alternate_names.map((row, index) => (
                                                    <TableRow
                                                        key={row}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <Typography variant="h6" color="text.secondary">
                                                                {index + 1}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell component="th" scope="row" className='capitalize-text'>
                                                            <Typography variant="h6" color="text.secondary">
                                                                {row}
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                            : <></>
                    }

                </Grid>
            </Container>
        </Box>
    )
}

export default CharacterInfo;