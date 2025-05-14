import { Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './pages/Home';
import Characters from './components/Characters/Characters';
import CharacterInfo from './components/Characters/CharacterInfo';
import Houses from './components/Houses/Houses';
import CharactersByHouse from './components/Houses/CharactersByHouse';
import Spells from './components/Spells/Spells';
import NotFound from './components/404/404';
import './App.css';
import { ThemeProviderWrapper } from './theme/ThemeProvider';

function App() {

  return (
    <ThemeProviderWrapper>
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
    </ThemeProviderWrapper>
  );
}

export default App;