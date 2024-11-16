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
        console.log('Response:', data);  // Add this for logging the response
        if (data.message === 'Product added successfully') {
          navigate(`/bakery/manage/${id}`);  // Redirect back to manage bakery page if successful
        } else {
          alert('Error adding product: ' + data.message);  // Handle failure
        }
      })
      .catch(err => {
        console.error('Failed to add product', err);
        alert('There was an error adding the product');
      });
  };
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Product Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
          <input
            id="quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
