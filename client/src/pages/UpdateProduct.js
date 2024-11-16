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
  
    console.log('Updated Data:', updatedData); // Log the updated data
  
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
        if (data.message === 'Product updated successfully') {
          navigate(`/bakery/manage/${bakeryId}`);
        } else {
          setError('Failed to update product');
          console.error('Failed update response:', data); // Log the response from the server
        }
      })
      .catch(err => {
        setError('Failed to update product');
        console.error('Error:', err); // Log error details for debugging
      });
  };
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Update Product: {product ? product.name : 'Loading...'}
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {product && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={updatedData.price}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter new price"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={updatedData.quantity}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter new quantity"
            />
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={handleUpdateProduct}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Update Product
            </button>
            <button
              onClick={() => navigate(`/bakery/manage/${bakeryId}`)}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateProduct;
