import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', isOwner: false });
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Form data updated:', formData);  // Log the form data whenever it changes
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);  // Check if this is logged

    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        navigate('/login');
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-yellow-50 to-orange-100">
  <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
    <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Register</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        className="w-full p-3 mb-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 mb-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          className="mr-2 h-5 w-5 text-orange-600 focus:ring-orange-400 focus:ring-2"
          onChange={(e) => setFormData({ ...formData, isOwner: e.target.checked })}
        />
        <span className="text-orange-700">Are you a bakery owner?</span>
      </label>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-lg mb-4 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        Register
      </button>
    </form>
    <button
      onClick={() => navigate('/login')}
      className="w-full text-orange-600 py-3 rounded-lg hover:bg-orange-100 border border-orange-300"
    >
      Go to Login
    </button>
  </div>
</div>

  );
}

export default RegisterPage;
