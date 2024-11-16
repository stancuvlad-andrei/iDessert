import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import BakeryPage from './pages/BakeryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';  // Dashboard
import ManageBakery from './pages/ManageBakery';  // Manage Bakery
import AddBakery from './pages/AddBakery';  // Add Bakery Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bakery/:id" element={<BakeryPage />} />
        <Route path="/login" element={<LoginPage />} />  {/* Login route */}
        <Route path="/register" element={<RegisterPage />} />  {/* Register route */}
        <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard route */}
        <Route path="/bakery/manage/:id" element={<ManageBakery />} />  {/* Manage Bakery route */}
        <Route path="/add-bakery" element={<AddBakery />} />  {/* Add Bakery route */}
      </Routes>
    </Router>
  );
}

export default App;
