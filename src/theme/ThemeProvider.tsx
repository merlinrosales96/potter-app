import { useState, useMemo, createContext, useContext } from "react";
import { ThemeProvider, createTheme, PaletteMode } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";

// Creamos un contexto para poder cambiar el tema desde cualquier componente (ej. NavBar)
const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  // Detecta si el usuario prefiere modo oscuro en su sistema operativo
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme({
    typography: {
      fontFamily: 'HarryP, Arial, sans-serif',
    },
    shape: {
      borderRadius: 12,
    },
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            // Colores Modo Oscuro (Inspirado en Hogwarts de noche)
            primary: { main: '#C9A66B' }, // Dorado viejo
            secondary: { main: '#E8C07C' },
            background: {
              default: '#030014', // Espacio profundo / Noche
              paper: '#0A0A1F',   // Azul muy oscuro para tarjetas
            },
            text: {
              primary: '#C9A66B',
              secondary: '#A5A5A5',
            },
          }
        : {
            // Colores Modo Claro (Inspirado en Pergamino antiguo)
            primary: { main: '#5d0c0c' }, // Rojo Gryffindor profundo
            secondary: { main: '#2b2b2b' },
            background: {
              default: '#F4EBD0', // Color pergamino real
              paper: '#E8C07C',   // Tono más oscuro de pergamino
            },
            text: {
              primary: '#2B2B2B',
              secondary: '#5D0C0C',
            },
          }),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999, textTransform: 'none', fontWeight: 600 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' }, // Limpia gradientes automáticos de MUI
        },
      },
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};