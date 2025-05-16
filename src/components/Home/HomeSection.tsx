import { Typography, Button, Box } from "@mui/material";
import hogwarts from '../../assets/images/banner.png';

export default function HomeSection() {
    return (
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                backgroundImage: `url(${hogwarts})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.8)',
                backgroundBlendMode: 'darken'
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    color: '#C9A66B',
                    textShadow: '0 0 10px #C9A66B',
                }}
            >
                By Order of the Headmaster
            </Typography>

            <Typography
                variant="h4"
                sx={{
                    color: '#F5F5F5',
                }}
            >
                Welcome, Young Witch or Wizard
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    color: '#D3C0A0',
                    maxWidth: 700,
                    fontSize: '1.2rem',
                    lineHeight: 1.6,
                }}
            >
                Discover the iconic characters and magical spells from the Wizarding World. Explore the heroes, villains, and magic that make this universe unforgettable
            </Typography>

            <Typography
                variant="h6"
                sx={{
                    color: '#C9A66B',
                    fontStyle: 'italic',
                    mt: 2,
                }}
            >
                "Hogwarts will always be there to welcome you home."
            </Typography>

            <Button
                href={`/characters/1`}
                sx={{
                    mt: 3,
                    px: 5,
                    py: 1.8,
                    border: '2px solid #C9A66B',
                    color: '#C9A66B',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    boxShadow: '0 0 15px rgba(201, 166, 107, 0.5)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        backgroundColor: '#C9A66B',
                        color: '#121212',
                        boxShadow: '0 0 35px rgba(201, 166, 107, 0.8)',
                    },
                }}
            >
                Enter the Magic World
            </Button>
        </Box>
    )
}