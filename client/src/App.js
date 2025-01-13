import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import BakeryPage from './pages/BakeryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ManageBakery from './pages/ManageBakery';
import AddBakery from './pages/AddBakery';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import AllBakeriesPage from './pages/AllBakeriesPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
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
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/all-bakeries" element={<AllBakeriesPage />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default App;