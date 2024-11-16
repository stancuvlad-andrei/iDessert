import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBakery() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    website: '',
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/bakeries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(() => {
        navigate('/dashboard');
      })
      .catch(err => {
        console.error('Failed to add bakery', err);
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Add New Bakery</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Bakery Name</label>
          <input
            type="text"
            id="name"
            placeholder="Bakery Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            placeholder="Website"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
        >
          Add Bakery
        </button>
      </form>
    </div>
  );
}

export default AddBakery;
