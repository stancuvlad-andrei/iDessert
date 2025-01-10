import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('isOwner', data.isOwner);
          navigate(data.isOwner ? '/dashboard' : '/');
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Logo */}
      <div className="w-1/2 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-6xl font-bold">iDessert</h1>
          <p className="text-xl mt-4">Your sweet escape</p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => navigate('/register')}
            className="w-full mt-4 text-orange-600 py-2 rounded-lg hover:bg-orange-50 transition duration-300 border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Go to Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;