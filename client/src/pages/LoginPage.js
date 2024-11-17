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
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-yellow-50 to-orange-100">
  <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
    <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Login</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 mb-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-6 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-lg mb-4 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        Login
      </button>
    </form>
    <button
      onClick={() => navigate('/register')}
      className="w-full text-orange-600 py-3 rounded-lg hover:bg-orange-100 border border-orange-300"
    >
      Go to Register
    </button>
  </div>
</div>

  );
}

export default LoginPage;
