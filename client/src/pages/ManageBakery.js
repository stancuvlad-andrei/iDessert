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

  // Function to handle adding a new product
  const handleAddProduct = () => {
    navigate(`/bakery/${id}/add-product`); // Redirect to the add product page
  };

  // Function to handle deleting a product
  const handleDeleteProduct = (productId) => {
    fetch(`/api/bakeries/${id}/products/${productId}`, {  // Use bakery ID from URL
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((data) => {
        if (data.message === 'Product removed successfully') {
          // Update the state to remove the deleted product
          setProducts(products.filter(product => product.id !== productId));
        } else {
          setError('Failed to delete product');
        }
      })
      .catch(err => {
        setError('Failed to delete product');
      });
  };

  // Function to handle updating product (price/quantity)
  const handleUpdateProduct = (productId) => {
    navigate(`/bakery/${id}/product/${productId}/update`);
  };
  

  // Function to navigate back to the bakery dashboard
  const handleGoBack = () => {
    navigate('/dashboard');  // Assuming '/dashboard' is the route for the dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-orange-100 p-6">
  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
    <h1 className="text-4xl font-extrabold text-orange-600 text-center mb-8">
      Manage Bakery: {bakery ? bakery.name : 'Loading...'}
    </h1>

    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

    <div className="mb-8">
      <div className="flex justify-center mb-4">
        <button
          onClick={handleAddProduct}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 border-2 border-transparent hover:border-yellow-600 transition"
        >
          Add Product
        </button>
      </div>

      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:border-2 hover:border-yellow-500 transition"
          >
            <h3 className="text-xl font-medium text-gray-800">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg text-gray-800">Price: ${product.price}</p>
            <p className="text-lg text-gray-800">Quantity: {product.quantity}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleUpdateProduct(product.id)}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Update Product
              </button>

              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete Product
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No products found for this bakery.</p>
      )}
    </div>

    {/* Go back to dashboard button */}
    <div className="text-center mt-6">
      <button
        onClick={handleGoBack}
        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        Go Back to Dashboard
      </button>
    </div>
  </div>
</div>

  );
}

export default ManageBakery;
