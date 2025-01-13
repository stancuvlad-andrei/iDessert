import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddProduct() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [bakeries, setBakeries] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch all bakeries when the component mounts
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

    fetch(`/api/bakeries/${id}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        navigate(`/bakery/manage/${id}`);
      })
      .catch((err) => {
        console.error('Failed to add product', err);
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
              className={`p-2 rounded-lg cursor-pointer ${
                bakery.id === parseInt(id)
                  ? 'bg-orange-100 text-orange-600'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => navigate(`/bakery/manage/${bakery.id}`)}
            >
              {bakery.name}
            </li>
          ))}
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
          <h1 className="text-2xl font-bold text-orange-600 mb-6">Add New Product</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => navigate(`/bakery/manage/${id}`)}
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

export default AddProduct;