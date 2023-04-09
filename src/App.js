import { Routes, Route } from 'react-router-dom';
import { Box, Container, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import './App.css';

import CharactersList from './pages/CharactersList';
import Character from './pages/Character';
import List from './pages/components/List';
import theme from './pages/styles';
import { useEffect, useState } from 'react';

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ padding: "16px" }}>
          <Routes>
            <Route path="/" element={<CharactersList total={total} />}>
              <Route path=":page" element={<List />} />
            </Route>
            <Route path="/character/:id" element={<Character total={total} />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
