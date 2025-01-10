import React, { useState, useEffect } from 'react';
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
  const [bakeries, setBakeries] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    // Fetch all bakeries
    fetch('/api/bakeries', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.bakeries) {
          setBakeries(data.bakeries);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch bakeries', err);
      });
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/bakeries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error('Failed to add bakery', err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Vertical Menu on the Left */}
      <div className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold text-orange-600 mb-4">Your Bakeries</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search bakeries..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {/* List of Bakeries */}
        <ul className="space-y-2">
          {bakeries.map((bakery) => (
            <li
              key={bakery.id}
              className="p-2 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              {bakery.name}
            </li>
          ))}
          {/* New Bakery Entry */}
          {formData.name && (
            <li className="p-2 rounded-lg bg-orange-100 text-orange-600">
              {formData.name}
            </li>
          )}
        </ul>

        {/* Add New Bakery Button */}
        <button
          onClick={() => navigate('/add-bakery')}
          className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Add New Bakery
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-orange-600 mb-6">Add New Bakery</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Bakery Name</label>
              <input
                type="text"
                placeholder="Bakery Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Address</label>
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">City</label>
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone</label>
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Website</label>
              <input
                type="url"
                placeholder="Website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Add Bakery
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}
        className="fixed bottom-4 right-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
}

export default AddBakery;