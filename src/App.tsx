import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './components/layout/NavBar';
import Home from './pages/Home';
import Characters from './components/Characters/Characters';
import CharacterInfo from './components/Characters/CharacterInfo';
import Houses from './components/Houses/Houses';
import CharactersByHouse from './components/Houses/CharactersByHouse';
import Spells from './components/Spells/Spells';
import NotFound from './components/404/404';
import './App.css';

function App() {

  const [mode] = React.useState<PaletteMode>('dark');

  const defaultTheme = createTheme({
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
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/characters/:id' element={<Characters />} />
        <Route path='/character/:id/:index' element={<CharacterInfo />} />
        <Route path='/houses' element={<Houses />} />
        <Route path='/houses/characters/:id/:index' element={<CharactersByHouse />} />
        <Route path='/spells/:id' element={<Spells />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;