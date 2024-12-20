import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import BakeryPage from './pages/BakeryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ManageBakery from './pages/ManageBakery';
import AddBakery from './pages/AddBakery';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bakery/:id" element={<BakeryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bakery/manage/:id" element={<ManageBakery />} />  
        <Route path="/add-bakery" element={<AddBakery />} />
        <Route path="/bakery/:id/add-product" element={<AddProduct />} />
        <Route path="/bakery/:bakeryId/product/:productId/update" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
