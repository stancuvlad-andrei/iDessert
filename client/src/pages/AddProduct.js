import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddProduct() {
  const { id } = useParams();  // Get bakery ID from the URL
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create a new product for the bakery
    fetch(`/api/bakeries/${id}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response:', data);
        if (data.message === 'Product added successfully') {
          navigate(`/bakery/manage/${id}`);
        } else {
          alert('Error adding product: ' + data.message);
        }
      })
      .catch(err => {
        console.error('Failed to add product', err);
        alert('There was an error adding the product');
      });
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-orange-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-10 shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-orange-600 text-center mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 text-lg font-semibold mb-3">Product Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 text-lg font-semibold mb-3">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-5 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="price" className="block text-gray-700 text-lg font-semibold mb-3">Price</label>
            <input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-5 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="quantity" className="block text-gray-700 text-lg font-semibold mb-3">Quantity</label>
            <input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-5 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg hover:bg-yellow-600 transition"
          >
            Add Product
          </button>

          <button
            type="button"
            onClick={() => navigate(`/bakery/manage/${id}`)}
            className="w-full py-3 bg-gray-500 text-white text-lg font-semibold rounded-lg hover:bg-gray-600 transition mt-6"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
