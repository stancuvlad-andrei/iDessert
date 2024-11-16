import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ManageBakery() {
  const { id } = useParams();  // Get bakery ID from the URL
  const [bakery, setBakery] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    // Fetch bakery details and products
    fetch(`/api/bakeries/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.bakery) {
          setBakery(data.bakery);
          setProducts(data.bakery.products);
        }
      })
      .catch(err => {
        setError('Failed to fetch bakery data');
      });
  }, [id, token, navigate]);

  // Function to handle updating product (price/quantity)
  const handleUpdateProduct = (productId, updatedData) => {
    // Call API to update product (e.g., price or quantity)
    console.log('Updating product', productId, updatedData);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Manage Bakery: {bakery ? bakery.name : 'Loading...'}</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <h3 className="text-xl font-medium text-gray-800">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg text-gray-800">Price: ${product.price}</p>
              <p className="text-lg text-gray-800">Quantity: {product.quantity}</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleUpdateProduct(product.id, { price: product.price, quantity: product.quantity })}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Update Product
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No products found for this bakery.</p>
        )}
      </div>
    </div>
  );
}

export default ManageBakery;