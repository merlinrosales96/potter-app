import { useState } from "react";
import { ThemeProvider, createTheme, PaletteMode } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    const [mode] = useState<PaletteMode>('dark');

  const theme = createTheme({
    typography: {
      fontFamily: 'HarryP, Arial',
    },
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#ff4081',
          },
          background: {
            default: '#030014 ',
            paper: '#E8C07C',
          },
          text: {
            primary: '#C9A66B',
            secondary: '#2B2B2B',
          },
        }
        : {
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#f48fb1',
          },
          background: {
            default: '#5d0c0c',
            paper: '#172030',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
          },
        }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
