import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { HomePage } from './pages/HomePage'
import { SavePage } from './pages/SavePage'

function App() {
  return (
    <>
      <Nav />
      <Routes >
        <Route path="/" element={<HomePage />} />
        <Route path="/save" element={<SavePage />} />
      </Routes>
    </>
  );
}

export default App;
