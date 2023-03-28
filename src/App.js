import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';

import CharactersList from './pages/CharactersList';
import Character from './pages/Character';
import List from './pages/components/List';
import theme from './pages/styles';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<CharactersList />}>
            <Route path=":page" element={<List />} />
          </Route>
          <Route path="/character/:id" element={<Character />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
