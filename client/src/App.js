import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import BakeryPage from './pages/BakeryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bakery/:id" element={<BakeryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
