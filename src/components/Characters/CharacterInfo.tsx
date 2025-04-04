import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container, Grid, Box, Paper, Typography, Card, CardMedia,
    CardContent, Skeleton, Chip, Divider, Pagination, IconButton,
    LinearProgress,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { typeColors, itemsPerPage } from "../../utils/Utils";
import { useCharacterById } from "../../hooks/useCharacter";
import image from '../../assets/images/anonimus.jpg';
//import axios from "../utils/axios";


const CharacterInfo = () => {

    const { id, index } = useParams<{ id: string; index: string }>();
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(index ? parseInt(index) : 1);
    const { data, loading } = useCharacterById(id ?? "");

    //const [locations, setLocations] = useState<string[]>([]);

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        navigate(`/pokemon/${value}`);
    };

    const goCharacters = () => {
        navigate(`/characters/${Math.ceil((index ? parseInt(index) : 1) / itemsPerPage)}`);
    };

    useEffect(() => {

    }, []);

    /*useEffect(() => {
        const fetchLocations = async () => {
          try {
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${id}/encounters`
            );
            const locationNames = response.data.map((loc: any) => loc.location_area.name);
            setLocations(locationNames);
          } catch (error) {
            console.error("Error fetching locations:", error);
            setLocations([]);
          } finally {
          }
        };
    
        fetchLocations();
      }, [id]);*/


    return (
        <Container maxWidth="md" component="section"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4, py: 6 }}>
            <Grid container spacing={6} alignItems="flex-start">
                <Grid size={{ xs: 12 }}>
                    <IconButton onClick={() => goCharacters()}>
                        <ArrowBack />
                    </IconButton>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Card sx={{ border: `2px solid ${data ? typeColors[data?.house === "" ? "normal" : data?.house.toLowerCase()] : "normal"}` }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {loading ? (
                                <Skeleton variant="rectangular" width={140} height={140} />
                            ) : (
                                <CardMedia
                                    className=''
                                    component="img"
                                    sx={{
                                        width: "40%",
                                        height: "40%", // Ajusta la altura según tu diseño
                                        // Cambia a 'contain' si prefieres que la imagen no se recorte
                                    }}
                                    image={data?.image === "" ? image : data?.image}
                                    alt={data?.name}
                                />
                            )}
                        </Box>
                        {loading ? (
                            <Skeleton variant="text" width="60%" />
                        ) : (
                            <CardContent>
                                <Typography className='capitalize-text' variant="h3" color="text.primary">
                                    {data?.name}
                                </Typography>
                                {data?.house !== "" ? <Chip
                                    label={data?.house}
                                    sx={{
                                        backgroundColor: `${typeColors[data?.house.toLowerCase()]}`,
                                        color: '#FFFFFF',
                                        fontSize: '24px'
                                    }}
                                />
                                    :
                                    <></>}
                                <Grid container spacing={1} alignItems="flex-start">
                                    {

                                    }
                                </Grid>
                                <Divider sx={{ p: 1 }} />
                                <Grid container spacing={1} alignItems="flex-start" sx={{ pt: 1 }}>
                                    <Grid size={{ xs: 4 }}>
                                        <Typography className='capitalize-text' variant="h4" color="text.primary">
                                            Hair Color
                                        </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 4 }}>
                                        <Typography className='capitalize-text' variant="h4" color="text.primary">
                                            Eyes Color
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="flex-start">
                                    <Grid size={{ xs: 4 }}>
                                        <Typography className='capitalize-text' variant="h5" color="text.primary">
                                            {data ? data.hairColour : ""}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 4 }}>
                                        <Typography className='capitalize-text' variant="h5" color="text.primary">
                                            {data ? data.eyeColour : ""}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>

                        )}
                    </Card>
                </Grid>


                {
                    data?.wand.core !== "" && data?.wand.wood !== "" && data?.wand.length !== null ?
                        <Grid size={data?.alternate_names.length > 0 ? { xs: 12, md: 6 } : { xs: 12 }}>
                            <Paper elevation={3} sx={{ height: 450 }}>
                                <Typography sx={{ p: 1 }} className='capitalize-text' variant="h4" color="text.primary">
                                    Wand
                                </Typography>
                                <Box sx={{ padding: 2 }}>

                                </Box>
                            </Paper>
                        </Grid>
                        :
                        <></>
                }

                {
                    data?.alternate_names.length > 0 ?
                        <Grid size={data?.wand.core !== "" && data?.wand.wood !== "" && data?.wand.length !== null ? { xs: 12, md: 6 } : { xs: 12 }}>
                            <Paper elevation={3}>
                                <Typography sx={{ p: 1 }} className='capitalize-text' variant="h4" color="text.primary">
                                    Alternate Names
                                </Typography>
                                <TableContainer component={Paper} sx={{ height: 400, padding: 2 }}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell>Names</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data?.alternate_names.map((row, index) => (
                                                <TableRow
                                                    key={row}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" className='capitalize-text'>
                                                        {row}
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
    )
}

export default CharacterInfo;