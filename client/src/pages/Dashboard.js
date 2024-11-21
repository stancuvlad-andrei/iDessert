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
    navigate('/add-bakery');
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
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-orange-100 p-6">
  <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-xl flex flex-col justify-between">
    <div>
      <h1 className="text-4xl font-extrabold text-orange-600 text-center mb-6">Your Bakeries</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-center mb-8">
        <button
          onClick={handleAddBakery}
          className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
        >
          Add New Bakery
        </button>
      </div>

      {bakeries.length > 0 ? (
        bakeries.map((bakery) => (
          <div key={bakery.id} className="bg-white shadow-lg rounded-xl p-6 mb-8 hover:border-2 hover:border-yellow-500 transition">
            <h3 className="text-2xl font-semibold text-gray-800">{bakery.name}</h3>
            <p className="text-lg text-gray-600">{bakery.address}</p>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => navigate(`/bakery/manage/${bakery.id}`)}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Manage Bakery
              </button>
              <button
                onClick={() => handleRemoveBakery(bakery.id)}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove Bakery
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 text-xl">You don't have any bakeries yet.</p>
      )}
    </div>

    <div className="flex justify-center mt-auto mb-4">
      <button
        onClick={handleLogout}
        className="px-8 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  </div>
</div>

  );
}

export default Dashboard;
