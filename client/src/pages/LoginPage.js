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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border border-gray-300 rounded-md"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md mb-4 hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => navigate('/register')}
          className="w-full text-blue-500 py-3 rounded-md hover:bg-blue-100"
        >
          Go to Register
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
