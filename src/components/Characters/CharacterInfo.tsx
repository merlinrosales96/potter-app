import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
    Container, Grid, Box, Paper, Typography, Card, CardMedia,
    CardContent, Skeleton, Chip, Divider, IconButton,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    CircularProgress
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
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
        <Container maxWidth="sm" component="section" className="text-left"
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
                            {
                                loading ? (
                                    <Skeleton variant="rectangular" width={140} height={140} />
                                ) : (
                                    <CardMedia
                                        className=''
                                        component="img"
                                        sx={{
                                            width: "30%",
                                            height: "30%",
                                        }}
                                        image={data?.image === "" ? image : data?.image}
                                        alt={data?.name}
                                    />
                                )}
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
                                    {
                                        data.hairColour !== "" || data.eyeColour !== ""
                                            ?
                                            <Box>
                                                <Divider sx={{ backgroundColor: '#2B2B2B', mt: 1 }} />
                                                <Grid container spacing={1} alignItems="flex-start" sx={{ pt: 1 }}>
                                                    <Grid size={{ xs: 4 }}>
                                                        <Typography className='capitalize-text' variant="h4" color="text.secondary">
                                                            Hair Color
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={{ xs: 4 }}>
                                                        <Typography className='capitalize-text' variant="h4" color="text.secondary">
                                                            Eyes Color
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={1} alignItems="flex-start">
                                                    <Grid size={{ xs: 4 }}>
                                                        <Typography className='capitalize-text' variant="h5" color="text.secondary">
                                                            {data.hairColour ? data.hairColour : "No information"}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={{ xs: 4 }}>
                                                        <Typography className='capitalize-text' variant="h5" color="text.secondary">
                                                            {data.eyeColour ? data.eyeColour : "No information"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            :
                                            <></>
                                    }
                                </CardContent>
                            )}
                    </Card>
                </Grid>


                {
                    data?.wand.core !== "" && data?.wand.wood !== "" && data?.wand.length !== null ?
                        <Grid size={data?.alternate_names.length > 0 ? { xs: 12, md: 6 } : { xs: 12 }}>
                            <Paper elevation={3} sx={{ height: 450 }}>
                                <Typography sx={{ p: 1 }} className='capitalize-text text-center' variant="h4" color="text.secondary">
                                    Wand
                                </Typography>
                                <Box sx={{ padding: 2 }}>
                                    <Typography className='capitalize-text' variant="h5" color="text.secondary">
                                        {`Wood: ${data?.wand.wood}`}
                                    </Typography>
                                    <Typography className='capitalize-text' variant="h5" color="text.secondary">
                                        {`Core: ${data?.wand.core}`}
                                    </Typography>
                                    <Typography className='capitalize-text' variant="h5" color="text.secondary">
                                        {`Length: ${data?.wand.length}`}
                                    </Typography>
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
    )
}

export default CharacterInfo;