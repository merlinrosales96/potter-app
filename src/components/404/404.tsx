import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/404.png';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Box component="img"
        src={logo}
        alt="Página no encontrada"
        sx={{
          maxWidth: "50%",
          height: "auto",
          mb: 4,
        }}
      />
      <Typography variant="h3" gutterBottom>
        Oops! Page not found
      </Typography>
      <Typography variant="h4" color="text.secondary" mb={3}>
        by Merlin's beard.
      </Typography>
      <Button
        onClick={handleGoHome}
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
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
