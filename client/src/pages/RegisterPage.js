import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate here

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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => setFormData({ ...formData, isOwner: e.target.checked })}
            />
            <span>Are you a bakery owner?</span>
          </label>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md mb-4 hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <button
          onClick={() => navigate('/login')}
          className="w-full text-blue-500 py-3 rounded-md hover:bg-blue-100"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
