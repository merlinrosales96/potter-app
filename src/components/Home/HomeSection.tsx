import { Typography, Button, Box } from "@mui/material";
import hogwarts from '../../assets/images/banner.webp';

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
                href="/characters/1"
                variant="outlined"
                sx={{
                    mt: 5,
                    px: 8,
                    py: 2,
                    borderColor: '#C9A66B',
                    color: '#C9A66B',
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderRadius: '2px', // Aspecto de "marco"
                    letterSpacing: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(120deg, transparent, rgba(201, 166, 107, 0.2), transparent)',
                        transition: 'all 0.6s'
                    },
                    '&:hover': {
                        borderColor: '#E8C07C',
                        bgcolor: 'rgba(201, 166, 107, 0.05)',
                        boxShadow: '0 0 30px rgba(201, 166, 107, 0.3)',
                        transform: 'translateY(-5px)',
                        '&::before': {
                            left: '100%'
                        }
                    },
                }}
            >
                ENTER THE MAGIC WORLD
            </Button>
        </Box>
    )
}