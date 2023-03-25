import { Routes, Route } from 'react-router-dom';
import './App.css';

import CharactersList from './pages/CharactersList';
import List from './pages/components/List';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CharactersList />}>
        <Route path=":page" element={<List />} />
      </Route>
    </Routes>
  );
}

export default App;
