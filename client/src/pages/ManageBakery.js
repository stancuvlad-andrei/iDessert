import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ManageBakery() {
  const { id } = useParams();
  const [bakery, setBakery] = useState(null);
  const [bakeries, setBakeries] = useState([]);
  const [products, setProducts] = useState([]);
  const [telemetry, setTelemetry] = useState({
    visits: 0,
    orders: 0,
    revenue: 0,
  });
  const [error, setError] = useState(null);
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
        setError('Failed to fetch bakeries');
      });

    // Fetch bakery details and products
    fetch(`/api/bakeries/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.bakery) {
          setBakery(data.bakery);
          setProducts(data.bakery.products);
        }
      })
      .catch((err) => {
        setError('Failed to fetch bakery data');
      });

    // Fetch bakery telemetry
    fetch(`/api/bakeries/${id}/telemetry`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Telemetry data:', data.telemetry); // Log the data for debugging
        if (data.telemetry) {
          setTelemetry(data.telemetry);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch telemetry data', err);
      });
  }, [id, token, navigate]);

  // Log telemetry state when it changes
  useEffect(() => {
    console.log('Telemetry updated:', telemetry);
  }, [telemetry]);

  const handleAddProduct = () => {
    navigate(`/bakery/${id}/add-product`);
  };

  const handleDeleteProduct = (productId) => {
    fetch(`/api/bakeries/${id}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((err) => {
        setError('Failed to delete product');
      });
  };

  const handleUpdateProduct = (productId) => {
    navigate(`/bakery/${id}/product/${productId}/update`);
  };

  const handleCancel = () => {
    navigate('/dashboard'); // Replace with your actual dashboard route
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
          {bakeries.map((bakeryItem) => (
            <li
              key={bakeryItem.id}
              className={`p-2 rounded-lg cursor-pointer ${
                bakeryItem.id === parseInt(id)
                  ? 'bg-orange-100 text-orange-600'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => navigate(`/bakery/manage/${bakeryItem.id}`)}
            >
              {bakeryItem.name}
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
          <h1 className="text-2xl font-bold text-orange-600 mb-6">
            Manage Bakery: {bakery ? bakery.name : 'Loading...'}
          </h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Telemetry Section */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Bakery Stats</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Visits</h3>
                <p className="text-2xl font-bold text-orange-600">{telemetry.visits}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Orders</h3>
                <p className="text-2xl font-bold text-orange-600">{telemetry.orders}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
                {/* Updated revenue display with validation */}
                <p className="text-2xl font-bold text-orange-600">
                  ${isNaN(parseFloat(telemetry.revenue)) ? '0.00' : parseFloat(telemetry.revenue).toFixed(2)}
                </p>
              </div>
            </div>
          </div>



          <div className="mb-6 flex space-x-4">
            <button
              onClick={handleAddProduct}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Add Product
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>

          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800">Price: ${product.price}</p>
                <p className="text-gray-800">Quantity: {product.quantity}</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleUpdateProduct(product.id)}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    Update Product
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No products found for this bakery.</p>
          )}
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

export default ManageBakery;