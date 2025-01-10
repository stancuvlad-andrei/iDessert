import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
  const { bakeryId, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [bakeries, setBakeries] = useState([]);
  const [error, setError] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    price: '',
    quantity: '',
  });
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
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch bakeries');
        }
        return response.json();
      })
      .then((data) => {
        if (data.bakeries) {
          setBakeries(data.bakeries);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch bakeries', err);
      });

    // Fetch product details
    fetch(`/api/bakeries/${bakeryId}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        return response.json();
      })
      .then((data) => {
        if (data.product) {
          setProduct(data.product);
          setUpdatedData({
            price: data.product.price,
            quantity: data.product.quantity,
          });
        } else {
          setError('Product data not found');
        }
      })
      .catch((err) => {
        setError(err.message);
        console.error('Failed to fetch product data', err);
      });
  }, [bakeryId, productId, token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProduct = () => {
    const { price, quantity } = updatedData;

    if (!price || !quantity) {
      setError('Please fill in all fields');
      return;
    }

    fetch(`/api/bakeries/${bakeryId}/products/${productId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price,
        quantity,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        return response.json();
      })
      .then(() => {
        navigate(`/bakery/manage/${bakeryId}`);
      })
      .catch((err) => {
        setError(err.message);
        console.error('Failed to update product', err);
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
                bakery.id === parseInt(bakeryId)
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
          <h1 className="text-2xl font-bold text-orange-600 mb-6">
            Update Product: {product ? product.name : 'Loading...'}
          </h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {product && (
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={updatedData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={updatedData.quantity}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleUpdateProduct}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/bakery/manage/${bakeryId}`)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
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

export default UpdateProduct;