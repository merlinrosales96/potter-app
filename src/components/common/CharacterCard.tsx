import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, Chip } from "@mui/material";
import { typeColors } from "../../utils/Utils";
import image2 from '../../assets/images/anonimus.png'

type CharacterCardProps = {
    house: string;
    image: string;
    name: string;
};

const CharacterCard = ({ house, image, name }: CharacterCardProps) => {
    return (
        <Card sx={{ border: `2px solid ${typeColors[house === "" ? "normal" : house.toLowerCase()]}` }}>
            <CardActionArea sx={{ height: '400px' }}>
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
                        image={image === "" ? image2 : image}
                        alt={name}
                    />
                </Box>
                <CardContent>
                    <Typography className='capitalize-text' variant="h4" color="text.secondary" display="block" gutterBottom>
                        {name}
                    </Typography>
                    {house !== "" ? <Chip
                        label={house}
                        sx={{
                            backgroundColor: `${typeColors[house.toLowerCase()]}`,
                            color: '#FFFFFF',
                            fontSize: '24px'
                        }}
                    />
                        :
                        <></>}

                </CardContent>
            </CardActionArea>
        </Card>
    )
}


export default CharacterCard;