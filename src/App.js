import { Routes, Route } from 'react-router-dom';
import { Box, Container, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';

import CharactersList from './pages/CharactersList';
import Character from './pages/Character';
import Home from './pages/Home';
import Header from './pages/components/Header';
import theme from './pages/styles';
import UserProvider from './store/userProvider';


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
        <UserProvider>
          <Box sx={{ padding: "16px" }}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:page" element={<CharactersList total={total} />} />
              <Route path="/character/:id" element={<Character total={total} />} />
            </Routes>
          </Box>
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
