import { Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import './App.css';

import CharactersList from './pages/CharactersList';
import Character from './pages/Character';
import List from './pages/components/List';
import theme from './pages/styles';
import { useEffect, useState } from 'react';

import Test from './Test';

function App() {
  const [total, setTotal] = useState(null)
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then(res => res.json())
      .then(data => setTotal(data.info.count))
  }, [])

  if (!total) {
    return <Container maxWidth="lg">
      <Typography variant="body1">Loading...</Typography>
    </Container>
  }
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>

        <Container maxWidth="lg">
          <Test />
        </Container>

        <Routes>
          <Route path="/" element={<CharactersList total={total} />}>
            <Route path=":page" element={<List />} />
          </Route>
          <Route path="/character/:id" element={<Character total={total} />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
