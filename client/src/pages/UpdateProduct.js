import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
  const { bakeryId, productId } = useParams(); // Get bakery and product IDs from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    price: '',
    quantity: ''
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    // Fetch product details
    fetch(`/api/bakeries/${bakeryId}/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.product) {
          setProduct(data.product);
          setUpdatedData({
            price: data.product.price,
            quantity: data.product.quantity
          });
        } else {
          setError('Failed to fetch product data');
        }
      })
      .catch(err => {
        setError('Failed to fetch product data');
      });
  }, [bakeryId, productId, token, navigate]);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle updating the product
  const handleUpdateProduct = () => {
    const { price, quantity } = updatedData;
  
    // Make sure both fields are filled out
    if (!price || !quantity) {
      setError('Please fill in all fields');
      return;
    }
  
    // Send updated product data to the server
    fetch(`/api/bakeries/${bakeryId}/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price,
        quantity,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response Data:', data);
        if (
          data.message === 'Product updated successfully' || 
          data.message === 'No changes were made to the product'
        ) {
          navigate(`/bakery/manage/${bakeryId}`);
        } else {
          setError('Failed to update product');
        }
      })
      .catch(err => {
        setError('Failed to update product');
        console.error('Error:', err);
      });
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-orange-100 p-8">
  <div className="max-w-lg mx-auto bg-white p-10 shadow-lg rounded-lg">
    <h1 className="text-4xl font-extrabold text-orange-600 text-center mb-8">
      Update Product: {product ? product.name : 'Loading...'}
    </h1>

    {error && <p className="text-red-600 text-center mb-6 font-medium">{error}</p>}

    {product && (
      <form onSubmit={handleUpdateProduct} className="space-y-8">
        <div className="mb-6">
          <label htmlFor="price" className="block text-gray-700 text-lg font-semibold mb-3">
            Price
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={updatedData.price}
            onChange={handleInputChange}
            className="w-full px-5 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter new price"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="quantity" className="block text-gray-700 text-lg font-semibold mb-3">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            value={updatedData.quantity}
            onChange={handleInputChange}
            className="w-full px-5 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter new quantity"
            required
          />
        </div>

        <div className="flex flex-col gap-6">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg hover:bg-yellow-600 transition"
          >
            Update Product
          </button>

          <button
            type="button"
            onClick={() => navigate(`/bakery/manage/${bakeryId}`)}
            className="w-full px-6 py-3 bg-gray-500 text-white text-lg font-semibold rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    )}
  </div>
</div>

  );
}

export default UpdateProduct;
