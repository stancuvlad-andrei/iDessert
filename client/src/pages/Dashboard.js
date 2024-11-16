import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [bakeries, setBakeries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Redirect if no token (not authenticated)
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Fetch bakeries when the component mounts
  useEffect(() => {
    if (!token) return;

    // Fetch all bakeries owned by the user
    fetch('/api/bakeries', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.bakeries) {
          setBakeries(data.bakeries);
        }
      })
      .catch(err => {
        setError('Failed to fetch bakeries');
      });
  }, [token]);

  // Function to handle adding a new bakery
  const handleAddBakery = () => {
    navigate('/add-bakery'); // Redirect to the add bakery page
  };

  // Function to handle removing a bakery
  const handleRemoveBakery = (bakeryId) => {
    fetch(`/api/bakeries/${bakeryId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(() => {
        setBakeries(bakeries.filter(bakery => bakery.id !== bakeryId));
      })
      .catch(err => {
        setError('Failed to remove bakery');
      });
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Your Bakeries</h1>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <div className="flex justify-between mb-6">
        <button
          onClick={handleAddBakery}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Add New Bakery
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
        >
          Logout
        </button>
      </div>

      {bakeries.length > 0 ? (
        bakeries.map(bakery => (
          <div key={bakery.id} className="bg-white shadow-lg rounded-lg p-4 mb-6">
            <h3 className="text-xl font-medium text-gray-800">{bakery.name}</h3>
            <p className="text-gray-600">{bakery.address}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => navigate(`/bakery/manage/${bakery.id}`)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Manage Bakery
              </button>
              <button
                onClick={() => handleRemoveBakery(bakery.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove Bakery
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">You don't have any bakeries yet.</p>
      )}
    </div>
  );
}

export default Dashboard;
