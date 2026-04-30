import { useState, useMemo, createContext, useContext } from "react";
import { ThemeProvider, createTheme, PaletteMode } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";

const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

export const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
  }), []);

  const theme = useMemo(() => createTheme({
    typography: {
      fontFamily: '"Crimson Text", Georgia, serif',
      h1: { fontFamily: '"Cinzel", serif', fontWeight: 700 },
      h2: { fontFamily: '"Cinzel", serif', fontWeight: 700 },
      h3: { fontFamily: '"Cinzel", serif', fontWeight: 600 },
      h4: { fontFamily: '"Cinzel", serif', fontWeight: 600 },
      h5: { fontFamily: '"Cinzel", serif', fontWeight: 600 },
      h6: { fontFamily: '"Cinzel", serif', fontWeight: 400 },
      button: { fontFamily: '"Cinzel", serif', letterSpacing: '2px' },
    },
    shape: { borderRadius: 4 },
    palette: {
      mode,
      ...(mode === 'dark' ? {
        primary: { main: '#d4af37' },
        secondary: { main: '#e8c07c' },
        background: {
          default: '#06040a',
          paper: '#0e0b17',
        },
        text: {
          primary: '#e8dcc8',
          secondary: 'rgba(232,220,200,0.55)',
        },
        divider: 'rgba(212,175,55,0.15)',
      } : {
        primary: { main: '#7c2d12' },
        secondary: { main: '#5d0c0c' },
        background: {
          default: '#f4ebd0',
          paper: '#e8d5a3',
        },
        text: {
          primary: '#1a0a00',
          secondary: '#5d2c0a',
        },
        divider: 'rgba(100,50,0,0.2)',
      }),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: mode === 'dark'
              ? 'radial-gradient(ellipse at 20% 0%, rgba(80,40,120,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(40,20,60,0.1) 0%, transparent 50%)'
              : 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            fontFamily: '"Cinzel", serif',
            letterSpacing: '2px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: '"Cinzel", serif',
            fontSize: '0.65rem',
            letterSpacing: '1.5px',
            borderRadius: 2,
          },
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
